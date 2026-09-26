import { fn } from "storybook/test";
import GameBoard from "./GameBoard";
import { createShuffledDeck } from "@/constants/data/cardData";

export default {
  title: "Components/GameBoard",
  component: GameBoard,
};

export const NumbersGrid4x4 = {
  args: {
    cards: createShuffledDeck("numbers", 4),
    gridSize: 4,
    theme: "numbers",
    dispatch: fn(),
  },
};

export const IconsGrid6x6 = {
  args: {
    cards: createShuffledDeck("icons", 6),
    gridSize: 6,
    theme: "icons",
    dispatch: fn(),
  },
};