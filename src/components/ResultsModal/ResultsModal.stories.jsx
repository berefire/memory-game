import { fn } from "storybook/test";
import ResultsModal from "./ResultsModal";

const meta = {
  component: ResultsModal,
  tags: ["autodocs"],
  args: {
    isOpen: true,
    dispatch: fn(),
  },
};

export default meta;

export const Solo = {
  args: {
    players: [{ id: 0, score: 18 }],
    time: 113,
    moves: 39,
  },
};

export const MultiplayerWinner = {
  args: {
    players: [
      { id: 0, score: 4 },
      { id: 1, score: 3 },
      { id: 2, score: 8 },
      { id: 3, score: 1 },
    ],
    time: 0,
    moves: 0,
  },
};

export const MultiplayerTie = {
  args: {
    players: [
      { id: 0, score: 5 },
      { id: 1, score: 5 },
      { id: 2, score: 3 },
      { id: 3, score: 2 },
    ],
    time: 0,
    moves: 0,
  },
};