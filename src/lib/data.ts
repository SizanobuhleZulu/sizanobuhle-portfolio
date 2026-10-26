/**
 * Every string in this file comes from Sizanobuhle's four CVs
 * (Master, Software & Backend, Machine Learning & Data Science, Integration & API).
 * Components only read from here. If it isn't on a CV, it isn't on the site.
 */

export type RoleKey = "backend" | "ml" | "integration" | "general";

export type RoleVariant = {
  key: RoleKey;
  label: string; // CV subtitle
  short: string; // chip label
  heading: string; // hero heading
  summary: string; // verbatim CV background paragraph
  resume: string; // matching PDF
};

export const ROLES: RoleVariant[] = [
  {
    key: "backend",
    label: "Software & Backend Engineering",
    short: "Backend",
    heading: "Software & Backend Engineer",
    summary:
      "I am a final-year Computer Science and Physics student at the University of Zululand, graduating in December 2026, with hands-on experience building and deploying production backend systems. I have designed and shipped REST APIs in FastAPI and Django REST Framework, including a live 27-endpoint API with JWT authentication, and I lead a six-person team building a decision-support system as my final-year project. Placed 3rd nationally in the TCS Sustainathon South Africa 2026 out of approximately 1,200 entries. Available from January 2027 and open to relocation.",
    resume: "/resume/Sizanobuhle_Zulu_CV_Software_Backend.pdf",
  },
  {
    key: "ml",
    label: "Machine Learning & Data Science",
    short: "ML & Data",
    heading: "Machine Learning & Data Science",
    summary:
      "I am a final-year Computer Science and Physics student at the University of Zululand, graduating in December 2026, with practical experience training, evaluating and deploying machine learning models. I fine-tuned a MobileNetV2 CNN to 98.07% validation accuracy across 28 classes, added out-of-distribution detection using feature-space embeddings, and served the model through a live FastAPI production API. My physics background gives me a strong foundation in mathematical modelling and data analysis. Placed 3rd nationally in the TCS Sustainathon South Africa 2026 out of approximately 1,200 entries. Available from January 2027 and open to relocation.",
    resume: "/resume/Sizanobuhle_Zulu_CV_ML_Data.pdf",
  },
  {
    key: "integration",
    label: "Integration & API Engineering",
    short: "Integration",
    heading: "Integration & API Engineer",
    summary:
      "I am a final-year Computer Science and Physics student at the University of Zululand, graduating in December 2026, with a focus on APIs and system integration. I completed 48.5 hours of hands-on MuleSoft Anypoint training, designed a three-layer API-led connectivity architecture using RAML and DataWeave, and built production REST APIs in FastAPI with JWT authentication and third-party service integration. Placed 3rd nationally in the TCS Sustainathon South Africa 2026 out of approximately 1,200 entries. Available from January 2027 and open to relocation.",
    resume: "/resume/Sizanobuhle_Zulu_CV_Integration.pdf",
  },
  {
    key: "general",
    label: "Computer Science and Physics",
    short: "Full-stack",
    heading: "Full-Stack, Cloud & ML",
    summary:
      "I am a final-year Computer Science and Physics student at the University of Zululand with experience in full-stack web development, cloud computing, and machine learning. Skilled in building secure, scalable systems using React.js, Django REST Framework, FastAPI, and cloud platforms, as well as training and deploying neural networks. Recently placed 3rd nationally in the TCS Sustainathon South Africa 2026 out of approximately 1,200 entries. Passionate about software engineering, cloud technologies, and developing innovative solutions that make a real-world impact. Available from January 2027 and open to relocation.",
    resume: "/resume/Sizanobuhle_Zulu_CV.pdf",
  },
];

