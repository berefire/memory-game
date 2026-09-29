import StatsBar from "./StatsBar";

const meta = {
  component: StatsBar,
};

export default meta;

export const Solo = {
  args: {
    time: 61,
    moves: 9,
    players: [{ id: 0, score: 0 }],
    activePlayerIndex: 0,
  },
};

export const Multiplayer = {
  args: {
    time: 91,
    moves: 14,
    players: [
      { id: 0, score: 4 },
      { id: 1, score: 5 },
      { id: 2, score: 2 },
      { id: 3, score: 0 },
    ],
    activePlayerIndex: 1,
  },
};