import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalWindow from "../modalWindow/modalWindow";

// ModalWindow imports a CSS file — mock it so jsdom doesn't choke
vi.mock("../../css/modalWindow.css", () => ({}));

describe("ModalWindow", () => {
  it("renders nothing when isOpen=false", () => {
    const { container } = render(
      <ModalWindow isOpen={false} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders children and title when isOpen=true", () => {
    render(
      <ModalWindow isOpen={true} onClose={vi.fn()} title="Hello Modal">
        <p>Modal body</p>
      </ModalWindow>
    );
    expect(screen.getByText("Hello Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal body")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    render(
      <ModalWindow isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    await userEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key pressed", async () => {
    const onClose = vi.fn();
    render(
      <ModalWindow isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay clicked", () => {
    const onClose = vi.fn();
    render(
      <ModalWindow isOpen={true} onClose={onClose} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    const overlay = document.querySelector(".modal-overlay");
    fireEvent.click(overlay, { target: overlay });
    expect(onClose).toHaveBeenCalled();
  });

  it("locks body scroll when open and restores on close", () => {
    const { rerender } = render(
      <ModalWindow isOpen={true} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <ModalWindow isOpen={false} onClose={vi.fn()} title="Test">
        <p>Content</p>
      </ModalWindow>
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
