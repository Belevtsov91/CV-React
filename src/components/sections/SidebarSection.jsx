import { lazy, Suspense, useEffect, useState } from "react";
import LinkIcon from "../shared/LinkIcon";
import { contacts, languages, profile, socials, softSkills } from "../../data/sidebarData";

const PDFDownloadButton = lazy(() => import("../pdf/PDFDownloadButton"));

function ContactIcon({ type }) {
  if (type === "email") {
    return (
      <svg
        className="contacts-svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.33325 8.33335H1.66659C1.20635 8.33335 0.833252 7.96026 0.833252 7.50002V2.46377C0.852672 2.01775 1.22014 1.66627 1.66659 1.66669H8.33325C8.79349 1.66669 9.16659 2.03978 9.16659 2.50002V7.50002C9.16659 7.96026 8.79349 8.33335 8.33325 8.33335ZM1.66659 3.27835V7.50002H8.33325V3.27835L4.99992 5.50002L1.66659 3.27835ZM1.99992 2.50002L4.99992 4.50002L7.99992 2.50002H1.99992Z"
          fill="#E2E6EE"
        />
      </svg>
    );
  }

  if (type === "link") {
    return <LinkIcon className="contacts-svg" />;
  }

  if (type === "location") {
    return (
      <svg
        className="contacts-svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.99992 8.75002C4.47364 8.30112 3.98583 7.80899 3.54159 7.27877C2.87492 6.48252 2.08325 5.29669 2.08325 4.16669C2.08266 2.9865 2.79336 1.92227 3.8837 1.4706C4.97404 1.01894 6.22911 1.26887 7.06325 2.10377C7.61178 2.64986 7.91905 3.39268 7.9166 4.16669C7.9166 5.29669 7.12492 6.48252 6.45825 7.27877C6.01401 7.80899 5.5262 8.30112 4.99992 8.75002ZM4.99992 2.91669C4.55334 2.91669 4.14068 3.15494 3.91739 3.54169C3.6941 3.92844 3.6941 4.40494 3.91739 4.79169C4.14068 5.17844 4.55334 5.41669 4.99992 5.41669C5.69028 5.41669 6.24992 4.85704 6.24992 4.16669C6.24992 3.47633 5.69028 2.91669 4.99992 2.91669Z"
          fill="#D9DFE8"
        />
      </svg>
    );
  }

  return (
    <svg
      className="contacts-svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.9157 8.33335C4.36086 8.33839 1.66295 5.60814 1.66675 2.0844C1.66675 1.85428 1.8533 1.66669 2.08342 1.66669H3.18315C3.38964 1.66669 3.56505 1.81841 3.59537 2.02266C3.66804 2.51219 3.81057 2.98876 4.01862 3.43781L4.06143 3.53023C4.12097 3.65873 4.08061 3.81141 3.96536 3.89372C3.62479 4.13693 3.49463 4.6265 3.75995 5.0085C4.09291 5.48787 4.5126 5.90748 4.99186 6.24028C5.37384 6.50553 5.86333 6.37539 6.10654 6.03487C6.1889 5.91956 6.34167 5.87919 6.47025 5.93875L6.56224 5.98136C7.01133 6.18939 7.48793 6.33193 7.97751 6.40458C8.18177 6.4349 8.33341 6.6103 8.33341 6.8168V7.91668C8.33341 8.1468 8.14641 8.33335 7.91629 8.33334L7.9157 8.33335Z"
        fill="#E2E6EE"
      />
    </svg>
  );
}

export default function SidebarSection() {
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setShowPDF(true);
      return;
    }
    const handler = () => setShowPDF(true);
    window.addEventListener("load", handler, { once: true });
    return () => window.removeEventListener("load", handler);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          src={profile.photo}
          alt="CV Photo"
          className="profile-photo"
          width="64"
          height="64"
          fetchPriority="high"
          decoding="async"
        />
        <h1 className="title">{profile.name}</h1>
        <h2 className="sub-title">{profile.subtitle}</h2>
        <p className="looking">{profile.looking}</p>
      </div>

      <div className="contacts" data-reveal>
        <h3 className="contacts-title">Contacts</h3>
        <ul className="contacts-list">
          {contacts.map((contact) => (
            <li
              className="contacts-item"
              key={`${contact.label}-${contact.text}`}
            >
              <div className="svg-contacts">
                <ContactIcon type={contact.icon} />
              </div>
              <div className="contacts-text">
                <span className="item-info">{contact.label}</span>
                <a
                  className="contacts-link"
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                >
                  {contact.flag && (
                    <img
                      src={contact.flag}
                      alt={contact.flagAlt}
                      width="14"
                      height="10"
                      className="contact-flag"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {contact.text}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="socials" data-reveal>
        <h3 className="socials-title">Socials</h3>
        <ul className="socials-list">
          {socials.map((social) => (
            <li className="socials-item" key={social.href}>
              <div className="svg-socials" style={social.style}>
                <img
                  className="img-socials"
                  src={social.icon}
                  alt={social.iconAlt}
                  width="10"
                  height="10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="socials-text">
                <span className="socials-label">{social.label}</span>
                <a
                  className="socials-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.text}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="soft-skills" data-reveal>
        <h3 className="soft-skills-title">Soft Skills</h3>
        <ul className="soft-skills-list">
          {softSkills.map((skill) => (
            <li key={skill} className="soft-skills-item">
              <div className="soft-skills-dot" />
              <span className="soft-skills-name">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="languages" data-reveal>
        <h3 className="languages-title">Languages</h3>
        <ul className="languages-list">
          {languages.map((language) => (
            <li className="languages-item" key={language.name}>
              <div className="svg-languages">
                <img
                  src={language.icon}
                  alt={language.iconAlt}
                  width="16"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="languages-text">
                <span className="language-name">{language.name}</span>
                <span className="language-level">{language.level}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showPDF ? (
        <Suspense
          fallback={
            <span className="pdf-download-btn pdf-download-btn--loading">
              Loading...
            </span>
          }
        >
          <PDFDownloadButton />
        </Suspense>
      ) : (
        <span className="pdf-download-btn pdf-download-btn--loading" aria-hidden="true" />
      )}
    </aside>
  );
}
