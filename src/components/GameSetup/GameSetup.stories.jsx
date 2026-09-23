import { fn } from "storybook/test";
import GameSetup from "./GameSetup";

export default {
  title: "Components/GameSetup",
  component: GameSetup,
  decorators: [(Story) => <main className="p-6 bg-blue-800"><Story /></main>],
  
};

export const Default = {
  args: {
    dispatch: fn(),
  },
};