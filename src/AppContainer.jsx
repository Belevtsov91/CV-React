import { useEffect, useRef, useState } from "react";
import "./App.css";
import SidebarSection from "./components/sections/SidebarSection";
import MainContent from "./components/MainContent";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useWakeServer } from "./hooks/useWakeServer";
import ServerLoader from "./components/ServerLoader";

const STORAGE_KEY = "skillsAccordionOpen";

function getInitialSkillsOpen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function AppContainer() {
  const projectsListRef = useRef(null);
  const [skillsOpen, setSkillsOpen] = useState(getInitialSkillsOpen);

  useScrollReveal();
  const { serverReady, serverError } = useWakeServer();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(skillsOpen));
    } catch { /* storage unavailable */ }
  }, [skillsOpen]);

  const toggleSkills = () => setSkillsOpen((prev) => !prev);
  const closeSkills = () => setSkillsOpen(false);

  return (
    <>
      <ServerLoader ready={serverReady || serverError} />
      <div className="layout">
        <SidebarSection />
        <MainContent
          projectsListRef={projectsListRef}
          skillsOpen={skillsOpen}
          toggleSkills={toggleSkills}
          closeSkills={closeSkills}
        />
      </div>
    </>
  );
}
