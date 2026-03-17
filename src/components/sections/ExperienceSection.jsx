import { useState } from "react";
import { experiences } from "../../data/experienceData";
import ExpirienceModal from "../modalWindow/experienceModal";
import SectionHeading from "../shared/SectionHeading";

export default function ExperienceSection() {
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);

  const openExperienceModal = (experienceId) => {
    setSelectedExperienceId(experienceId);
  };

  const closeExperienceModal = () => {
    setSelectedExperienceId(null);
  };

  return (
    <section className="experience">
      <SectionHeading title="Experience" titleClassName="exp-title" />

      <ul className="exp-list">
        {experiences.map((experience) => (
          <li className="exp-item" key={experience.id} data-reveal>
            <div className="container-exp-item">
              <div className="dot-titel">
                <div className="cont-dot">
                  <svg
                    className="dot"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 5.3125C2.88706 5.3125 2.1875 4.61294 2.1875 3.75C2.1875 2.88706 2.88706 2.1875 3.75 2.1875C4.61294 2.1875 5.3125 2.88706 5.3125 3.75C5.3125 4.61294 4.61294 5.3125 3.75 5.3125Z"
                      fill="#ACB1C3"
                    />
                  </svg>
                </div>
                <h3 className="timing">{experience.period}</h3>
              </div>
              <div className="list-item-exp">
                <img
                  src={experience.logo}
                  className={experience.logoClassName}
                  alt={experience.logoAlt}
                  width={experience.logoWidth}
                  height={experience.logoHeight}
                  loading="lazy"
                  decoding="async"
                />
                <div className="job-name-text">
                  <button
                    type="button"
                    className="job-title-btn"
                    onClick={() => openExperienceModal(experience.id)}
                    aria-haspopup="dialog"
                  >
                    <span className="job-title">{experience.role}</span>
                  </button>
                  <span className="company-name">{experience.company}</span>
                </div>
              </div>
            </div>
            <p className="job-description">{experience.description}</p>
          </li>
        ))}
      </ul>

      <ExpirienceModal
        selectedExperienceId={selectedExperienceId}
        onClose={closeExperienceModal}
      />
    </section>
  );
}
