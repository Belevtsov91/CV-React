import { useMemo } from "react";
import { experiences } from "../../data/experienceData";
import ModalWindow from "./modalWindow";

export default function ExpirienceModal({
  selectedExperienceId,
  onClose,
  imageOverride,
  modalClassName = "experience-modal",
}) {
  const selectedExperience = useMemo(
    () =>
      experiences.find(
        (experience) => experience.id === selectedExperienceId,
      ) || null,
    [selectedExperienceId],
  );

  return (
    <ModalWindow
      isOpen={Boolean(selectedExperience)}
      onClose={onClose}
      className={modalClassName}
    >
      {selectedExperience && (
        <div className="experience-modal-content">
          <div className="experience-modal-image-wrap">
            <img
              src={imageOverride?.src || selectedExperience.logo}
              className={`experience-modal-image ${
                imageOverride?.className ||
                (selectedExperience.logoClassName.includes("freelance-svg")
                  ? "is-freelance"
                  : "")
              }`.trim()}
              alt={imageOverride?.alt || selectedExperience.logoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="experience-modal-title">{selectedExperience.role}</h3>
          <p className="experience-modal-meta">
            <span>{selectedExperience.company}</span>
            <span>{selectedExperience.period}</span>
          </p>
          {(() => {
            const md = selectedExperience.modalDescription || selectedExperience.description;
            if (typeof md === "object" && md.items) {
              return (
                <div className="experience-modal-description">
                  {md.intro && <p className="experience-modal-description-intro">{md.intro}</p>}
                  <ul className="experience-modal-list">
                    {md.items.map((item, i) => (
                      <li key={i} className="experience-modal-list-item">{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return <p className="experience-modal-description">{md}</p>;
          })()}

          {selectedExperience.certificateFile && (
            <div className="experience-modal-certificate">
              <h4 className="experience-modal-certificate-title">
                Certificate
              </h4>
              {selectedExperience.certificatePreview ? (
                <a
                  className="certificate-preview-link"
                  href={selectedExperience.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${selectedExperience.company} certificate PDF`}
                >
                  <img
                    className="certificate-preview-img"
                    src={selectedExperience.certificatePreview}
                    alt={`${selectedExperience.company} certificate preview`}
                    width="575"
                    height="618"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="certificate-preview-hint">Open PDF ↗</span>
                </a>
              ) : (
                <a
                  className="certificate-download-link"
                  href={selectedExperience.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open certificate (PDF) ↗
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </ModalWindow>
  );
}
