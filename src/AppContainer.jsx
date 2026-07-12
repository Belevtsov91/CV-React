import "./App.css";
import HeroSection from "./components/sections/HeroSection";
import SidebarSection from "./components/sections/SidebarSection";
import MainContent from "./components/MainContent";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useWakeServer } from "./hooks/useWakeServer";
import ServerLoader from "./components/ServerLoader";

export default function AppContainer() {
  useScrollReveal();
  const { serverReady, serverError } = useWakeServer();

  return (
    <>
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />
      <ServerLoader ready={serverReady || serverError} />
      <HeroSection />
      <div className="layout" id="profile">
        <SidebarSection />
        <MainContent />
      </div>
    </>
  );
}
