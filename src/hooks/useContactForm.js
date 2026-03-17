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
    const messages = [];
    if (!fields.name.trim()) { next.name = true; messages.push("Name is required"); }
    if (!fields.email.trim()) {
      next.email = true; messages.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      next.email = true; messages.push("Enter a valid email");
    }
    if (!fields.subject) { next.subject = true; messages.push("Please select a subject"); }
    if (!fields.message.trim()) { next.message = true; messages.push("Message is required"); }
    return { next, messages };
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
    const { next, messages } = validate();
    const validFields = getValidFields(next);
    setErrors(next);
    setValid(validFields);
    if (messages.length) {
      toast.error(messages.join(" · "));
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
