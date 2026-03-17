import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    targets.forEach((item) => item.classList.add("reveal-on-scroll"));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((item) => {
        item.classList.add("is-visible");
        item.classList.remove("leave-top");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("leave-top");
          } else {
            entry.target.classList.remove("is-visible");
            if (entry.boundingClientRect.top < 0) {
              entry.target.classList.add("leave-top");
            } else {
              entry.target.classList.remove("leave-top");
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targets.forEach((item) => observer.observe(item));
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
