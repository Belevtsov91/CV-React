import { useMemo } from "react";
import { educationItems } from "../../data/educationData";
import ModalWindow from "./modalWindow";

export default function EducationsModal({ selectedEducationId, onClose }) {
  const selectedEducation = useMemo(
    () =>
      educationItems.find((item) => item.id === selectedEducationId) || null,
    [selectedEducationId],
  );

  return (
    <ModalWindow
      isOpen={Boolean(selectedEducation)}
      onClose={onClose}
      className="experience-modal education-modal"
    >
      {selectedEducation && (
        <div className="experience-modal-content">
          <div className="experience-modal-image-wrap">
            <img
              src={selectedEducation.logo}
              className={`experience-modal-image ${selectedEducation.logoClassName}`}
              alt={selectedEducation.logoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="experience-modal-title">{selectedEducation.school}</h3>
          <p className="experience-modal-meta">
            <span>{selectedEducation.degree}</span>
            <span>{selectedEducation.years}</span>
          </p>
          <p className="experience-modal-description" style={{ whiteSpace: "pre-line" }}>
            {selectedEducation.descriptionModal || selectedEducation.degree}
          </p>
          {selectedEducation.certificateFile && (
            <div className="experience-modal-certificate">
              <h4 className="experience-modal-certificate-title">Certificate</h4>
              {selectedEducation.certificatePreview ? (
                <a
                  className="certificate-preview-link"
                  href={selectedEducation.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${selectedEducation.school} certificate PDF`}
                >
                  <img
                    className="certificate-preview-img"
                    src={selectedEducation.certificatePreview}
                    alt={`${selectedEducation.school} certificate preview`}
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
                  href={selectedEducation.certificateFile}
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
