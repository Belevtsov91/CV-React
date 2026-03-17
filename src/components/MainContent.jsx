import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";

export default function MainContent({
  projectsListRef,
  skillsOpen,
  toggleSkills,
  closeSkills,
}) {
  return (
    <main className="main-content">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection listRef={projectsListRef} />
      <EducationSection />
      <SkillsSection
        skillsOpen={skillsOpen}
        toggleSkills={toggleSkills}
        closeSkills={closeSkills}
      />
      <ContactSection />
    </main>
  );
}