export const PROFILE = {
  name: "Sizanobuhle Sphiwokuhle Zulu",
  displayName: "Sizanobuhle Zulu",
  firstName: "Sizanobuhle",
  initials: "SZ",
  discipline: "Computer Science and Physics",
  email: "sszulu953@gmail.com",
  phones: [
    { label: "+27 78 491 4439", href: "tel:+27784914439" },
    { label: "+27 82 815 1323", href: "tel:+27828151323" },
  ],
  location: "Empangeni, South Africa",
  relocation: "Open to relocation",
  availability: "Available from January 2027",
  github: "https://github.com/SizanobuhleZulu",
  githubLabel: "github.com/SizanobuhleZulu",
  linkedin: "https://www.linkedin.com/in/sizanobuhle-zulu-1917b1323" as string,
  resume: "/resume/Sizanobuhle_Zulu_CV.pdf",
  graduation: "2026",
  university: "University of Zululand",
  degree: "BSc Computer Science and Physics",
  // Paraphrase of the CV's own Problem Solving line, not an invented claim.
  quote: "Find the root cause, not the symptom, then engineer around it.",
  // Set true once public/hero/hero.mp4 + hero.webm exist (see scripts/build-hero-assets.py).
  heroVideo: true,
  // Set true once public/portrait-bust.webp exists.
  portrait: true,
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export type Family =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "ML"
  | "Databases"
  | "Cloud & DevOps"
  | "Integration"
  | "Concepts";

export type Skill = {
  name: string;
  symbol: string;
  family: Family;
  logo: string; // brand slug in public/logos OR concept key
  usedIn: string[];
};

export const FAMILIES: Family[] = [
  "Languages",
  "Frontend",
  "Backend",
  "ML",
  "Databases",
  "Cloud & DevOps",
  "Integration",
  "Concepts",
];

export const SKILLS: Skill[] = [
  { name: "Python", symbol: "Py", family: "Languages", logo: "python", usedIn: ["UniZulu Chatbot", "Khusela", "ResiFix", "PGMS"] },
  { name: "JavaScript", symbol: "Js", family: "Languages", logo: "javascript", usedIn: [] },
  { name: "TypeScript", symbol: "Ts", family: "Languages", logo: "typescript", usedIn: [] },
  { name: "Java", symbol: "Jv", family: "Languages", logo: "openjdk", usedIn: ["Computer Literacy Tutor"] },
  { name: "SQL", symbol: "Sq", family: "Languages", logo: "c:sql", usedIn: [] },

  { name: "React", symbol: "Re", family: "Frontend", logo: "react", usedIn: ["Khusela"] },
  { name: "Vite", symbol: "Vi", family: "Frontend", logo: "vite", usedIn: [] },
  { name: "Leaflet", symbol: "Lf", family: "Frontend", logo: "leaflet", usedIn: [] },

  { name: "FastAPI", symbol: "Fa", family: "Backend", logo: "fastapi", usedIn: ["Khusela", "PGMS", "UniZulu Chatbot"] },
  { name: "Django", symbol: "Dj", family: "Backend", logo: "django", usedIn: [] },
  { name: "Django REST", symbol: "Dr", family: "Backend", logo: "django", usedIn: [] },
  { name: "Flask", symbol: "Fl", family: "Backend", logo: "flask", usedIn: ["ResiFix"] },
  { name: "SQLAlchemy", symbol: "Sa", family: "Backend", logo: "sqlalchemy", usedIn: ["PGMS"] },
  { name: "SQLModel", symbol: "Sm", family: "Backend", logo: "c:db", usedIn: ["PGMS"] },
  { name: "JWT", symbol: "Jw", family: "Backend", logo: "jsonwebtokens", usedIn: ["Khusela"] },

  { name: "PyTorch", symbol: "Pt", family: "ML", logo: "pytorch", usedIn: ["UniZulu Chatbot"] },
  { name: "torchvision", symbol: "Tv", family: "ML", logo: "pytorch", usedIn: [] },
  { name: "Keras", symbol: "Ke", family: "ML", logo: "keras", usedIn: ["ResiFix", "PGMS"] },
  { name: "scikit-learn", symbol: "Sk", family: "ML", logo: "scikitlearn", usedIn: ["ResiFix"] },
  { name: "Claude API", symbol: "Cl", family: "ML", logo: "claude", usedIn: ["ResiFix"] },
  { name: "Google Colab", symbol: "Co", family: "ML", logo: "googlecolab", usedIn: [] },

  { name: "SQLite", symbol: "Sl", family: "Databases", logo: "sqlite", usedIn: ["ResiFix", "PGMS"] },
  { name: "PostgreSQL", symbol: "Pg", family: "Databases", logo: "postgresql", usedIn: [] },
  { name: "MongoDB", symbol: "Mg", family: "Databases", logo: "mongodb", usedIn: [] },

  { name: "Git", symbol: "Gt", family: "Cloud & DevOps", logo: "git", usedIn: [] },
  { name: "GitHub Actions", symbol: "Ga", family: "Cloud & DevOps", logo: "githubactions", usedIn: [] },
  { name: "Docker", symbol: "Dk", family: "Cloud & DevOps", logo: "docker", usedIn: [] },
  { name: "Azure", symbol: "Az", family: "Cloud & DevOps", logo: "c:cloud", usedIn: ["UniZulu Chatbot"] },
  { name: "Google Cloud", symbol: "Gc", family: "Cloud & DevOps", logo: "googlecloud", usedIn: [] },
  { name: "Render", symbol: "Rn", family: "Cloud & DevOps", logo: "render", usedIn: ["Khusela", "ResiFix"] },
  { name: "Vercel", symbol: "Vc", family: "Cloud & DevOps", logo: "vercel", usedIn: ["Khusela"] },
  { name: "VS Code", symbol: "Vs", family: "Cloud & DevOps", logo: "c:code", usedIn: [] },

  { name: "MuleSoft Anypoint", symbol: "Mu", family: "Integration", logo: "c:mule", usedIn: ["TradeBridge"] },
  { name: "RAML", symbol: "Ra", family: "Integration", logo: "c:spec", usedIn: ["TradeBridge"] },
  { name: "DataWeave", symbol: "Dw", family: "Integration", logo: "c:transform", usedIn: ["TradeBridge"] },
  { name: "PayFast", symbol: "Pf", family: "Integration", logo: "c:pay", usedIn: [] },

  { name: "REST APIs", symbol: "Ap", family: "Concepts", logo: "c:api", usedIn: ["Khusela", "ResiFix", "PGMS"] },
  { name: "CNNs", symbol: "Cn", family: "Concepts", logo: "c:nn", usedIn: ["Khusela"] },
  { name: "Transfer Learning", symbol: "Tl", family: "Concepts", logo: "c:transfer", usedIn: ["Khusela"] },
  { name: "OOD Detection", symbol: "Od", family: "Concepts", logo: "c:ood", usedIn: ["Khusela"] },
  { name: "API-led Connectivity", symbol: "Al", family: "Concepts", logo: "c:layers", usedIn: ["TradeBridge"] },
  { name: "Event-Driven", symbol: "Ev", family: "Concepts", logo: "c:event", usedIn: [] },
  { name: "CI/CD", symbol: "Ci", family: "Concepts", logo: "c:cicd", usedIn: ["UniZulu Chatbot"] },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  role: string;
  description: string;
  features: string[];
  tech: { name: string; logo: string }[];
  link?: { label: string; href: string };
  repo?: { label: string; href: string };
  ui: "khusela" | "resifix" | "pgms" | "tradebridge";
};

export const PROJECTS: Project[] = [
  {
    id: "khusela",
    index: "01",
    title: "Khusela",
    kicker: "GreenByte Solutions · 2026 · 3rd Place, TCS Sustainathon SA",
    role: "Machine Learning & Backend Developer",
    description:
      "An AI system that grades harvested produce from a phone photograph, predicts its remaining shelf-life, and routes at-risk food to the best destination before it spoils, addressing post-harvest food loss in South Africa.",
    features: [
      "MobileNetV2 CNN, two-phase transfer learning",
      "29,317 images · 28 classes · 98.07% val. accuracy",
      "Out-of-distribution detection with feature-space embeddings",
      "27 FastAPI endpoints incl. JWT auth and a decision engine",
      "English, isiZulu and isiXhosa support",
      "Live: API on Render, React frontend on Vercel, HTTPS",
    ],
    tech: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "JWT", logo: "jsonwebtokens" },
      { name: "React", logo: "react" },
      { name: "Render", logo: "render" },
      { name: "Vercel", logo: "vercel" },
      { name: "CNN", logo: "c:nn" },
    ],
    link: { label: "View live", href: "https://khusela-frontend.vercel.app" },
    ui: "khusela",
  },
  {
    id: "resifix",
    index: "02",
    title: "ResiFix",
    kicker: "AI-Powered Residence Maintenance System · 2026",
    role: "Full-Stack & ML Developer",
    description:
      "A maintenance platform for university residences. Students report problems by text or photo, the system classifies and prioritises them, alerts the right matron, and turns recurring issues into improvement proposals that students vote on.",
    features: [
      "TF-IDF + scikit-learn type & priority models (8,469 rows)",
      "MobileNetV2 image model; Claude Vision in production",
      "Claude validates reports and gives safety advice",
      "AI drafts proposals from issues; students vote, AI revises",
      "Email alerts to matrons; critical issues reach admins",
      "Student, matron & admin roles · 14 REST endpoints",
    ],
    tech: [
      { name: "Flask", logo: "flask" },
      { name: "scikit-learn", logo: "scikitlearn" },
      { name: "Keras", logo: "keras" },
      { name: "Claude API", logo: "claude" },
      { name: "SQLite", logo: "sqlite" },
      { name: "Render", logo: "render" },
    ],
    link: { label: "View live", href: "https://resifix-frontend.onrender.com" },
    repo: { label: "GitHub", href: "https://github.com/SizanobuhleZulu/ResiFix" },
    ui: "resifix",
  },
  {
    id: "pgms",
    index: "03",
    title: "PGMS",
    kicker: "Perishable Goods Management System · Final-Year Capstone (4CPS322)",
    role: "Group Leader & Backend Developer",
    description:
      "Leading a six-person team to build an AI decision-support system that tells South African farmers where, and at what price, to sell perishable produce based on its predicted shelf-life, turning image-based grading into actionable selling decisions.",
    features: [
      "Grading aligned to Class 1/2/3, Act 119 of 1990",
      "15-page research briefing on Q10 temperature effects",
      "Fixed a Healthy-vs-Expired model contradiction",
      "Fixed cross-version Keras model loading",
      "Province + market model: all 9 provinces, KZN markets",
      "32-page IEEE-830 SRS with UML diagrams",
    ],
    tech: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "SQLModel", logo: "c:db" },
      { name: "SQLAlchemy", logo: "sqlalchemy" },
      { name: "SQLite", logo: "sqlite" },
      { name: "Keras", logo: "keras" },
    ],
    ui: "pgms",
  },
  {
    id: "tradebridge",
    index: "04",
    title: "TradeBridge",
    kicker: "Portfolio Project · 2025",
    role: "MuleSoft Integration Developer",
    description:
      "Designed a three-layer API-led connectivity architecture (Experience, Process, System) on MuleSoft Anypoint Platform, using RAML specifications and DataWeave transformations.",
    features: [
      "Experience layer",
      "Process layer",
      "System layer",
      "RAML specifications",
      "DataWeave transformations",
      "MuleSoft Anypoint Platform",
    ],
    tech: [
      { name: "MuleSoft", logo: "c:mule" },
      { name: "RAML", logo: "c:spec" },
      { name: "DataWeave", logo: "c:transform" },
    ],
    link: { label: "View on GitHub", href: "https://github.com/SizanobuhleZulu/tradebridge" },
    ui: "tradebridge",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  image: string; // full-size, opens in the viewer
  thumb: string; // hover preview
  width: number;
  height: number;
  alt: string;
  verify?: { label: string; href: string };
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "3rd Place, TCS Sustainathon South Africa 2026",
    issuer: "Tata Consultancy Services · September 2026",
    image: "/certificates/tcs.webp",
    thumb: "/certificates/tcs-thumb.webp",
    width: 1080,
    height: 772,
    alt: "TCS Sustainathon Certification of Achievement awarded to Sizanobuhle Zulu of the University of Zululand for winning the third prize at TCS Sustainathon South Africa 2026, signed by Langa Dube.",
  },
  {
    title: "MuleSoft 4.X Complete Guide For Beginners: Hands On Projects",
    issuer: "Udemy · June 2026 · 48.5 hours",
    image: "/certificates/mulesoft.webp",
    thumb: "/certificates/mulesoft-thumb.webp",
    width: 1536,
    height: 1130,
    alt: "Udemy certificate of completion for MuleSoft 4.X Complete Guide For Beginners – Hands On Projects, instructor Chinna Reddy, awarded to Sizanobuhle Zulu on June 6, 2026, 48.5 total hours.",
    verify: { label: "Verify on Udemy", href: "https://ude.my/UC-a83e71be-1bed-4789-bbe0-9e2cc4df32d9" },
  },
  {
    title: "Tutorship Programme 2025 · 4CPS121 Computer Literacy",
    issuer: "University of Zululand · Teaching & Learning",
    image: "/certificates/tutor.webp",
    thumb: "/certificates/tutor-thumb.webp",
    width: 778,
    height: 1126,
    alt: "University of Zululand certificate awarded to Sizanobuhle Sphiwokuhle Zulu in recognition of dedicated participation in the Tutorship Programme for the 2025 academic year, serving in the module 4CPS121 Computer Literacy.",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  place: string;
  detail: string;
  kind: "education" | "work" | "competition";
};

