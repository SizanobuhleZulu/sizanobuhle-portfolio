#!/usr/bin/env python3
"""
Turn the raw intro video into the portfolio's seamless looping hero clip.

Usage:
    python scripts/build-hero-assets.py path/to/intro.mp4
    python scripts/build-hero-assets.py intro.mp4 --crop 800:1000:560:80   # manual crop w:h:x:y
    python scripts/build-hero-assets.py intro.mp4 --photo me.jpg           # portrait from a photo

Needs: ffmpeg + ffprobe on PATH, Python 3.9+, numpy  (pip install numpy)

Outputs:
    public/hero/hero.mp4   H.264 yuv420p CRF 24 -preset slow, AAC 96k, +faststart
    public/hero/hero.webm  VP9 CRF 36, Opus 80k
    public/portrait-bust.webp  480x600 head-to-shirt crop
    public/og.jpg          1200x630 share image

Then set PROFILE.heroVideo = true (and PROFILE.portrait = true) in src/lib/data.ts.
"""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "hero"
LOOP_SECONDS = 10.0  # take about the first 10 s
FADE = 0.5           # cross-fade length (s)
OUT_W = 768          # final width


def run(cmd, **kw):
    print("  $", " ".join(str(c) for c in cmd))
    return subprocess.run(cmd, check=True, **kw)


def probe(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout
    info = json.loads(out)
    v = next(s for s in info["streams"] if s["codec_type"] == "video")
    a = next((s for s in info["streams"] if s["codec_type"] == "audio"), None)
    num, den = (int(x) for x in v["r_frame_rate"].split("/"))
    return {
        "w": int(v["width"]), "h": int(v["height"]), "fps": num / den,
        "dur": float(info["format"]["duration"]),
        "sr": int(a["sample_rate"]) if a else None,
    }


def grab_frame(path, t, w, h):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(path), "-frames:v", "1",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w, 3)


