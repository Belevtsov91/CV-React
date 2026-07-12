import {
  backendSkills,
  designSkills,
  frontendSkills,
} from "../../data/skillsData";
import SectionHeading from "../shared/SectionHeading";

const skillGroups = [
  { title: "Frontend", skills: frontendSkills },
  { title: "Backend & Tools", skills: backendSkills },
  { title: "Design", skills: designSkills },
];

export default function SkillsSection() {
  return (
    <section className="skills">
      <SectionHeading title="Skills" titleClassName="skills-title" />

      <div className="skills-wall">
        {skillGroups.map((group, index) => (
          <div
            className="skills-group"
            key={group.title}
            data-reveal
            style={{ "--reveal-delay": `${Math.min(index * 80, 320)}ms` }}
          >
            <h3 className="skills-group-title">{group.title}</h3>
            <ul className="skills-chips">
              {group.skills.map((skill) => (
                <li className="skill-chip" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
