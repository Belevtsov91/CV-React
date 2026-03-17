import { useEffect } from "react";

export function useHorizontalDragScroll(listRef) {
  useEffect(() => {
    const projectsList = listRef.current;
    if (!projectsList) return;

    const onWheel = (event) => {
      if (projectsList.scrollWidth <= projectsList.clientWidth) return;

      const delta = event.deltaY || event.deltaX;
      if (delta === 0) return;

      event.preventDefault();
      projectsList.scrollLeft += delta;
    };

    projectsList.addEventListener("wheel", onWheel, { passive: false });

    const onDragStart = (event) => event.preventDefault();
    projectsList.addEventListener("dragstart", onDragStart);

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (event) => {
      const interactiveTarget = event.target.closest(
        "a, button, input, textarea, select, label",
      );
      if (interactiveTarget) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = projectsList.scrollLeft;
      projectsList.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      projectsList.scrollLeft = startScrollLeft - (event.clientX - startX);
    };

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      if (projectsList.hasPointerCapture(event.pointerId)) {
        projectsList.releasePointerCapture(event.pointerId);
      }
    };

    projectsList.addEventListener("pointerdown", onPointerDown);
    projectsList.addEventListener("pointermove", onPointerMove);
    projectsList.addEventListener("pointerup", endDrag);
    projectsList.addEventListener("pointercancel", endDrag);
    projectsList.addEventListener("pointerleave", endDrag);

    return () => {
      projectsList.removeEventListener("wheel", onWheel);
      projectsList.removeEventListener("dragstart", onDragStart);
      projectsList.removeEventListener("pointerdown", onPointerDown);
      projectsList.removeEventListener("pointermove", onPointerMove);
      projectsList.removeEventListener("pointerup", endDrag);
      projectsList.removeEventListener("pointercancel", endDrag);
      projectsList.removeEventListener("pointerleave", endDrag);
    };
  }, [listRef]);
}