def detect_crop(path, meta):
    """Find the person against the light background across a few frames, then pad around them."""
    w, h = meta["w"], meta["h"]
    mask = np.zeros((h, w), bool)
    for t in np.linspace(0.3, min(meta["dur"], LOOP_SECONDS) - 0.3, 6):
        f = grab_frame(path, t, w, h).astype(np.int16)
        bg = np.median(np.concatenate([f[:20].reshape(-1, 3), f[:, :20].reshape(-1, 3), f[:, -20:].reshape(-1, 3)]), axis=0)
        mask |= np.abs(f - bg).sum(axis=2) > 60
    ys, xs = np.where(mask)
    if len(xs) < 500:
        sys.exit("Couldn't find the person. Pass --crop w:h:x:y instead.")
    x0, x1 = np.percentile(xs, [0.5, 99.5]).astype(int)
    y0, y1 = np.percentile(ys, [0.5, 99.5]).astype(int)
    pad_y = int((y1 - y0) * 0.04)
    y0, y1 = max(0, y0 - pad_y), min(h, y1 + pad_y)
    ch = y1 - y0
    cw = int(round(ch * 768 / 960))         # keep the page's 768/960 frame
    cx = (x0 + x1) // 2                      # centre on the person
    x = int(np.clip(cx - cw // 2, 0, max(0, w - cw)))
    cw = min(cw, w)
    cw -= cw % 2
    ch -= ch % 2
    return cw, ch, x, y0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--crop", help="manual crop w:h:x:y, e.g. 800:1000:560:80")
    ap.add_argument("--photo", help="optional photo for the ID-card portrait")
    ap.add_argument("--seconds", type=float, default=LOOP_SECONDS)
    ap.add_argument("--white", type=float, default=0.98,
                    help="colorlevels max; lower (e.g. 0.94) whitens a greyer backdrop more")
    ap.add_argument("--seam", choices=["auto", "start", "tail"], default="auto",
                    help="start: cross-fade last 0.5 s into the first 0.5 s (guide default). "
                         "tail: keep every frame and fade the quiet ending into the first frame "
                         "(use when speech begins at 0 s). auto: pick tail if the first 0.5 s has speech.")
    a = ap.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found on PATH")
    src = Path(a.video).resolve()
    meta = probe(src)
    print(f"source: {meta['w']}x{meta['h']} @ {meta['fps']:.2f}fps, {meta['dur']:.2f}s")

    L = min(a.seconds, meta["dur"])
    if L < 3:
        sys.exit("Video is too short (need at least 3 s).")
    if a.crop:
        cw, ch, cx, cy = (int(v) for v in a.crop.split(":"))
    else:
        cw, ch, cx, cy = detect_crop(src, meta)
    print(f"crop: {cw}:{ch}:{cx}:{cy}")

    OUT.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp())
    vf_base = (
        f"crop={cw}:{ch}:{cx}:{cy},scale={OUT_W}:-2:flags=lanczos,"
        f"colorlevels=rimax={a.white}:gimax={a.white}:bimax={a.white}"
    )

    seam = a.seam
    if seam == "auto" and meta["sr"]:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-t", f"{L:.3f}", "-vn", "-ac", "1",
                              "-ar", "16000", "-f", "f32le", "-"], check=True, capture_output=True).stdout
        mono = np.frombuffer(raw, np.float32)
        head_rms = np.sqrt((mono[:8000] ** 2).mean())
        body_rms = np.sqrt((mono ** 2).mean())
        seam = "tail" if head_rms > 0.5 * body_rms else "start"
    elif seam == "auto":
        seam = "start"
    print(f"seam: {seam}")

    # 1) VIDEO: cross-fade the last 0.5 s into the first 0.5 s (xfade). Never retimed, so lips stay in sync.
    #    Output length = L - FADE; the end of the loop blends into its own start.
    head = tmp / "v.mp4"
    if seam == "tail":
        # Full clip kept intact; its last 0.5 s fades into a still of frame 0, so the loop joins invisibly.
        run([
            "ffmpeg", "-y", "-v", "error", "-i", str(src), "-t", f"{L:.3f}",
            "-filter_complex",
            f"[0:v]{vf_base},fps={meta['fps']:.3f},split[a][b];"
            f"[b]trim=end_frame=1,loop=loop=-1:size=1,trim=duration={FADE},setpts=PTS-STARTPTS[still];"
            f"[a][still]xfade=transition=fade:duration={FADE}:offset={L - FADE:.3f},format=yuv420p[v]",
            "-map", "[v]", "-an", "-t", f"{L:.3f}", "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", str(head),
        ])
    else:
        run([
            "ffmpeg", "-y", "-v", "error", "-i", str(src), "-t", f"{L:.3f}",
            "-filter_complex",
            f"[0:v]{vf_base},fps={meta['fps']:.3f},split[a][b];"
            f"[a]trim=start={FADE}:end={L},setpts=PTS-STARTPTS[body];"
            f"[b]trim=start=0:end={FADE},setpts=PTS-STARTPTS[intro];"
            f"[body][intro]xfade=transition=fade:duration={FADE}:offset={L - 2 * FADE:.3f},format=yuv420p[v]",
            "-map", "[v]", "-an", "-c:v", "libx264", "-crf", "16", "-preset", "veryfast", str(head),
        ])

    # 2) AUDIO: matching seam, sample-accurate, in numpy (acrossfade can drop audio).
    wav = None
    if meta["sr"]:
        sr = 48000
        raw = subprocess.run(
            ["ffmpeg", "-v", "error", "-i", str(src), "-t", f"{L:.6f}", "-vn", "-ac", "2", "-ar", str(sr),
             "-f", "f32le", "-"],
            check=True, capture_output=True,
        ).stdout
        x = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
        n_total, n_fade = int(round(L * sr)), int(round(FADE * sr))
        x = x[:n_total] if len(x) >= n_total else np.pad(x, ((0, n_total - len(x)), (0, 0)))
        if seam == "tail":
            # every sample kept; tiny fades at both ends remove the click at the loop point
            y = x.copy()
            n_in, n_out = int(0.012 * sr), int(0.06 * sr)
            y[:n_in] *= np.linspace(0, 1, n_in, dtype=np.float32)[:, None]
            y[-n_out:] *= np.linspace(1, 0, n_out, dtype=np.float32)[:, None]
        else:
            intro, body = x[:n_fade], x[n_fade:]
            ramp = np.linspace(0, 1, n_fade, dtype=np.float32)[:, None]
            # equal-power curve so the seam has no dip or click
            tail = body[-n_fade:] * np.cos(ramp * np.pi / 2) + intro * np.sin(ramp * np.pi / 2)
            y = np.concatenate([body[:-n_fade], tail]).astype(np.float32)
        wav = tmp / "a.f32"
        y.tofile(wav)

    def encode(out, vargs, aargs, fmt_extra=()):
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", str(head)]
        if wav:
            cmd += ["-f", "f32le", "-ar", "48000", "-ac", "2", "-i", str(wav), "-map", "0:v", "-map", "1:a", *aargs, "-shortest"]
        else:
            cmd += ["-an"]
        cmd += [*vargs, *fmt_extra, str(out)]
        run(cmd)

    encode(OUT / "hero.mp4",
           ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow"],
           ["-c:a", "aac", "-b:a", "96k"], ["-movflags", "+faststart"])
    encode(OUT / "hero.webm",
           ["-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1"],
           ["-c:a", "libopus", "-b:a", "80k"])

    # 3) PORTRAIT: clearest frame (highest Laplacian variance) or the provided photo.
    pub = ROOT / "public"
    if a.photo:
        portrait_src = ["-i", str(Path(a.photo).resolve())]
        crop_p = "crop='min(iw,ih*0.8)':'min(ih,iw*1.25)',scale=480:600"
    else:
        best_t, best_s = 0.5, -1.0
        for t in np.linspace(0.5, L - 0.6, 12):
            f = grab_frame(src, t, meta["w"], meta["h"]).mean(axis=2)
            lap = np.abs(4 * f[1:-1, 1:-1] - f[:-2, 1:-1] - f[2:, 1:-1] - f[1:-1, :-2] - f[1:-1, 2:]).var()
            if lap > best_s:
                best_t, best_s = t, lap
        portrait_src = ["-ss", f"{best_t:.3f}", "-i", str(src)]
        # top ~42% of the person crop = head to shirt
        bh = int(ch * 0.42)
        bw = int(bh * 0.8)
        bx = cx + (cw - bw) // 2
        crop_p = f"crop={bw}:{bh}:{bx}:{cy},scale=480:600,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"
    run(["ffmpeg", "-y", "-v", "error", *portrait_src, "-frames:v", "1", "-vf", crop_p, "-quality", "86", str(pub / "portrait-bust.webp")])

    # 4) OG image: the person on the paper colour.
    run([
        "ffmpeg", "-y", "-v", "error", "-ss", "1", "-i", str(OUT / "hero.mp4"), "-frames:v", "1",
        "-filter_complex",
        "color=c=0xf4f2ee:s=1200x630[bg];[0:v]scale=-2:600[p];[bg][p]overlay=(W-w)/2:30:format=auto,format=yuvj420p",
        "-q:v", "3", str(pub / "og.jpg"),
    ])

    shutil.rmtree(tmp, ignore_errors=True)
    print("\nDone. Now set heroVideo: true and portrait: true in src/lib/data.ts")


if __name__ == "__main__":
    main()
