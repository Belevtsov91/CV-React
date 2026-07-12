export const experiences = [
  {
    id: "pet-projects",
    period: "Feb 2026 – Present",
    logo: "/img/sidebar/freelancer.svg",
    logoClassName: "job-logo freelance-svg",
    logoAlt: "Freelance",
    logoWidth: 48,
    logoHeight: 48,
    role: "Freelance Full-Stack Developer",
    company: "Self-employed",
    description:
      "Designing and shipping full-stack projects end-to-end. Built a personal CV/portfolio site (belevtsov.dev) with a Node.js/Express backend, and BabyTrack — a baby activity tracker built as a hands-on study of AI-assisted development. Contributed to team projects including Money Guard and Gadget House.",
    modalDescription: {
      intro:
        "Independently designing and shipping full-stack projects to gain real-world experience beyond coursework. All projects are version-controlled on GitHub with consistent commit history and branch workflows.",
      items: [
        "belevtsov.dev — Personal CV site built with React + Vite (frontend) and Node.js/Express (backend). Features include a Telegram bot for contact notifications, Brevo SMTP email confirmation flow, honeypot bot protection, IP-based rate limiting, and Zod schema validation.",
        "BabyTrack — Mobile-first baby activity tracker (React 19, TypeScript, Tailwind, Framer Motion, Radix UI). Built as a deliberate study of AI-assisted development with Claude and Codex: AI generated the drafts, the engineering — adapting components to the real data model, fixing TypeScript conflicts, removing duplicated logic — was done by hand.",
        "Money Guard — Team frontend project for personal finance tracking. Contributed logout flow and transactions CRUD (React, Redux Toolkit, Tailwind CSS).",
        "Gadget House — Team e-commerce project (React + TypeScript). Worked through feature branches and PR workflow on UI polish and admin dashboard styling.",
      ],
    },
  },
  {
    id: "nuxgame-support",
    period: "May 2026 - Jul 2026",
    logo: "/img/nuxgame.webp",
    logoClassName: "job-logo job-logo--wide",
    logoAlt: "NuxGame logo",
    logoWidth: 64,
    logoHeight: 25,
    role: "Support Manager",
    company: "NuxGame",
    description:
      "Technical support for an iGaming platform — reproduced and triaged bugs in the frontend and application logic, verified data against API responses, and escalated issues to game providers and the dev team. Worked in Jira and ClickUp.",
    modalDescription: {
      intro:
        "NuxGame is an iGaming software provider. As a Support Manager I worked at the junction of customers and engineering: English-language chat support backed by real technical triage — figuring out what is actually broken before it reaches the development team. The role exercised exactly the skills I use in development: reading API responses, reproducing bugs, and writing precise reports.",
      items: [
        "Investigated technical issues in the platform: reproduced and triaged bugs both in the frontend UI and in application logic before escalating to the development team.",
        "Verified and cross-checked data against API responses to determine whether an issue was a display bug, a data problem, or expected behavior.",
        "Escalated provider-side issues to game providers and tracked them to resolution; escalated internal issues to the dev team with clear reproduction steps.",
        "Managed tickets and day-to-day workflow in Jira and ClickUp.",
        "Provided after-sales customer support in English chat — informing customers and resolving requests in a friendly, competent manner.",
        "Developed and improved the team's customer response scripts.",
      ],
    },
  },
  {
    id: "kharkiv-it-cluster-internship",
    period: "May 2026 – Jun 2026",
    logo: "/img/kharkiv-it-cluster.webp",
    logoClassName: "job-logo job-logo--square",
    logoAlt: "Kharkiv IT Cluster logo",
    logoWidth: 40,
    logoHeight: 40,
    role: "Full Stack Engineer (Internship)",
    company: "Kharkiv IT Cluster · Boot Camp 2026",
    description:
      "Selected for Boot Camp 2026 — a two-month incubator by Kharkiv IT Cluster with mentorship from PioGroup Software. In a six-person team built Law Analysis, a GovTech platform for structuring Ukrainian legislation, and finished the program as a finalist.",
    modalDescription: {
      intro:
        "Boot Camp 2026 is a two-month incubator program by Kharkiv IT Cluster, run with industry partners (PioGroup Software, Intellias, VeraMed, QHR Partners). Our six-person team designed and shipped Law Analysis — a GovTech web platform that parses Ukrainian legislation into a structured, searchable knowledge base.",
      items: [
        "Second-most-active contributor in the team — 44 commits across frontend and backend.",
        'Shipped the "Radiant" 3D graph feature end-to-end: backend graph controller/service and cross-reference parser (Express, Mongoose), plus the frontend graph page (Next.js, Three.js / react-force-graph-3d).',
        "Worked on AI assistant integration (Google GenAI), admin views, error pages, and new dashboard tabs.",
        "Practiced the full team workflow under mentorship: feature branches, pull-request reviews, task management, and working against real project requirements.",
        "Awarded the finalist certificate of Boot Camp 2026 (ID ITK-26/3555).",
      ],
    },
  },
  {
    id: "supportive-care-analyst",
    period: "Dec 2022 - Jan 2026",
    logo: "/img/support.webp",
    logoClassName: "job-logo freelance-svg",
    logoAlt: "Supportive Care logo",
    logoWidth: 60,
    logoHeight: 40,
    role: "Data Analyst / Tech Support Representative",
    company: "Supportive Care",
    description:
      "Provided technical support and tailored client communication in a high-volume environment — each case required an individual approach and specific resolution. Generated 5–10+ operational reports daily, maintained data accuracy across CRM and internal database systems.",
    modalDescription: {
      intro:
        "Supportive Care is a U.S.-based healthcare support company. In this role I handled day-to-day client operations, data reporting, and technical support — working in a fast-paced, high-volume environment where accuracy and clear communication were critical. During the final year I was concurrently building personal projects and transitioning into software development.",
      items: [
        "Managed a large client base — each client required an individual approach, tailored responses, and specific technical solutions within SLA timeframes.",
        "Provided direct technical support to clients — troubleshot system problems, escalated complex cases, and ensured resolution follow-through.",
        "Analyzed operational data and generated 5–10+ performance reports daily using Excel and internal CRM systems.",
        "Maintained data integrity across CRM and internal databases — tracked records, identified discrepancies, and ensured accuracy of reporting data.",
        "Collaborated with internal teams to streamline data workflows and support day-to-day operations.",
      ],
    },
  },
  {
    id: "apex-treasury",
    period: "Aug 2021 - Dec 2022",
    logo: "/img/apex-global.webp",
    logoClassName: "job-logo job-logo--square",
    logoAlt: "Apex Global Solutions logo",
    logoWidth: 40,
    logoHeight: 40,
    role: "Treasury Representative",
    company: "Apex Global Solutions",
    // Renders as a single line (no description) in the PDF to keep it one page
    pdfCompact: true,
    description:
      "Worked with financial reporting in the Microsoft Dynamics GP (Great Plains) ERP system — prepared treasury reports, reconciled data, and maintained accuracy in an English-speaking corporate environment.",
    modalDescription: {
      intro:
        "Apex Global Solutions is an international outsourcing company. As a Treasury Representative I worked remotely with financial data and reporting — the role that first built my discipline around data accuracy and structured systems.",
      items: [
        "Prepared and processed financial reports in the Microsoft Dynamics GP (Great Plains) ERP system.",
        "Reconciled treasury data across internal records — tracked discrepancies and ensured reporting accuracy.",
        "Worked daily in an English-speaking corporate environment with distributed teams.",
      ],
    },
  },
];
