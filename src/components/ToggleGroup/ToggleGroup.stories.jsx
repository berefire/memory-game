import { useState } from "react";
import ToggleGroup from "./ToggleGroup";

export default {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
};

function ToggleGroupWithState(args) {
  const [value, setValue] = useState(args.value);
  return <ToggleGroup {...args} value={value} onChange={setValue} />;
}

export const Theme = {
  render: (args) => <ToggleGroupWithState {...args} />,
  args: {
    name: "theme",
    label: "Select Theme",
    options: [
      { label: "Numbers", value: "numbers" },
      { label: "Icons", value: "icons" },
    ],
    value: "numbers",
  },
};

export const Players = {
  render: (args) => <ToggleGroupWithState {...args} />,
  args: {
    name: "players",
    label: "Number of Players",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
    value: 1,
  },
};

export const GridSize = {
  render: (args) => <ToggleGroupWithState {...args} />,
  args: {
    name: "gridSize",
    label: "Grid Size",
    options: [
      { label: "4x4", value: 4 },
      { label: "6x6", value: 6 },
    ],
    value: 4,
  },
};