export const TIMELINE: TimelineItem[] = [
  {
    year: "2023",
    title: "BSc Computer Science and Physics",
    place: "University of Zululand, Empangeni",
    detail:
      "Started the degree. Member of the Computer Science Society. Coursework includes Machine Learning, Software Engineering, Database Systems, Data Structures, Distributed Systems, Nuclear Physics and Solid State Physics.",
    kind: "education",
  },
  {
    year: "2024",
    title: "Backend Developer",
    place: "University of Zululand Chatbot, Empangeni",
    detail:
      "Developed a Python chatbot with FastAPI and PyTorch, deployed to Azure Functions with 99% uptime. Followed OWASP security practices and automated testing through CI/CD pipelines. Also styled the frontend with CSS.",
    kind: "work",
  },
  {
    year: "2025",
    title: "Computer Literacy Tutor",
    place: "University of Zululand · Feb – Nov 2025",
    detail:
      "Helped students with Microsoft Word, Excel and PowerPoint, and with Computer Lab experiments in Java and Python.",
    kind: "work",
  },
  {
    year: "2026",
    title: "Team Leader, DIRISA Student Datathon Challenge 2026",
    place: "University of Zululand team",
    detail:
      "Selected for UniZulu's team and leading it. For Challenge 1 we built Qaphela, an early-warning tool that predicts which municipal wards are likely to need by-elections, for the IEC. We combined 10 public data sources (IEC results, Stats SA Census 2022, Municipal Demarcation Board), trained a model with grouped cross-validation and deployed it as a Gradio app. As well as leading the team, I owned the candidate-list and mid-term shift datasets.",
    kind: "competition",
  },
  {
    year: "2026",
    title: "Graduating, December 2026",
    place: "University of Zululand",
    detail:
      "Final year: leading the six-person PGMS capstone team, and 3rd place nationally at the TCS Sustainathon South Africa 2026 with Khusela.",
    kind: "education",
  },
];

