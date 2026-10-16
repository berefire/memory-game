import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatTile from "./StatTile";

describe("StatTile", () => {
  it("renders the label and value", () => {
    render(<StatTile label="Time" value="01:05" />);
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("defaults to aria-live off when announceChanges is not set", () => {
    render(<StatTile label="Time" value="01:05" />);
    expect(screen.getByText("01:05")).toHaveAttribute("aria-live", "off");
  });

  it("sets aria-live to polite when announceChanges is true", () => {
    render(<StatTile label="Moves" value={10} announceChanges />);
    expect(screen.getByText("10")).toHaveAttribute("aria-live", "polite");
  });

  it("sets aria-live to off when announceChanges is explicitly false", () => {
    render(<StatTile label="Moves" value={10} announceChanges={false} />);
    expect(screen.getByText("10")).toHaveAttribute("aria-live", "off");
  });
});