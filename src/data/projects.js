export const projects = [
  {
    image: "/img/bankist-landing.webp",
    alt: "Bankist landing page screenshot",
    title: "Bankist — Landing Page (Vanilla JS)",
    demo: "https://belevtsov91.github.io/Bankist-landing-page/",
    description:
      "Marketing landing built with pure JavaScript — smooth scroll, sticky nav, tabbed UI, lazy-loaded images, and a testimonial slider, all powered by native browser APIs.",
    code: "https://github.com/Belevtsov91/Bankist-landing-page",
    tech: ["JavaScript (ES6+)", "HTML5", "CSS3", "IntersectionObserver", "Vite"],
    modalDescription:
      "Bankist is a banking landing page built with zero frameworks to master DOM manipulation and native browser APIs. Implemented smooth scroll navigation, a sticky navbar and scroll-reveal animations via IntersectionObserver, lazy-loaded images with a blur-up effect, a tabbed operations component, a keyboard-accessible testimonial slider, and a modal signup form. Fully responsive across mobile, tablet, and desktop breakpoints. Design concept by Jonas Schmedtmann; all code written from scratch. Technologies: JavaScript (ES6+), HTML5, CSS3, IntersectionObserver, Vite.",
  },
  {
    image: "/img/mapty-tracker.webp",
    alt: "Mapty workout tracker screenshot with map and workout list",
    title: "Mapty — Workout Tracker (OOP JS)",
    demo: "https://belevtsov91.github.io/mapty-workout-tracker/",
    description:
      "Map-based workout tracker on Leaflet: log runs and rides by clicking the map, with pace/speed stats and localStorage persistence. Built with ES6 class-based OOP.",
    code: "https://github.com/Belevtsov91/mapty-workout-tracker",
    tech: ["JavaScript (ES6+)", "OOP / ES6 Classes", "Leaflet.js", "Geolocation API", "localStorage", "Vite"],
    modalDescription:
      'Mapty is an interactive fitness tracker built around the Geolocation API and Leaflet maps. Click anywhere on the map to log a running or cycling workout — the app calculates pace or speed, renders a marker, and keeps the full workout history in localStorage across sessions. Clicking a workout in the list flies the map to its marker. Architected with ES6 classes and inheritance (Workout → Running/Cycling) to practice real OOP patterns in JavaScript. Technologies: JavaScript (ES6+), Leaflet.js, OpenStreetMap, Geolocation API, localStorage, Vite.',
  },
  {
    image: "/img/game-pig.webp",
    alt: "Project 6 Screenshot",
    title: "Game Pig — JavaScript browser game",
    demo: "https://game-pig-five.vercel.app/",
    description:
      "Lightweight browser game project focused on clean game logic, simple architecture, and iterative feature development.",
    code: "https://github.com/Belevtsov91/Game-pig",
    tech: ["JavaScript", "HTML", "CSS", "Vite", "npm", "Prettier"],
    modalDescription:
      `Game-pig is a small frontend browser game (a "Pig Game" dice game) built primarily with JavaScript, HTML, and CSS, where two players take turns rolling a dice, accumulating a "current" turn score, choosing to "Hold" to bank points into their total score, and losing the turn when rolling a 1; the UI includes buttons for New game / Roll dice / Hold, dynamically updates player scores in the DOM, visually highlights the active player, hides/shows the dice image based on game state, and marks the winner once a player reaches 100 points (all behavior implemented with vanilla DOM event listeners and state variables). Technologies & libraries used: JavaScript, HTML, CSS, Vite, npm, Prettier.`,
  },
  {
    image: "/project1.webp",
    alt: "Project 1 Screenshot",
    title: "WebStudio — responsive landing page",
    demo: "https://belevtsov91.github.io/goit-markup-hw-06/",
    description:
      "Responsive single-page WebStudio landing built with HTML5/CSS3. Includes core sections, SVG sprites, forms, hover effects, and mobile menu/modal states via CSS classes, using Flexbox and media queries (with retina images).",
    code: "https://github.com/Belevtsov91/goit-markup-hw-06",
    tech: ["HTML5", "CSS3", "Flexbox", "Media Queries", "SVG Sprites", "Mobile-first"],
    modalDescription:
      `Responsive single-page WebStudio landing built with semantic HTML5 and custom CSS3 (no build tooling). The project includes a structured layout (header/hero/benefits/team/portfolio/footer), SVG sprite-based icon system, responsive/retina images via srcset, and UI overlays (mobile off-canvas menu + modal contact form) whose visibility is controlled through CSS state classes (e.g., .is-open). Styling follows a mobile-first approach with breakpoints for mobile/tablet/desktop (~320/768/1158), uses Flexbox for alignment, transitions for hover/focus interactions, and a normalize reset + Google Fonts via CDN.`,
  },
  {
    image: "/js-project.webp",
    alt: "Project 2 Screenshot",
    title: "Image Search App — Pixabay Gallery",
    demo: "https://belevtsov91.github.io/goit-js-hw-12/",
    description:
      `Responsive Pixabay Image Search app built with Vanilla JS (Vite) — API-driven gallery with form validation, loader/toast notifications, and "Load more" pagination with smooth scrolling.`,
    code: "https://github.com/Belevtsov91/goit-js-hw-12",
    tech: ["Vanilla JS", "Vite", "Axios", "iziToast", "SimpleLightbox", "PostCSS"],
    modalDescription:
      `Pixabay Image Search frontend app built with Vanilla JavaScript and Vite (ES modules). The core flow is an API-driven search gallery: the user submits a search form, results are fetched through a dedicated API layer using Axios, and the UI is updated via separate rendering helpers. UX details include a visible loader, toast notifications, and a "Load more" button that drives pagination. The gallery experience is enhanced with a lightbox library. Technologies & libraries used: Vite, Vanilla JavaScript (ES modules), HTML, CSS, Axios, iziToast, SimpleLightbox, Flatpickr, PostCSS.`,
  },
  {
    image: "/typeScript.webp",
    alt: "Project 4 Screenshot",
    title: "Image Search Gallery — React + TypeScript",
    demo: "https://goit-typescript-hw-02-gray-delta.vercel.app/",
    description:
      `Built a React + TypeScript image search gallery (Vite) with Axios API requests, responsive UI, modal preview, pagination via "Load More", and clear UX states for loading and errors.`,
    code: "https://github.com/Belevtsov91/goit-typescript-hw-02",
    tech: ["React", "TypeScript", "Vite", "Axios", "Unsplash API", "CSS Modules", "react-hot-toast"],
    modalDescription:
      `React application built with TypeScript and Vite. Core user flow: image search powered by the Unsplash API — users submit a query, the app renders a gallery, shows a loading indicator, displays errors on failures, supports pagination via a "load more" button (12 items per request), and opens a selected image in a modal overlay. Styling combines global CSS with component-scoped CSS Modules. Technologies & libraries used: React, TypeScript, Vite, SWC, Axios, react-hot-toast, react-modal, react-loader-spinner, react-icons, ESLint.`,
  },
  {
    image: "/phoneBook.webp",
    alt: "Project 3 Screenshot",
    title: "Phonebook App — Auth & Contacts",
    demo: "https://goit-react-hw-08-nine-sand.vercel.app/",
    description:
      "Developed a Vite + React phonebook app with JWT-based authentication, protected routes, and full CRUD for contacts using Redux Toolkit, redux-persist, Axios, Formik/Yup, and Material UI.",
    code: "https://github.com/Belevtsov91/goit-react-hw-08",
    tech: ["React", "Vite", "React Router", "Redux Toolkit", "redux-persist", "Axios", "Formik", "Yup", "Material UI"],
    modalDescription:
      "React + Vite single-page Phonebook app with React Router navigation (Home, Login, Register, Contacts, NotFound) and a shared layout. The Contacts page is protected by custom PrivateRoute/PublicRoute logic. Authentication is implemented via Axios calls to an external REST API, with the token stored in Redux Toolkit state and persisted via redux-persist. Users manage contacts through Redux async thunks (fetch/add/delete) with toast notifications. Styling uses CSS Modules and Material UI. Technologies: React, Vite, React Router DOM, Redux Toolkit, redux-persist, Axios, Formik, Yup, react-hot-toast, Material UI, ESLint.",
  },
  {
    image: "/img/team-project.webp",
    alt: "Project 5 Screenshot",
    title: "Money Guard — Frontend",
    demo: "https://money-guard-frontend.vercel.app/login",
    description:
      "Frontend team project for personal finance tracking integrated with backend API. Implemented logout flow (modal, API call, token cleanup) and transactions CRUD with practical UI wiring and data-flow validation.",
    code: "https://github.com/Inna-Khalas/Money_Guard_frontend",
    tech: ["React", "Vite", "React Router", "Redux Toolkit", "redux-persist", "Tailwind CSS", "Axios", "Formik", "Chart.js"],
    contribution:
      "Implemented the logout flow end-to-end (confirmation modal, API call, token cleanup) and worked on transactions CRUD — add, edit, and delete by id — validating the data flow between Redux state and the backend API.",
    modalDescription:
      "Money_Guard_frontend is a Vite-built React SPA for personal finance tracking. Uses React Router with guarded routes (login/register vs private dashboard) and nested dashboard tabs (home/statistics/currency). State managed via Redux Toolkit with redux-persist. My contributions include logout logic/CSS updates and transaction CRUD work (add/edit/delete by id). Technologies: React, Vite, React Router DOM, Redux Toolkit, redux-persist, Tailwind CSS, DaisyUI, Axios, react-hook-form, Formik, Yup, chart.js, react-chartjs-2, Vercel.",
  },
  {
    image: "/img/gadget-house-tc.netlify.app_.webp",
    alt: "Project 7 Screenshot",
    title: "Gadget House — Team Pet Project (React, TypeScript)",
    demo: "https://gadget-house-tc.netlify.app/",
    description:
      "React + TypeScript team project contribution focused on UI/UX polish and admin dashboard styling. Worked through feature branches and PR workflow, improving component visual states and consistency.",
    code: "https://github.com/mskmee/gadget-house/pull/178",
    tech: ["React", "TypeScript", "Vite", "Redux Toolkit", "Ant Design", "React Router", "SCSS Modules", "Netlify"],
    contribution:
      "Worked through feature branches and the team PR workflow on UI/UX polish and admin dashboard styling — including basket icon visual states via CSS variable fallbacks (PR #178).",
    modalDescription:
      "GadgetHouse is a React + TypeScript e-commerce frontend built with Vite. Uses Redux for state, Ant Design with UA locale and theme tokens, React Router for routes (main/category/product/basket/checkout/auth/dashboard). Styling is global SCSS plus SCSS Modules. Deployment via Netlify. My contribution: adjusted inactive basket icon styling via CSS variable fallback, worked on PR #178. Technologies: React, TypeScript, Vite, React Router, Redux Toolkit, Ant Design, react-toastify, Sass/SCSS, ESLint, Prettier, Stylelint, Husky, Docker, Netlify.",
  },
  {
    image: "/img/babytrack.webp",
    alt: "BabyTrack dashboard with activity timeline and daily stats",
    title: "BabyTrack — AI-Assisted Development Study (React 19)",
    demo: "https://baby-track-pied.vercel.app/login",
    description:
      "Mobile-first baby activity tracker built as a deliberate study of AI-assisted development with Claude and Codex — AI drafts the code, the engineering makes it work.",
    code: "https://github.com/Belevtsov91/BabyTrack",
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Radix UI", "localStorage"],
    modalDescription:
      "BabyTrack is a mobile-first baby activity tracker — feeding, sleep, diapers, temperature, and milestones collected into a live daily timeline with stats and upcoming-event predictions. No backend: the whole app runs on localStorage with a clean architecture. The real goal of the project was learning to work with AI coding tools (Claude, Codex, Lovable) in a disciplined way: AI generated the drafts fast, but the engineering was manual — adapting generated components to the real data model, resolving TypeScript conflicts and prop mismatches, removing duplicated logic, and making everything work across mobile and desktop. The honest breakdown of that process is documented in the README. Technologies: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI, localStorage.",
  },
  {
    image: "/img/low-analysis.webp",
    alt: "Law Analysis — Radiant 3D graph of connections between Ukrainian laws",
    title: "Law Analysis — Legal Tech Platform (Next.js, TypeScript)",
    demo: "https://low-analysis-frontend.vercel.app/",
    description:
      "Team platform that turns Ukrainian legislation into a structured, searchable knowledge base — with an AI assistant and a 3D graph of connections between laws. Core contributor across frontend and backend.",
    code: "https://github.com/dmitrysdevfs/low-analysis",
    tech: ["Next.js", "React 19", "TypeScript", "Three.js", "MongoDB", "Express", "BullMQ", "Google GenAI"],
    contribution:
      'Second-most-active contributor (44 commits) in a 6-person team. Shipped the "Radiant" 3D graph feature end-to-end — backend graph controller/service and cross-reference parser plus the frontend graph page — and worked on AI assistant integration, admin views, and error handling.',
    modalDescription:
      'Law Analysis is a legal-tech platform that parses Ukrainian laws into an atomic hierarchy (section → article → paragraph) stored in MongoDB, and builds tools on top: full-text search, an AI assistant (Google GenAI), a legislator cabinet, and "Radiant" — a 3D force graph of cross-references between laws with a time axis. Frontend: Next.js 16, React 19, TypeScript, Three.js / react-force-graph-3d, TanStack Query, Radix UI, Sentry. Backend: Express 5, Mongoose, Zod validation, JWT auth, BullMQ queues, WebSocket, Swagger. Deployed on Vercel (frontend) and Render (API).',
  },
];
