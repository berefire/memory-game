import { expect, fn } from "storybook/test";
import GameBoard from "./GameBoard";

export default {
  title: "Components/GameBoard",
  component: GameBoard,
  args: {
    dispatch: fn(),
    lastMatchedIds: [],
  },
};

const makeCards = (count) =>
  Array.from({ length: count }, (_, id) => ({
    id,
    value: id,
    isFlipped: false,
    isMatched: false,
  }));

export const FourByFour = {
  args: {
    cards: makeCards(16),
    gridSize: 4,
    theme: "numbers",
  },
};

export const ArrowKeyNavigation = {
  args: {
    cards: makeCards(16),
    gridSize: 4,
    theme: "numbers",
  },
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: "Card 1, hidden" });
    const second = canvas.getByRole("button", { name: "Card 2, hidden" });

    // Only one card should be in the natural tab order at a time
    expect(first).toHaveAttribute("tabindex", "0");
    expect(second).toHaveAttribute("tabindex", "-1");

    first.focus();
    expect(first).toHaveFocus();

    // Move right across the first row: 1 -> 2 -> 3 -> 4
    await userEvent.keyboard("{ArrowRight}");
    expect(canvas.getByRole("button", { name: "Card 2, hidden" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(canvas.getByRole("button", { name: "Card 4, hidden" })).toHaveFocus();

    // At the end of the row — ArrowRight must not move past it
    await userEvent.keyboard("{ArrowRight}");
    expect(canvas.getByRole("button", { name: "Card 4, hidden" })).toHaveFocus();

    // Move down a row: card 4 (row 0, col 3) -> card 8 (row 1, col 3)
    await userEvent.keyboard("{ArrowDown}");
    expect(canvas.getByRole("button", { name: "Card 8, hidden" })).toHaveFocus();

    // Move back left three columns, then up a row
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
    expect(canvas.getByRole("button", { name: "Card 5, hidden" })).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(canvas.getByRole("button", { name: "Card 1, hidden" })).toHaveFocus();

    // At the top-left corner — ArrowUp must not move further
    await userEvent.keyboard("{ArrowUp}");
    expect(canvas.getByRole("button", { name: "Card 1, hidden" })).toHaveFocus();
  },
};