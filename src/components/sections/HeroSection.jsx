import { lazy, Suspense, useEffect, useState } from "react";
import { hero } from "../../data/heroData";
import { profile } from "../../data/sidebarData";
import { projects } from "../../data/projects";

const PDFDownloadButton = lazy(() => import("../pdf/PDFDownloadButton"));

const latestProject = projects[projects.length - 1];
const latestProjectShortTitle = latestProject.title.split("—")[0].trim();

export default function HeroSection() {
  // Defer the heavy @react-pdf chunk until the page has fully loaded,
  // so the hero CTA never competes with LCP (same trick as the old sidebar button).
  const [showPDF, setShowPDF] = useState(
    () => document.readyState === "complete",
  );

  useEffect(() => {
    if (showPDF) return undefined;
    const handler = () => setShowPDF(true);
    window.addEventListener("load", handler, { once: true });
    return () => window.removeEventListener("load", handler);
  }, [showPDF]);

  return (
    <section className="hero" aria-label="Intro">
      <div className="hero-layout">
        <div className="hero-main">
          <p className="hero-badge hero-anim" style={{ "--i": 0 }}>
            <span className="hero-badge-dot" aria-hidden="true" />
            {hero.badge}
          </p>

          <h1 className="hero-name hero-anim" style={{ "--i": 1 }}>
            {profile.name}
          </h1>

          <p className="hero-role hero-anim" style={{ "--i": 2 }}>
            {profile.subtitle}
          </p>

          <p className="hero-subtitle hero-anim" style={{ "--i": 3 }}>
            {hero.subtitle}
          </p>

          <div className="hero-actions hero-anim" style={{ "--i": 4 }}>
            {showPDF ? (
              <Suspense
                fallback={
                  <span className="hero-cta hero-cta--primary hero-cta--loading">
                    Download CV (PDF)
                  </span>
                }
              >
                <PDFDownloadButton className="hero-cta hero-cta--primary" />
              </Suspense>
            ) : (
              <span
                className="hero-cta hero-cta--primary hero-cta--loading"
                aria-hidden="true"
              >
                Download CV (PDF)
              </span>
            )}
            <a
              className="hero-cta hero-cta--secondary"
              href={hero.ctaSecondary.href}
            >
              {hero.ctaSecondary.label}
            </a>
            <a
              className="hero-cta hero-cta--ghost"
              href={hero.ctaTertiary.href}
            >
              {hero.ctaTertiary.label}
            </a>
          </div>
        </div>

        <div className="hero-visual hero-anim" style={{ "--i": 2 }}>
          <div className="hero-photo-ring">
            <img
              className="hero-photo"
              src={profile.photo}
              alt={profile.name}
              width="160"
              height="160"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <a className="hero-latest-chip" href="#projects">
            <span className="hero-latest-label">Latest project</span>
            <span className="hero-latest-title">
              {latestProjectShortTitle}
              {latestProject.tech?.[0] ? ` · ${latestProject.tech[0]}` : ""}
            </span>
          </a>
        </div>
      </div>

      <div className="hero-marquee hero-anim" style={{ "--i": 5 }}>
        <ul className="hero-marquee-track">
          {hero.marquee.map((item) => (
            <li className="hero-chip" key={item}>
              {item}
            </li>
          ))}
          {hero.marquee.map((item) => (
            <li className="hero-chip" key={`${item}-dup`} aria-hidden="true">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        className="hero-scroll-hint hero-anim"
        style={{ "--i": 6 }}
        href="#profile"
        aria-label="Scroll to full profile"
      >
        <span className="hero-scroll-chevron" aria-hidden="true" />
      </a>
    </section>
  );
}
