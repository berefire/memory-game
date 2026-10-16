import { expect, fn } from "storybook/test";
import ResultsModal from "./ResultsModal";

export default {
  title: "Components/ResultsModal",
  component: ResultsModal,
  args: { dispatch: fn(), time: 65, moves: 12 },
};

export const EscapeDoesNotCloseModal = {
  args: { isOpen: true, players: [{ id: 0, score: 5 }] },
  play: async ({ canvasElement, userEvent }) => {
    const dialog = canvasElement.querySelector("dialog");
    expect(dialog.open).toBe(true);

    await userEvent.keyboard("{Escape}");

    expect(dialog.open).toBe(true);
  },
};