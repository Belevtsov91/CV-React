import { useEffect, useMemo, useRef, useState } from "react";
import {
  SUBJECT_OPTIONS,
  NAME_MAX,
  MESSAGE_MIN,
  MESSAGE_MAX,
} from "@/hooks/useContactForm";
import TgGame from "./TgGame";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const BOT_URL = "https://t.me/belevtsov_cv_bot";

const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

function validate(fields) {
  const errors = {};
  const name = fields.name.trim();
  if (!name) errors.name = "Name is required";
  else if (name.length < 2) errors.name = "At least 2 characters";

  const email = fields.email.trim();
  if (!email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";

  if (!fields.subject) errors.subject = "Please select a subject";

  const message = fields.message.trim();
  if (!message) errors.message = "Message is required";
  else if (message.length < MESSAGE_MIN)
    errors.message = `At least ${MESSAGE_MIN} characters`;

  return errors;
}

export default function TgApp() {
  const insideTelegram = Boolean(tg?.initData);

  const [fields, setFields] = useState(() => {
    const u = tg?.initDataUnsafe?.user;
    const prefill = u ? [u.first_name, u.last_name].filter(Boolean).join(" ") : "";
    return { name: prefill, email: "", subject: "", message: "" };
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");
  const [view, setView] = useState("form"); // form | game

  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.("#0a0714");
    tg.setBackgroundColor?.("#0a0714");
  }, []);

  const submit = useMemo(
    () => async () => {
      const current = fieldsRef.current;
      const nextErrors = validate(current);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) {
        tg?.HapticFeedback?.notificationOccurred?.("error");
        return;
      }

      setStatus("sending");
      setServerError("");
      tg?.MainButton?.showProgress?.();

      try {
        const res = await fetch(`${API_URL}/api/telegram-app/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: current.name.trim(),
            email: current.email.trim(),
            subject: current.subject,
            message: current.message.trim(),
            initData: tg?.initData || "",
          }),
        });

        if (res.ok) {
          setStatus("success");
          tg?.HapticFeedback?.notificationOccurred?.("success");
          tg?.MainButton?.hide?.();
          setTimeout(() => tg?.close?.(), 2200);
          return;
        }

        const body = await res.json().catch(() => null);
        setServerError(
          body?.error?.message ||
            (res.status === 429
              ? "Daily limit reached. Please try again tomorrow."
              : "Something went wrong. Please try again."),
        );
        setStatus("error");
        tg?.HapticFeedback?.notificationOccurred?.("error");
      } catch {
        setServerError("Network error. Check your connection and try again.");
        setStatus("error");
        tg?.HapticFeedback?.notificationOccurred?.("error");
      } finally {
        tg?.MainButton?.hideProgress?.();
      }
    },
    [],
  );

  // Native Telegram MainButton drives the submit — only on the form view
  useEffect(() => {
    if (!tg?.MainButton || !insideTelegram) return undefined;
    const btn = tg.MainButton;
    if (view !== "form" || status === "success") {
      btn.hide();
      return undefined;
    }
    btn.setParams({ text: "SEND MESSAGE", color: "#9251f7", text_color: "#ffffff" });
    btn.show();
    btn.onClick(submit);
    return () => btn.offClick(submit);
  }, [submit, insideTelegram, view, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  if (status === "success") {
    return (
      <div className="tg-shell">
        <div className="tg-success">
          <div className="tg-success-ring">
            <svg viewBox="0 0 52 52" className="tg-success-check" aria-hidden="true">
              <path d="M14 27 L23 35 L38 18" fill="none" />
            </svg>
          </div>
          <h1 className="tg-success-title">Message sent!</h1>
          <p className="tg-success-sub">
            Thanks, {fields.name.trim().split(" ")[0] || "friend"} — I&apos;ll reply within
            24 hours. A confirmation is on its way to your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tg-shell">
      <header className="tg-head">
        <img
          className="tg-avatar"
          src="/img/CV-photo.webp"
          alt="Vitalii Belevtsov"
          width="52"
          height="52"
        />
        <div>
          <h1 className="tg-title">Message Vitalii</h1>
          <p className="tg-subtitle">
            Junior Frontend / Full-Stack Developer · replies within 24h
          </p>
        </div>
      </header>

      <div className="tg-tabs" role="tablist" aria-label="View">
        <button
          type="button"
          role="tab"
          aria-selected={view === "form"}
          className={`tg-tab${view === "form" ? " is-active" : ""}`}
          onClick={() => setView("form")}
        >
          ✉️ Message
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "game"}
          className={`tg-tab${view === "game" ? " is-active" : ""}`}
          onClick={() => setView("game")}
        >
          🎮 Debug Dash
        </button>
      </div>

      {view === "game" ? (
        <TgGame />
      ) : (
        <>
      {!insideTelegram && (
        <div className="tg-warn">
          This form is signed by Telegram and only works inside the app.{" "}
          <a href={BOT_URL}>Open the bot</a> and tap «✨ Open Form».
        </div>
      )}

      <form
        className="tg-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        <div className="tg-field">
          <label className="tg-label" htmlFor="tgapp-name">Name</label>
          <input
            id="tgapp-name"
            className={`tg-input${errors.name ? " is-error" : ""}`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX}
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
          />
          {errors.name && <span className="tg-error">{errors.name}</span>}
        </div>

        <div className="tg-field">
          <label className="tg-label" htmlFor="tgapp-email">Email</label>
          <input
            id="tgapp-email"
            className={`tg-input${errors.email ? " is-error" : ""}`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="your@email.com"
            value={fields.email}
            onChange={handleChange}
          />
          {errors.email && <span className="tg-error">{errors.email}</span>}
        </div>

        <div className="tg-field">
          <label className="tg-label" htmlFor="tgapp-subject">Subject</label>
          <select
            id="tgapp-subject"
            className={`tg-input tg-select${errors.subject ? " is-error" : ""}`}
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
          {errors.subject && <span className="tg-error">{errors.subject}</span>}
        </div>

        <div className="tg-field">
          <label className="tg-label" htmlFor="tgapp-message">Message</label>
          <textarea
            id="tgapp-message"
            className={`tg-input tg-textarea${errors.message ? " is-error" : ""}`}
            name="message"
            maxLength={MESSAGE_MAX}
            placeholder="Write your message…"
            value={fields.message}
            onChange={handleChange}
          />
          <div className="tg-field-footer">
            {errors.message ? (
              <span className="tg-error">{errors.message}</span>
            ) : (
              <span />
            )}
            <span className="tg-counter">
              {fields.message.length}/{MESSAGE_MAX}
            </span>
          </div>
        </div>

        {serverError && <div className="tg-server-error">{serverError}</div>}

        {(!insideTelegram || !tg?.MainButton) && (
          <button className="tg-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        )}
      </form>
        </>
      )}
    </div>
  );
}
