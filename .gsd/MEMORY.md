# Memory

Operative rules — what to remember during implementation.
For reasoning archive (why we chose X) see DECISIONS.md.

- This repository prefers controlled minimal patches.
- Docs drift is a recurring risk area — README and CVDocument.jsx must stay in sync with actual data files.
- Contract preservation is important unless user explicitly requests breaking changes.
- data-reveal attribute controls scroll animations — adding a new animated element requires only the attribute in JSX, not a hook change.
- Contact form API contract: POST /api/messages with { name, email, subject, message, website }.
