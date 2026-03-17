import {
  backendSkills,
  designSkills,
  frontendSkills,
} from "../../data/skillsData";
import SectionHeading from "../shared/SectionHeading";

export default function SkillsSection({ skillsOpen, toggleSkills }) {
  return (
    <section className="skills">
      <SectionHeading title="Skills" titleClassName="skills-title" />

      <div className="set-skills">
        <div className="design-front-set" data-reveal>
          <div className="design-cont">
            <svg className="design-svg" aria-hidden="true" />
            <button
              className="set-skills-title set-skills-toggle"
              type="button"
              aria-expanded={skillsOpen}
              aria-controls="skills-design-list"
              onClick={toggleSkills}
            >
              Design
            </button>
          </div>

          <ul
            className={`design-list ${skillsOpen ? "" : "is-collapsed"}`}
            id="skills-design-list"
          >
            {designSkills.map((skill) => (
              <li className="design-item" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="development-set" data-reveal>
          <div className="development-cont">
            <svg className="development-svg" aria-hidden="true" />
            <button
              className="set-skills-title set-skills-toggle"
              type="button"
              aria-expanded={skillsOpen}
              aria-controls="skills-development-grid"
              onClick={toggleSkills}
            >
              Development
            </button>
          </div>

          <div
            className={`development-grid ${skillsOpen ? "" : "is-collapsed"}`}
            id="skills-development-grid"
          >
            <div className="development-column">
              <h4 className="development-subtitle">Frontend</h4>
              <ul className="development-main">
                {frontendSkills.map((skill) => (
                  <li className="development-main-item" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="development-column">
              <h4 className="development-subtitle">Backend</h4>
              <ul className="development-tools">
                {backendSkills.map((skill) => (
                  <li className="development-tools-item" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
