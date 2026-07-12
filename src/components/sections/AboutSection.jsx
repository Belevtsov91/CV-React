import { useState } from "react";
import { about } from "../../data/aboutData";
import SectionHeading from "../shared/SectionHeading";
import AboutModal from "../modalWindow/aboutModal";

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="about" id="about">
      <SectionHeading title="About Me" titleClassName="about-title" />

      <div className="about-content" data-reveal>
        <p className="about-short-text">{about.shortText}</p>
        <button
          type="button"
          className="about-read-more"
          onClick={() => setIsModalOpen(true)}
        >
          Read more
        </button>
      </div>

      <AboutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
