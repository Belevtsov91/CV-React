import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../ErrorBoundary";

// Component that throws on render
function Boom() {
  throw new Error("Test error");
}

// Suppress console.error noise from intentional throws
beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  console.error.mockRestore();
});

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });

  it("shows fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
  });

  it("reload button calls window.location.reload", async () => {
    const reload = vi.fn();
    vi.stubGlobal("location", { reload });

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    await userEvent.click(screen.getByRole("button", { name: /reload/i }));
    expect(reload).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals();
  });
});
