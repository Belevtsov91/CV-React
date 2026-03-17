import { useEffect } from "react";
import "../../css/modalWindow.css";

export default function ModalWindow({
  isOpen,
  onClose,
  children,
  title,
  className = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEscapePress = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscapePress);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscapePress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={handleOverlayClick}
    >
      <section
        className={`modal-window ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal window"}
      >
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close modal"
          onClick={onClose}
        />

        {title && <h2 className="modal-title">{title}</h2>}

        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
}
