import { useState } from "react";
import { contactLinks } from "../../data/contactData";
import SectionHeading from "../shared/SectionHeading";
import ContactMeEmail from "../modalWindow/contactMeModal/contactMeEmail";
import ContactMeTelegram from "../modalWindow/contactMeModal/contactMeTelegram";

export const VIBER_DEFAULT_FALLBACK = "https://www.viber.com/download/";

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
    <section className="contact-form">
      <SectionHeading title="Contact Me" titleClassName="contact-title" />

      <div className="contact-socials">
        {contactLinks.map((link) => (
          <a
            className="contact-social-link"
            key={link.label}
            href={link.href}
            data-fallback={link.fallback}
            data-reveal
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
            {link.label}
          </a>
        ))}
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
