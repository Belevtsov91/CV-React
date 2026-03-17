import { about } from "../../data/aboutData";
import ModalWindow from "./modalWindow";

export default function AboutModal({ isOpen, onClose }) {
  const { modalDescription } = about;

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} className="about-modal">
      <div className="about-modal-content">
        <h3 className="about-modal-title">About Me</h3>
        {modalDescription.intro && (
          <p className="about-modal-intro">{modalDescription.intro}</p>
        )}
        <ul className="about-modal-list">
          {modalDescription.items.map((item, i) => (
            <li key={i} className="about-modal-list-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </ModalWindow>
  );
}
