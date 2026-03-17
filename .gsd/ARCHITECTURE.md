# Architecture

## Frontend (CV-React)

```
src/
  components/
    sections/       — Sidebar, About, Experience, Projects, Education, Skills, Contact
    modalWindow/    — Base modal + section modals + contact forms (email, telegram)
    pdf/            — CVDocument (react-pdf), PDFDownloadButton (lazy-loaded)
    shared/         — SectionHeading, LinkIcon
    ErrorBoundary.jsx
  hooks/
    useScrollReveal.js         — IntersectionObserver, data-reveal attribute
    useHorizontalDragScroll.js — drag + wheel for projects list
    useContactForm.js          — shared form state, validation, rate limit, submit
  data/
    sidebarData.js, experienceData.js, educationData.js, projects.js,
    skillsData.js, aboutData.js, contactData.js
  css/
    variables.css, aside.css, About.css, Experience.css,
    Latest_projects.css, Education.css, Skills.css, Contact-form.css,
    modalWindow.css
  App.css           — global styles, animations, reveal, responsive
  AppContainer.jsx  — root: skillsState, projectsListRef
  main.jsx          — entry: StrictMode + ErrorBoundary + App + Toaster
```

## Key constraints
- No TypeScript, no routing library, no global state library
- Plain CSS with CSS custom properties (variables.css)
- PDF generated client-side, lazy-loaded
- Contact form → POST /api/messages (backend)
- Scroll reveal via data-reveal attribute + IntersectionObserver
- Skills accordion state persisted in localStorage

## Backend (back-CV-react)

```
src/
  server.js         — entry: Express app + Telegram bot + graceful shutdown
  app.js            — middleware stack: helmet, cors, rate limit, morgan, swagger
  bot.js            — Telegraf bot setup
  config/env.js     — Zod env validation at startup
  routes/
    health.routes.js
    messages.routes.js  — POST /api/messages (core endpoint)
  middlewares/
    validateBody.js, requireJson.js, errorHandler.js, notFoundHandler.js
  utils/
    telegram.js, email.js, AppError.js
  docs/openapi.js
```

## API contract
```
POST /api/messages
Body: { name, email, subject, message, website }
201:  { success: true, data: { receivedAt } }
400:  Zod validation error
415:  Wrong Content-Type
429:  Rate limit exceeded
500:  Internal server error
```
