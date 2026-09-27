import { useState } from "react";
import { fn } from "storybook/test";
import GameMenu from "./GameMenu";
import Button from "@/components/Button/Button";

const meta = {
  component: GameMenu,
  tags: ["autodocs"],
};

export default meta;

function GameMenuWithState() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Button className="px-[1.15625rem]" onClick={() => setIsOpen(true)}>
        Menu
      </Button>
      <GameMenu
        isOpen={isOpen}
        dispatch={fn()}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export const Default = {
  render: () => <GameMenuWithState />,
};