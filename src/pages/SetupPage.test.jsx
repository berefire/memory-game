import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SetupPage from "./SetupPage";

vi.mock("@/components/GameSetup/GameSetup", () => ({
  default: (props) => (
    <div data-testid="game-setup-mock" data-has-dispatch={String(typeof props.dispatch === "function")} />
  ),
}));

vi.mock("@/components/Attribution/Attribution", () => ({
  default: (props) => <div data-testid="attribution-mock" data-color-link={props.colorLink} />,
}));

describe("SetupPage", () => {
  it("passes dispatch through to GameSetup", () => {
    render(<SetupPage dispatch={vi.fn()} />);
    expect(screen.getByTestId("game-setup-mock")).toHaveAttribute("data-has-dispatch", "true");
  });

  it("renders Attribution with a light link color for its dark background", () => {
    render(<SetupPage dispatch={vi.fn()} />);
    expect(screen.getByTestId("attribution-mock")).toHaveAttribute("data-color-link", "text-blue-100");
  });
});