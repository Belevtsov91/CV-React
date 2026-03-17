# Anti-patterns

Patterns to avoid in this project.

---

## Hardcoded selector lists for animations
Using an array of CSS selectors in `useScrollReveal` requires updating both the hook and the component when adding a new animated element.
Use `data-reveal` attribute instead.

## Duplicate form logic across modals
Both contact modals had identical validation, rate-limiting, and fetch logic copy-pasted.
Extract into `useContactForm` hook.

## IS_DEV via API URL string check
`const IS_DEV = API_URL.includes("localhost")` — fragile, breaks if URL format changes.
Use `import.meta.env.DEV` (Vite native).

## Two boolean states for mutually exclusive modals
`isEmailModalOpen` + `isTelegramModalOpen` — can theoretically both be true.
Use `activeModal: null | 'email' | 'telegram'` instead.

## Default Vite README in a portfolio project
Shipping a Vite boilerplate README to a public repo signals inattention.
A tech lead or recruiter who opens the repo sees it immediately.
