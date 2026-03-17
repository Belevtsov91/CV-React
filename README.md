# belevtsov.dev — Personal CV & Portfolio

Interactive CV/portfolio site built with React + Vite. Features a downloadable PDF CV, contact forms with Telegram and email delivery, and scroll-reveal animations.

**Live:** [belevtsov.dev](https://belevtsov-dev.vercel.app)
**Backend:** [back-CV-react](https://github.com/Belevtsov91/back-CV-react)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Plain CSS, CSS custom properties |
| PDF generation | @react-pdf/renderer (lazy-loaded) |
| Toasts | sonner |
| Backend | Node.js / Express (separate repo) |

---

## Features

- **Downloadable PDF CV** — generated client-side via `@react-pdf/renderer`, lazy-loaded on demand
- **Contact forms** — Email and Telegram channels, both POST to the backend API
- **Honeypot bot protection** — hidden field catches automated submissions before they reach the server
- **Client-side rate limiting** — localStorage cooldown prevents accidental double-sends
- **Scroll-reveal animations** — IntersectionObserver, respects `prefers-reduced-motion`
- **Horizontal drag scroll** — pointer-events drag on the projects list
- **Skills accordion** — state persisted in localStorage
- **Responsive** — mobile (320px+), tablet (768px+), desktop

---

## Project structure

```
src/
  components/
    sections/       — Sidebar, About, Experience, Projects, Education, Skills, Contact
    modalWindow/    — Base modal + section-specific modals + contact forms
    pdf/            — CVDocument, PDFDownloadButton
    shared/         — SectionHeading, LinkIcon
  hooks/
    useScrollReveal.js       — IntersectionObserver scroll reveal
    useHorizontalDragScroll.js — drag + wheel scroll for projects list
    useContactForm.js        — shared form state, validation, rate limit, submit
  data/             — sidebarData, experienceData, educationData, projects, skillsData
  css/              — variables, section styles
```

---

## Run locally

```bash
# 1. Clone and install
git clone https://github.com/Belevtsov91/CV-React.git
cd CV-React
npm install

# 2. Set API URL (optional — needed for contact forms)
cp .env.example .env
# Edit VITE_API_URL to point at your backend instance

# 3. Start dev server
npm run dev
```

The site works without the backend — contact form submissions will fail, everything else is functional.

```bash
npm run build    # production build
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | Backend base URL |

In `development` mode (`import.meta.env.DEV`) the client-side rate-limit cooldown is skipped.

---

## Contact form flow

```
User fills form
  → client validation (name, email, subject, message)
  → honeypot check (website field must be empty)
  → client-side cooldown check (localStorage, 60s, dev only skipped)
  → POST /api/messages
      → Zod validation (server)
      → IP rate limit (server)
      → Telegram notification + email notification (parallel)
      → confirmation email to sender (fire-and-forget)
```
