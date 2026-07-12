import { useState } from "react";
import EducationsModal from "../modalWindow/educationsModal";
import { educationItems } from "../../data/educationData";
import SectionHeading from "../shared/SectionHeading";

export default function EducationSection() {
  const [selectedEducationId, setSelectedEducationId] = useState(null);

  // An item gets a modal as soon as it has modal content — new entries
  // in educationData.js work automatically, no hardcoded id list.
  const hasModal = (item) => Boolean(item.descriptionModal);

  const openEducationModal = (educationId) => {
    setSelectedEducationId(educationId);
  };

  const closeEducationModal = () => {
    setSelectedEducationId(null);
  };

  return (
    <section className="education">
      <SectionHeading title="Education" titleClassName="edu-title" />

      <ul className="education-list">
        {educationItems.map((item, index) => (
          <li
            className="education-item"
            key={item.id}
            data-education-id={item.id}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index * 70, 280)}ms` }}
          >
            {hasModal(item) ? (
              <button
                type="button"
                className="educ-name educ-name-btn"
                onClick={() => openEducationModal(item.id)}
                aria-haspopup="dialog"
              >
                <img
                  className={item.logoClassName}
                  src={item.logo}
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                  alt={item.logoAlt}
                />
                <span className="education-name">{item.school}</span>
              </button>
            ) : (
              <div className="educ-name">
                <img
                  className={item.logoClassName}
                  src={item.logo}
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                  alt={item.logoAlt}
                />
                <h3 className="education-name">{item.school}</h3>
              </div>
            )}
            <span className="education-degree">{item.degree}</span>
            <span className="education-year">{item.years}</span>
          </li>
        ))}
      </ul>

      <EducationsModal
        selectedEducationId={selectedEducationId}
        onClose={closeEducationModal}
      />
    </section>
  );
}
