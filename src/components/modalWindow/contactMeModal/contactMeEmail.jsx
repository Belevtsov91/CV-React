import ModalWindow from "../modalWindow";
import { useContactForm, SUBJECT_OPTIONS } from "@/hooks/useContactForm";

const RECIPIENT_EMAIL = "vitaliybelevcov@gmail.com";

export default function ContactMeEmail({ isOpen, onClose }) {
  const { fields, errors, valid, sending, handleClose, handleChange, handleSubmit, runValidation } =
    useContactForm({
      onClose,
      messageTransform: (f) => `${f.message}\n\nBest regards,\n${f.name}\n${f.email}`,
      successToast: "Message sent! I'll get back to you soon.",
    });

  const handleSendFromEmail = () => {
    if (!runValidation()) return;
    const body = encodeURIComponent(
      `${fields.message}\n\nBest regards,\n${fields.name}\n${fields.email}`,
    );
    const subject = encodeURIComponent(`[${fields.subject}] Message from ${fields.name}`);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT_EMAIL}&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer",
    );
    handleClose();
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={handleClose}
      className="contact-me-modal"
      title="Send a Message"
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
          <label className="contact-me-label" htmlFor="contact-name">
            Name
          </label>
          <input
            className={`contact-me-input${errors.name ? " is-error" : valid.name ? " is-valid" : ""}`}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="contact-email">
            Email
          </label>
          <input
            className={`contact-me-input${errors.email ? " is-error" : valid.email ? " is-valid" : ""}`}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-field">
          <label className="contact-me-label" htmlFor="contact-subject">
            Subject
          </label>
          <select
            className={`contact-me-select${errors.subject ? " is-error" : valid.subject ? " is-valid" : ""}`}
            id="contact-subject"
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
          <label className="contact-me-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            className={`contact-me-textarea${errors.message ? " is-error" : valid.message ? " is-valid" : ""}`}
            id="contact-message"
            name="message"
            placeholder="Write your message..."
            value={fields.message}
            onChange={handleChange}
          />
        </div>

        <div className="contact-me-actions">
          <button
            type="submit"
            className="contact-me-btn contact-me-btn--email"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
          <button
            type="button"
            className="contact-me-btn contact-me-btn--mailto"
            onClick={handleSendFromEmail}
          >
            Send from your Email
          </button>
        </div>
      </form>
    </ModalWindow>
  );
}
