import PlayerTile from "./PlayerTile";

const meta = {
  component: PlayerTile,
};

export default meta;

export const Inactive = {
  args: {
    player: { id: 0, score: 4 },
    isActive: false,
  },
};

export const Active = {
  args: {
    player: { id: 1, score: 5 },
    isActive: true,
  },
};