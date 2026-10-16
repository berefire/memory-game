import { expect, fn } from "storybook/test";
import ToggleGroup from "./ToggleGroup";

export default {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  args: {
    name: "theme",
    label: "Select Theme",
    options: [
      { label: "Numbers", value: "numbers" },
      { label: "Icons", value: "icons" },
    ],
    value: "numbers",
    onChange: fn(),
  },
};

export const Default = {
  play: async ({ canvas }) => {
    expect(canvas.getByRole("group", { name: "Select Theme" })).toBeInTheDocument();
    expect(canvas.getByRole("radio", { name: "Numbers" })).toBeChecked();
    expect(canvas.getByRole("radio", { name: "Icons" })).not.toBeChecked();
  },
};

export const ClickingAnOptionCallsOnChange = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Icons" }));
    expect(args.onChange).toHaveBeenCalledWith("icons");
  },
};

export const NumericValues = {
  args: {
    name: "players",
    label: "Number of Players",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
    value: 2,
  },
  play: async ({ args, canvas, userEvent }) => {
    expect(canvas.getByRole("radio", { name: "2" })).toBeChecked();

    await userEvent.click(canvas.getByRole("radio", { name: "4" }));
    expect(args.onChange).toHaveBeenCalledWith(4);
  },
};