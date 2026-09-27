import { fn } from "storybook/test";
import Header from "./Header";

const meta = {
  component: Header,
  args: {
    dispatch: fn(),
  },
};

export default meta;

export const Default = {};