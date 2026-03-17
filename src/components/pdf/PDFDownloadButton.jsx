import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "./CVDocument";

export default function PDFDownloadButton() {
  return (
    <PDFDownloadLink
      document={<CVDocument />}
      fileName="Vitalii_Belevtsov_CV.pdf"
      className="pdf-download-btn"
      aria-label="Download CV as PDF"
    >
      {({ loading }) => (
        <>
          <svg
            className="pdf-download-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 9.5L3.5 6H5.833V1.167h2.334V6H10.5L7 9.5ZM2.333 12.833v-2.333h1.167v1.167H10.5v-1.167h1.167v2.333H2.333Z"
              fill="currentColor"
            />
          </svg>
          {loading ? "Generating..." : "Download CV (PDF)"}
        </>
      )}
    </PDFDownloadLink>
  );
}
