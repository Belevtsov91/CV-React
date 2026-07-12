import { useMemo, useState } from "react";
import { certificates } from "../../data/certificatesData";
import ModalWindow from "../modalWindow/modalWindow";
import SectionHeading from "../shared/SectionHeading";

export default function CertificatesSection() {
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);

  const selectedCertificate = useMemo(
    () => certificates.find((cert) => cert.id === selectedCertificateId) || null,
    [selectedCertificateId],
  );

  return (
    <section className="certificates" id="certificates">
      <SectionHeading title="Certificates" titleClassName="certificates-title" />

      <ul className="certificates-list">
        {certificates.map((cert, index) => {
          const cardBody = (
            <>
              <div className="certificate-card-head">
                <img
                  className="certificate-card-logo"
                  src={cert.logo}
                  alt={cert.logoAlt}
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                />
                <span className="certificate-card-action" aria-hidden="true">
                  {cert.preview ? "View ↗" : "Verify ↗"}
                </span>
              </div>
              <h3 className="certificate-card-title">{cert.title}</h3>
              <p className="certificate-card-issuer">
                {cert.issuer} · {cert.issued}
              </p>
              {cert.credentialId && (
                <p className="certificate-card-id">ID: {cert.credentialId}</p>
              )}
            </>
          );

          return (
            <li
              className="certificates-item"
              key={cert.id}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index * 70, 280)}ms` }}
            >
              {cert.preview ? (
                <button
                  type="button"
                  className="certificate-card"
                  onClick={() => setSelectedCertificateId(cert.id)}
                  aria-haspopup="dialog"
                  aria-label={`View certificate: ${cert.title}`}
                >
                  {cardBody}
                </button>
              ) : (
                <a
                  className="certificate-card"
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify certificate: ${cert.title}`}
                >
                  {cardBody}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <ModalWindow
        isOpen={Boolean(selectedCertificate)}
        onClose={() => setSelectedCertificateId(null)}
        className="experience-modal certificate-modal"
        title={selectedCertificate?.title}
      >
        {selectedCertificate && (
          <div className="certificate-modal-content">
            <p className="experience-modal-meta">
              <span>{selectedCertificate.issuer}</span>
              <span>{selectedCertificate.issued}</span>
              {selectedCertificate.credentialId && (
                <span>ID: {selectedCertificate.credentialId}</span>
              )}
            </p>
            <a
              className="certificate-preview-link"
              href={selectedCertificate.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${selectedCertificate.title} in full size`}
            >
              <img
                className="certificate-preview-img"
                src={selectedCertificate.preview}
                alt={`${selectedCertificate.title} certificate preview`}
                width={selectedCertificate.previewWidth}
                height={selectedCertificate.previewHeight}
                loading="lazy"
                decoding="async"
              />
              <span className="certificate-preview-hint">Open full size ↗</span>
            </a>
            {selectedCertificate.description && (
              <p className="certificate-modal-description">
                {selectedCertificate.description}
              </p>
            )}
          </div>
        )}
      </ModalWindow>
    </section>
  );
}
