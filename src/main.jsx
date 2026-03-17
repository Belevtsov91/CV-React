import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./AppContainer";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Toaster
        position="top-center"
        duration={4000}
        toastOptions={{
          style: {
            background: "rgba(46, 46, 72, 0.98)",
            border: "1px solid rgba(121, 129, 154, 0.32)",
            borderRadius: "12px",
            color: "#e2e6ee",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "13px",
            boxShadow: "0 8px 32px rgba(23, 15, 46, 0.45)",
          },
          classNames: {
            success: "toast-success",
            error: "toast-error",
          },
        }}
      />
    </ErrorBoundary>
  </StrictMode>,
);
