import { expect, fn } from "storybook/test";
import { ACTIONS } from "@/reducer/actions";
import GameSetup from "./GameSetup";

export default {
  title: "Components/GameSetup",
  component: GameSetup,
  args: { dispatch: fn() },
};

export const DefaultSelections = {
  play: async ({ canvas }) => {
    expect(canvas.getByRole("radio", { name: "Numbers" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "1" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "4x4" })).toBeChecked();
  },
};

export const SubmitWithDefaults = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /start game/i }));
    expect(args.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.START_GAME,
      payload: { theme: "numbers", playerCount: 1, gridSize: 4 },
    });
  },
};

export const ChangeSelectionsAndSubmit = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Icons" }));
    await userEvent.click(canvas.getByRole("radio", { name: "3" }));
    await userEvent.click(canvas.getByRole("radio", { name: "6x6" }));

    expect(canvas.getByRole("radio", { name: "Icons" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "3" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "6x6" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "Numbers" })).not.toBeChecked();

    await userEvent.click(canvas.getByRole("button", { name: /start game/i }));
    expect(args.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.START_GAME,
      payload: { theme: "icons", playerCount: 3, gridSize: 6 },
    });
  },
};