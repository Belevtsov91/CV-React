import { useEffect, useMemo, useState } from "react";
import { projects } from "../../data/projects";
import LatestProjectsModal from "../modalWindow/latestProjectsModal";
import LinkIcon from "../shared/LinkIcon";
import SectionHeading from "../shared/SectionHeading";

const DESCRIPTION_PREVIEW_LENGTH = 110;

const supportsFancyHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProjectsSection() {
  const [expandedDescriptionTitle, setExpandedDescriptionTitle] =
    useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null);
  const [fancyHover] = useState(supportsFancyHover);

  const reversedProjects = useMemo(() => [...projects].reverse(), []);

  useEffect(() => {
    const onDocumentClick = (event) => {
      const clickedToggle = event.target.closest(".project-desc-toggle");
      const clickedDescription = event.target.closest(".project-description");

      if (clickedToggle || clickedDescription) {
        return;
      }

      setExpandedDescriptionTitle(null);
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  const toggleDescription = (projectTitle) => {
    setExpandedDescriptionTitle((prev) =>
      prev === projectTitle ? null : projectTitle,
    );
  };

  const openProjectModal = (projectTitle) => {
    setSelectedProjectTitle(projectTitle);
  };

  const closeProjectModal = () => {
    setSelectedProjectTitle(null);
  };

  const handleCardMove = (event) => {
    if (!fancyHover) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--ry", `${(x / rect.width - 0.5) * 5}deg`);
    card.style.setProperty("--rx", `${(0.5 - y / rect.height) * 5}deg`);
  };

  const handleCardLeave = (event) => {
    if (!fancyHover) return;
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="latest-projects" id="projects">
      <SectionHeading title="Latest Projects" titleClassName="lt-pr-title" />

      <ul className="projects-list">
        {reversedProjects.map((project, index) => {
          const isExpanded = expandedDescriptionTitle === project.title;
          const isLongDescription =
            project.description.length > DESCRIPTION_PREVIEW_LENGTH;
          const shortDescription = `${project.description
            .slice(0, DESCRIPTION_PREVIEW_LENGTH)
            .trimEnd()}`;

          return (
            <li
              className={`projects-item ${index === 0 ? "projects-item--featured" : ""}`}
              key={project.title}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index * 50, 350)}ms` }}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <button
                type="button"
                className="project-frame-btn"
                onClick={() => openProjectModal(project.title)}
                aria-haspopup="dialog"
                aria-label={`Open details for ${project.title}`}
              >
                <img
                  className="project-frame"
                  src={project.image}
                  alt={project.alt}
                  width="400"
                  height="300"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <div className="project-body">
                <h3 className="project-name">{project.title}</h3>
                <p
                  className={`project-description ${isExpanded ? "is-expanded" : ""}`}
                >
                  {isExpanded || !isLongDescription
                    ? project.description
                    : shortDescription}
                  {isLongDescription && (
                    <button
                      type="button"
                      className="project-desc-toggle"
                      aria-expanded={isExpanded}
                      onClick={() => toggleDescription(project.title)}
                    >
                      {isExpanded ? " less" : "..."}
                    </button>
                  )}
                </p>
                <div className="project-links">
                  <a
                    className="project-link project-link--live"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo
                  </a>
                  <a
                    className="project-link project-link--code"
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="project-svg-cont">
                      <LinkIcon />
                    </span>
                    Code
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <LatestProjectsModal
        selectedProjectTitle={selectedProjectTitle}
        onClose={closeProjectModal}
      />
    </section>
  );
}
