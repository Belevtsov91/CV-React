import { useEffect, useMemo, useState } from "react";
import { projects } from "../../data/projects";
import { useHorizontalDragScroll } from "../../hooks/useHorizontalDragScroll";
import LatestProjectsModal from "../modalWindow/latestProjectsModal";
import LinkIcon from "../shared/LinkIcon";
import SectionHeading from "../shared/SectionHeading";

const DESCRIPTION_PREVIEW_LENGTH = 110;

export default function ProjectsSection({ listRef }) {
  const [expandedDescriptionTitle, setExpandedDescriptionTitle] =
    useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState(null);

  useHorizontalDragScroll(listRef);

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

  return (
    <section className="latest-projects">
      <SectionHeading title="Latest Projects" titleClassName="lt-pr-title" />

      <ul className="projects-list" ref={listRef}>
        {reversedProjects.map((project) => {
          const isExpanded = expandedDescriptionTitle === project.title;
          const isLongDescription =
            project.description.length > DESCRIPTION_PREVIEW_LENGTH;
          const shortDescription = `${project.description
            .slice(0, DESCRIPTION_PREVIEW_LENGTH)
            .trimEnd()}`;

          return (
            <li className="projects-item" key={project.title} data-reveal>
              <button
                type="button"
                className="project-frame-btn"
                onClick={() => openProjectModal(project.title)}
                aria-haspopup="dialog"
              >
                <img
                  className="project-frame"
                  src={project.image}
                  alt={project.alt}
                  width="128"
                  height="96"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <h3 className="project-name">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
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
              <div className="cont-link">
                <div className="project-svg-cont">
                  <LinkIcon />
                </div>
                <a
                  className="project-link"
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project Code
                </a>
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
