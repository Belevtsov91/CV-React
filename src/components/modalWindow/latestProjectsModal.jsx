import { useMemo } from "react";
import { projects } from "../../data/projects";
import ModalWindow from "./modalWindow";

export default function LatestProjectsModal({ selectedProjectTitle, onClose }) {
  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.title === selectedProjectTitle) ||
      null,
    [selectedProjectTitle],
  );

  return (
    <ModalWindow
      isOpen={Boolean(selectedProject)}
      onClose={onClose}
      className="project-modal"
    >
      {selectedProject && (
        <div className="project-modal-content">
          <div className="project-modal-image-wrap">
            <img
              className="project-modal-image"
              src={selectedProject.image}
              alt={selectedProject.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="project-modal-title">{selectedProject.title}</h3>
          <p className="project-modal-description">
            {selectedProject.modalDescription?.trim() ||
              selectedProject.description}
          </p>
          <div className="project-modal-links">
            <a
              className="project-modal-link"
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Demo
            </a>
            <a
              className="project-modal-link"
              href={selectedProject.code}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      )}
    </ModalWindow>
  );
}
