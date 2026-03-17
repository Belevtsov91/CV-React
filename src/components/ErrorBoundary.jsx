import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "12px",
            fontFamily: "var(--font-family, sans-serif)",
            color: "#e2e6ee",
            background: "#0f0e17",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", margin: 0 }}>Something went wrong</h1>
          <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
            Please refresh the page. If the issue persists, contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "8px",
              padding: "8px 20px",
              background: "#6d28d9",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
