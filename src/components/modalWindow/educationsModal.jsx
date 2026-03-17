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
              <iframe
                title={`${selectedEducation.school} certificate`}
                src={`${selectedEducation.certificateFile}#view=FitH`}
                className="experience-modal-certificate-preview"
              />
            </div>
          )}
        </div>
      )}
    </ModalWindow>
  );
}
