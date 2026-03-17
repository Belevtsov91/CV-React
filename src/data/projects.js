export const projects = [
  {
    image: "/img/game-pig.jpg",
    alt: "Project 6 Screenshot",
    title: "Game Pig — JavaScript browser game",
    demo: "https://game-pig-five.vercel.app/",
    description:
      "Lightweight browser game project focused on clean game logic, simple architecture, and iterative feature development.",
    code: "https://github.com/Belevtsov91/Game-pig",
    modalDescription:
      `Game-pig is a small frontend browser game (a "Pig Game" dice game) built primarily with JavaScript, HTML, and CSS, where two players take turns rolling a dice, accumulating a "current" turn score, choosing to "Hold" to bank points into their total score, and losing the turn when rolling a 1; the UI includes buttons for New game / Roll dice / Hold, dynamically updates player scores in the DOM, visually highlights the active player, hides/shows the dice image based on game state, and marks the winner once a player reaches 100 points (all behavior implemented with vanilla DOM event listeners and state variables). Technologies & libraries used: JavaScript, HTML, CSS, Vite, npm, Prettier.`,
  },
  {
    image: "/project1.jpg",
    alt: "Project 1 Screenshot",
    title: "WebStudio — responsive landing page",
    demo: "https://belevtsov91.github.io/goit-markup-hw-06/",
    description:
      "Responsive single-page WebStudio landing built with HTML5/CSS3. Includes core sections, SVG sprites, forms, hover effects, and mobile menu/modal states via CSS classes, using Flexbox and media queries (with retina images).",
    code: "https://github.com/Belevtsov91/goit-markup-hw-06",
    modalDescription:
      `Responsive single-page WebStudio landing built with semantic HTML5 and custom CSS3 (no build tooling). The project includes a structured layout (header/hero/benefits/team/portfolio/footer), SVG sprite-based icon system, responsive/retina images via srcset, and UI overlays (mobile off-canvas menu + modal contact form) whose visibility is controlled through CSS state classes (e.g., .is-open). Styling follows a mobile-first approach with breakpoints for mobile/tablet/desktop (~320/768/1158), uses Flexbox for alignment, transitions for hover/focus interactions, and a normalize reset + Google Fonts via CDN.`,
  },
  {
    image: "/js-project.jpg",
    alt: "Project 2 Screenshot",
    title: "Image Search App — Pixabay Gallery",
    demo: "https://belevtsov91.github.io/goit-js-hw-12/",
    description:
      `Responsive Pixabay Image Search app built with Vanilla JS (Vite) — API-driven gallery with form validation, loader/toast notifications, and "Load more" pagination with smooth scrolling.`,
    code: "https://github.com/Belevtsov91/goit-js-hw-12",
    modalDescription:
      `Pixabay Image Search frontend app built with Vanilla JavaScript and Vite (ES modules). The core flow is an API-driven search gallery: the user submits a search form, results are fetched through a dedicated API layer using Axios, and the UI is updated via separate rendering helpers. UX details include a visible loader, toast notifications, and a "Load more" button that drives pagination. The gallery experience is enhanced with a lightbox library. Technologies & libraries used: Vite, Vanilla JavaScript (ES modules), HTML, CSS, Axios, iziToast, SimpleLightbox, Flatpickr, PostCSS.`,
  },
  {
    image: "/typeScript.jpg",
    alt: "Project 4 Screenshot",
    title: "Image Search Gallery — React + TypeScript",
    demo: "https://goit-typescript-hw-02-gray-delta.vercel.app/",
    description:
      `Built a React + TypeScript image search gallery (Vite) with Axios API requests, responsive UI, modal preview, pagination via "Load More", and clear UX states for loading and errors.`,
    code: "https://github.com/Belevtsov91/goit-typescript-hw-02",
    modalDescription:
      `React application built with TypeScript and Vite. Core user flow: image search powered by the Unsplash API — users submit a query, the app renders a gallery, shows a loading indicator, displays errors on failures, supports pagination via a "load more" button (12 items per request), and opens a selected image in a modal overlay. Styling combines global CSS with component-scoped CSS Modules. Technologies & libraries used: React, TypeScript, Vite, SWC, Axios, react-hot-toast, react-modal, react-loader-spinner, react-icons, ESLint.`,
  },
  {
    image: "/phoneBook.jpg",
    alt: "Project 3 Screenshot",
    title: "Phonebook App — Auth & Contacts",
    demo: "https://goit-react-hw-08-nine-sand.vercel.app/",
    description:
      "Developed a Vite + React phonebook app with JWT-based authentication, protected routes, and full CRUD for contacts using Redux Toolkit, redux-persist, Axios, Formik/Yup, and Material UI.",
    code: "https://github.com/Belevtsov91/goit-react-hw-08",
    modalDescription:
      "React + Vite single-page Phonebook app with React Router navigation (Home, Login, Register, Contacts, NotFound) and a shared layout. The Contacts page is protected by custom PrivateRoute/PublicRoute logic. Authentication is implemented via Axios calls to an external REST API, with the token stored in Redux Toolkit state and persisted via redux-persist. Users manage contacts through Redux async thunks (fetch/add/delete) with toast notifications. Styling uses CSS Modules and Material UI. Technologies: React, Vite, React Router DOM, Redux Toolkit, redux-persist, Axios, Formik, Yup, react-hot-toast, Material UI, ESLint.",
  },
  {
    image: "/img/team-project.jpg",
    alt: "Project 5 Screenshot",
    title: "Money Guard — Frontend",
    demo: "https://money-guard-frontend.vercel.app/login",
    description:
      "Frontend team project for personal finance tracking integrated with backend API. Implemented logout flow (modal, API call, token cleanup) and transactions CRUD with practical UI wiring and data-flow validation.",
    code: "https://github.com/Inna-Khalas/Money_Guard_frontend",
    modalDescription:
      "Money_Guard_frontend is a Vite-built React SPA for personal finance tracking. Uses React Router with guarded routes (login/register vs private dashboard) and nested dashboard tabs (home/statistics/currency). State managed via Redux Toolkit with redux-persist. My contributions include logout logic/CSS updates and transaction CRUD work (add/edit/delete by id). Technologies: React, Vite, React Router DOM, Redux Toolkit, redux-persist, Tailwind CSS, DaisyUI, Axios, react-hook-form, Formik, Yup, chart.js, react-chartjs-2, Vercel.",
  },
  {
    image: "/img/gadget-house-tc.netlify.app_.jpg",
    alt: "Project 7 Screenshot",
    title: "Gadget House — Team Pet Project (React, TypeScript)",
    demo: "https://gadget-house-tc.netlify.app/",
    description:
      "React + TypeScript team project contribution focused on UI/UX polish and admin dashboard styling. Worked through feature branches and PR workflow, improving component visual states and consistency.",
    code: "https://github.com/mskmee/gadget-house/pull/178",
    modalDescription:
      "GadgetHouse is a React + TypeScript e-commerce frontend built with Vite. Uses Redux for state, Ant Design with UA locale and theme tokens, React Router for routes (main/category/product/basket/checkout/auth/dashboard). Styling is global SCSS plus SCSS Modules. Deployment via Netlify. My contribution: adjusted inactive basket icon styling via CSS variable fallback, worked on PR #178. Technologies: React, TypeScript, Vite, React Router, Redux Toolkit, Ant Design, react-toastify, Sass/SCSS, ESLint, Prettier, Stylelint, Husky, Docker, Netlify.",
  },
];
