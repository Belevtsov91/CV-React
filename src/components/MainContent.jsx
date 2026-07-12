import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import CertificatesSection from "./sections/CertificatesSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";

export default function MainContent() {
  return (
    <main className="main-content">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
