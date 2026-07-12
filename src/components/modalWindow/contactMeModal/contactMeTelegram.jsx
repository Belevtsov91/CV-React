import ModalWindow from "../modalWindow";
import {
  useContactForm,
  SUBJECT_OPTIONS,
  NAME_MAX,
  MESSAGE_MAX,
} from "@/hooks/useContactForm";

const TELEGRAM_BOT_URL = "https://t.me/belevtsov_cv_bot";

export default function ContactMeTelegram({ isOpen, onClose }) {
  const { fields, errors, valid, sending, handleClose, handleChange, handleSubmit } =
    useContactForm({
      onClose,
      messageTransform: (f) => f.message,
      successToast: "Message sent via Telegram!",
    });

  const handleOpenBot = () => {
    window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer");
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
            autoFocus
            maxLength={NAME_MAX}
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="contact-me-error">{errors.name}</span>}
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-email">Email</label>
          <input
            className={`contact-me-input${errors.email ? " is-error" : valid.email ? " is-valid" : ""}`}
            id="tg-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="your@email.com"
            value={fields.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="contact-me-error">{errors.email}</span>}
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-subject">Subject</label>
          <select
            className={`contact-me-select${errors.subject ? " is-error" : valid.subject ? " is-valid" : ""}`}
            id="tg-subject"
            name="subject"
            value={fields.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.subject && <span className="contact-me-error">{errors.subject}</span>}
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="tg-message">Message</label>
          <textarea
            className={`contact-me-textarea${errors.message ? " is-error" : valid.message ? " is-valid" : ""}`}
            id="tg-message"
            name="message"
            maxLength={MESSAGE_MAX}
            placeholder="Write your message..."
            value={fields.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
          />
          <div className="contact-me-field-footer">
            {errors.message ? (
              <span className="contact-me-error">{errors.message}</span>
            ) : (
              <span />
            )}
            <span className="contact-me-counter">
              {fields.message.length}/{MESSAGE_MAX}
            </span>
          </div>
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
