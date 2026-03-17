# Patterns

Reusable high-signal patterns observed in this project.

---

## Shared form hook (useContactForm)
Extract validation + rate-limit + submit into a single hook.
Accept `messageTransform` and `successToast` as options.
Expose `runValidation()` so modal-specific secondary actions (Gmail compose, Open Bot) can validate without triggering submit.

## data-reveal attribute for scroll animations
Use `data-reveal` attribute on elements instead of hardcoded CSS selector lists.
`useScrollReveal` queries `[data-reveal]` — adding a new animated element requires only one change in the component, not in the hook.

## Lazy-load heavy dependencies
PDF generation via `@react-pdf/renderer` is lazy-loaded with `React.lazy` + `Suspense`.
Keeps initial bundle lean; PDF code only loads when user clicks the download button.

## Env validation at startup (backend)
Parse all env vars through Zod schema at server startup.
Server refuses to start if any required var is missing — fails fast with a clear error list instead of cryptic runtime errors later.
