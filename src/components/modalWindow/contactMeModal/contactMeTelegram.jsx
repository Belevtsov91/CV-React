import ModalWindow from "../modalWindow";
import { useContactForm, SUBJECT_OPTIONS } from "@/hooks/useContactForm";

const TELEGRAM_BOT_URL = "https://t.me/belevtsov_cv_bot";

export default function ContactMeTelegram({ isOpen, onClose }) {
  const { fields, errors, valid, sending, handleClose, handleChange, handleSubmit, runValidation } =
    useContactForm({
      onClose,
      messageTransform: (f) => f.message,
      successToast: "Message sent via Telegram!",
    });

  const handleOpenBot = () => {
    if (!runValidation()) return;
    window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={handleClose}
      className="contact-me-modal"
      title="Contact via Telegram"
    >
      <form
        className="contact-me-form"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        noValidate
      >
        <input
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-name">Name</label>
          <input
            className={`contact-me-input${errors.name ? " is-error" : valid.name ? " is-valid" : ""}`}
            id="tg-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-email">Email</label>
          <input
            className={`contact-me-input${errors.email ? " is-error" : valid.email ? " is-valid" : ""}`}
            id="tg-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-subject">Subject</label>
          <select
            className={`contact-me-select${errors.subject ? " is-error" : valid.subject ? " is-valid" : ""}`}
            id="tg-subject"
            name="subject"
            value={fields.subject}
            onChange={handleChange}
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-message">Message</label>
          <textarea
            className={`contact-me-textarea${errors.message ? " is-error" : valid.message ? " is-valid" : ""}`}
            id="tg-message"
            name="message"
            placeholder="Write your message..."
            value={fields.message}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-actions">
          <button
            type="submit"
            className="contact-me-btn contact-me-btn--telegram"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send via Telegram"}
          </button>
          <button
            type="button"
            className="contact-me-btn contact-me-btn--bot"
            onClick={handleOpenBot}
          >
            Open Telegram Bot
          </button>
        </div>
      </form>
    </ModalWindow>
  );
}
