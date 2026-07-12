import { useState } from "react";
import { contactLinks } from "../../data/contactData";
import SectionHeading from "../shared/SectionHeading";
import ContactMeEmail from "../modalWindow/contactMeModal/contactMeEmail";
import ContactMeTelegram from "../modalWindow/contactMeModal/contactMeTelegram";

export const VIBER_DEFAULT_FALLBACK = "https://www.viber.com/download/";

const CHANNEL_ICON_PATHS = {
  email:
    "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2 1.9V18h16V7.4l-8 5.3-8-5.3ZM18.8 6H5.2L12 10.5 18.8 6Z",
  telegram: "M2.4 20.6 22 12 2.4 3.4l-.01 6.7L16 12 2.39 13.9l.01 6.7Z",
  viber:
    "M6.6 10.8c1.4 2.7 3.9 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.65 15.02L2 22l5.14-1.31A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.11 14.86l-.29-.17-3.05.78.81-2.97-.19-.31A8 8 0 0 1 12 4Zm-3.2 3.6c-.2 0-.5.07-.76.35-.26.28-1 .97-1 2.36 0 1.4 1.02 2.75 1.16 2.94.14.19 1.97 3.15 4.86 4.29 2.4.95 2.89.76 3.41.71.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.28-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.11-.17.19-.33.21-.62.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.44.13-.58.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.53-.87-2.1-.23-.55-.46-.47-.63-.48l-.57-.03Z",
};

function ChannelIcon({ type }) {
  const path = CHANNEL_ICON_PATHS[type];
  if (!path) return null;
  return (
    <svg
      className="contact-social-icon"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default function ContactSection() {
  const [activeModal, setActiveModal] = useState(null); // null | 'email' | 'telegram'

  const onViberClick = (event) => {
    event.preventDefault();

    const appUrl = event.currentTarget.getAttribute("href");
    const fallbackUrl =
      event.currentTarget.getAttribute("data-fallback") ||
      VIBER_DEFAULT_FALLBACK;

    if (!appUrl) {
      window.location.href = fallbackUrl;
      return;
    }

    let appOpened = false;

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange, {
      once: true,
    });

    window.location.href = appUrl;

    const timerId = window.setTimeout(() => {
      if (!appOpened) {
        window.location.href = fallbackUrl;
      }
    }, 1200);

    window.addEventListener(
      "pagehide",
      () => {
        window.clearTimeout(timerId);
      },
      { once: true },
    );
  };

  return (
    <section className="contact-form" id="contact">
      <SectionHeading title="Contact Me" titleClassName="contact-title" />

      <div className="contact-panel" data-reveal>
        <h3 className="contact-panel-title">
          Let&rsquo;s build something together
        </h3>
        <p className="contact-panel-sub">
          Open to junior frontend / full-stack roles — remote or on-site.
          The fastest ways to reach me:
        </p>
        <div className="contact-socials">
        {contactLinks.map((link, index) => (
          <a
            className="contact-social-link"
            key={link.label}
            href={link.href}
            data-fallback={link.fallback}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index * 60, 240)}ms` }}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.ariaLabel}
            onClick={
              link.isViber
                ? onViberClick
                : link.isEmail
                  ? (e) => {
                      e.preventDefault();
                      setActiveModal("email");
                    }
                  : link.isTelegram
                    ? (e) => {
                        e.preventDefault();
                        setActiveModal("telegram");
                      }
                    : undefined
            }
          >
            <ChannelIcon type={link.icon} />
            {link.label}
          </a>
        ))}
        </div>
      </div>

      <ContactMeEmail
        isOpen={activeModal === "email"}
        onClose={() => setActiveModal(null)}
      />
      <ContactMeTelegram
        isOpen={activeModal === "telegram"}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}
