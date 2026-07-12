import { useEffect, useRef } from "react";
import "../../css/modalWindow.css";

export default function ModalWindow({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;

    if (dialog && !dialog.open) {
      try {
        dialog.showModal();
      } catch {
        dialog.setAttribute("open", "");
      }
    }

    const onEscapePress = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscapePress);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscapePress);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleDialogClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      className={`modal-window ${className}`.trim()}
      aria-label={title || "Modal window"}
      onClick={handleDialogClick}
      onCancel={handleCancel}
    >
      <div className="modal-inner">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close modal"
          onClick={onClose}
        />

        {title && <h2 className="modal-title">{title}</h2>}

        <div className="modal-content">{children}</div>
      </div>
    </dialog>
  );
}