export type Achievement = {
  logo: string;
  label: string;
  caption: string;
  detail: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { logo: "tata", label: "TCS Sustainathon SA 2026", caption: "National placing", detail: "With Khusela, September 2026", value: 3, suffix: "rd" },
  { logo: "tata", label: "Entries in the field", caption: "Approximate competing entries", detail: "TCS Sustainathon South Africa 2026", value: 1200, prefix: "~" },
  { logo: "c:trophy", label: "Top-10 finalist", caption: "Presented to industry judges", detail: "Sandton, Johannesburg", value: 10, prefix: "Top " },
  { logo: "c:nn", label: "Validation accuracy", caption: "MobileNetV2, 28 classes", detail: "Khusela produce grading", value: 98.07, decimals: 2, suffix: "%" },
  { logo: "c:image", label: "Training images", caption: "Two-phase transfer learning", detail: "Khusela dataset", value: 29317 },
  { logo: "fastapi", label: "REST endpoints", caption: "Live FastAPI backend", detail: "Khusela, deployed on Render", value: 27 },
  { logo: "udemy", label: "Hours of MuleSoft training", caption: "Hands-on Anypoint projects", detail: "Udemy, June 2026", value: 48.5, decimals: 1, suffix: "h" },
  { logo: "c:cloud", label: "Uptime", caption: "Azure Functions deployment", detail: "University of Zululand Chatbot", value: 99, suffix: "%" },
];

export const ID_BACK = [
  "BSc Computer Science and Physics, UniZulu",
  "Builds production APIs in FastAPI and Django REST",
  "Shipped Khusela and ResiFix · leads PGMS",
  "3rd nationally, TCS Sustainathon SA 2026",
  "Available from January 2027",
];
