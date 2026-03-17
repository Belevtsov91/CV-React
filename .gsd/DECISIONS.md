# Decisions

Reasoning archive — why we chose X over Y.
For operative implementation rules see MEMORY.md.

- Plain CSS over CSS modules or Tailwind: project is small enough that scoped modules add friction without benefit; global custom properties in variables.css are sufficient.
- No TypeScript: speed of iteration prioritised at current project scale; can be added later without architectural changes.
- PDF generated client-side via @react-pdf/renderer (lazy-loaded): avoids server dependency for a static asset; lazy load keeps initial bundle lean.
- Prefer minimal safe patches over refactors unless refactor is explicitly requested: reduces regression surface.
- Swagger must match real runtime behavior, not assumptions: drift has caused bugs in the past (backend).
