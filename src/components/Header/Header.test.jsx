import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { ACTIONS } from "@/reducer/actions";
import Header from "./Header";

vi.mock("@/components/GameMenu/GameMenu", () => ({
  default: (props) => (
    <div data-testid="game-menu-mock" data-is-open={String(props.isOpen)} />
  ),
}));

describe("Header", () => {
  it("dispatches RESTART when the desktop Restart button is clicked", async () => {
    const dispatch = vi.fn();
    render(<Header dispatch={dispatch} />);

    await userEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(dispatch).toHaveBeenCalledWith({ type: ACTIONS.RESTART });
  });

  it("dispatches RETURN_TO_SETUP when the desktop New Game button is clicked", async () => {
    const dispatch = vi.fn();
    render(<Header dispatch={dispatch} />);

    await userEvent.click(screen.getByRole("button", { name: "New Game" }));
    expect(dispatch).toHaveBeenCalledWith({ type: ACTIONS.RETURN_TO_SETUP });
  });

  it("opens the GameMenu when the mobile Menu button is clicked", async () => {
    const dispatch = vi.fn();
    render(<Header dispatch={dispatch} />);

    expect(screen.getByTestId("game-menu-mock")).toHaveAttribute("data-is-open", "false");

    await userEvent.click(screen.getByRole("button", { name: "Open game menu" }));

    expect(screen.getByTestId("game-menu-mock")).toHaveAttribute("data-is-open", "true");
  });
});