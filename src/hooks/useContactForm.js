import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const COOLDOWN_KEY = "cv_last_message_sent";
const COOLDOWN_MS = 60_000;
const VALIDATION_RESET_MS = 2_000;

export const SUBJECT_OPTIONS = [
  { value: "", label: "Select a subject…" },
  { value: "Job Opportunity", label: "Job Opportunity" },
  { value: "Freelance Project", label: "Freelance Project" },
  { value: "Collaboration", label: "Collaboration" },
  { value: "Other", label: "Other" },
];

// Mirrors backend Zod schema (name 2-100, message 10-2000).
// MESSAGE_MAX is lower than 2000 to leave room for the signature appended
// by messageTransform (name + email can add up to ~380 chars).
export const NAME_MAX = 100;
export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 1600;

const EMPTY_FIELDS = { name: "", email: "", subject: "", message: "", website: "" };

export function useContactForm({ onClose, messageTransform, successToast }) {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (Object.keys(valid).length === 0) return;
    const t = setTimeout(() => setValid({}), VALIDATION_RESET_MS);
    return () => clearTimeout(t);
  }, [valid]);

  const handleClose = () => {
    setFields(EMPTY_FIELDS);
    setErrors({});
    setValid({});
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    const name = fields.name.trim();
    if (!name) next.name = "Name is required";
    else if (name.length < 2) next.name = "Name must be at least 2 characters";

    const email = fields.email.trim();
    if (!email) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";

    if (!fields.subject) next.subject = "Please select a subject";

    const message = fields.message.trim();
    if (!message) next.message = "Message is required";
    else if (message.length < MESSAGE_MIN)
      next.message = `Message must be at least ${MESSAGE_MIN} characters`;

    return next;
  };

  const getValidFields = (next) => {
    const v = {};
    if (!next.name) v.name = true;
    if (!next.email) v.email = true;
    if (!next.subject) v.subject = true;
    if (!next.message) v.message = true;
    return v;
  };

  // Runs validation, sets error/valid state, shows toast — returns true if valid
  const runValidation = () => {
    const next = validate();
    const validFields = getValidFields(next);
    setErrors(next);
    setValid(validFields);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!runValidation()) return;

    if (!import.meta.env.DEV) {
      try {
        const lastSent = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
        const remaining = Math.ceil((COOLDOWN_MS - (Date.now() - lastSent)) / 1000);
        if (remaining > 0) {
          toast.error(`Please wait ${remaining}s before sending again.`);
          return;
        }
      } catch {
        // localStorage unavailable — skip cooldown check
      }
    }

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: messageTransform(fields),
          website: fields.website,
        }),
      });

      if (res.ok) {
        try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch { /* ignore */ }
        toast.success(successToast);
        handleClose();
        return;
      }

      if (res.status === 429) {
        toast.error("Too many messages. Please try again later.");
      } else if (res.status >= 400 && res.status < 500) {
        toast.error("Check your inputs and try again.");
      } else {
        toast.error("Server error. Try again in a moment.");
      }
    } catch {
      toast.error("No connection. Check your internet.", {
        action: { label: "Retry", onClick: () => handleSubmit() },
      });
    } finally {
      setSending(false);
    }
  };

  return {
    fields,
    errors,
    valid,
    sending,
    handleClose,
    handleChange,
    handleSubmit,
    runValidation,
  };
}
