# Bug Catalog

Known bugs, past incidents, and their fixes.

---

## About Me section invisible on load
**Symptom:** `.about-content` not animating in.
**Cause:** Missing from `REVEAL_SELECTORS` array in `useScrollReveal`.
**Fix:** Added `.about-content` to the selector list (later migrated to `data-reveal` attribute).

## GoIT education modal broken after data migration
**Symptom:** Clicking GoIT card in Education section opened empty modal.
**Cause:** GoIT entry was removed from `experienceData.js` but `educationsModal.jsx` still looked it up there via `EDUCATION_TO_EXPERIENCE_MODAL_MAP`.
**Fix:** Moved GoIT modal data to `educationData.js` and updated the modal to read from there.

## Soft skills gap not working between h3 and ul
**Symptom:** `.soft-skills` h3/ul gap not applying correctly.
**Cause:** CSS selector group for the gap rule didn't include `.soft-skills` wrapper.
**Fix:** Added `.soft-skills` to the CSS selector group alongside `.languages`.

## Smart quotes breaking projects.js
**Symptom:** Build error / JS parse error in `projects.js`.
**Cause:** Write tool inserted smart/curly quotes instead of straight quotes in string literals.
**Fix:** Rewrote affected strings using template literals.
