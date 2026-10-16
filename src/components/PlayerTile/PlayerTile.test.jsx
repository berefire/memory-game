import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PlayerTile from "./PlayerTile";

describe("PlayerTile", () => {
  it("renders the player's score", () => {
    render(<PlayerTile player={{ id: 0, score: 12 }} isActive={false} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders both the short and full player labels", () => {
    render(<PlayerTile player={{ id: 1, score: 0 }} isActive={false} />);
    expect(screen.getByText("P2")).toBeInTheDocument();
    expect(screen.getByText("Player 2")).toBeInTheDocument();
  });

  it("marks the score as a live region for screen readers", () => {
    render(<PlayerTile player={{ id: 0, score: 5 }} isActive={false} />);
    expect(screen.getByText("5")).toHaveAttribute("aria-live", "polite");
  });

  it("shows the active-player indicator only when isActive is true", () => {
    const { container, rerender } = render(
      <PlayerTile player={{ id: 0, score: 0 }} isActive={false} />
    );
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();

    rerender(<PlayerTile player={{ id: 0, score: 0 }} isActive={true} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});