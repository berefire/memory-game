import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import Card from "./Card";

export default {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-25">
        <Story />
      </div>
    ),
  ],
};

function CardWithState({ card, dispatch, ...args }) {
  const [cardState, setCardState] = useState(card);

  const handleDispatch = (action) => {
    dispatch(action); // still logs to the Actions panel
    if (action.type === "FLIP_CARD" && !cardState.isFlipped && !cardState.isMatched) {
      setCardState((prev) => ({ ...prev, isFlipped: !prev.isFlipped }));
    }
  };

  return <Card {...args} card={cardState} dispatch={handleDispatch} />;
}

export const Hidden = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 1, value: 7, isFlipped: false, isMatched: false },
    theme: "numbers",
    dispatch: fn(),
    lastMatchedIds: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Card 2, hidden" }));

    expect(args.dispatch).toHaveBeenCalledWith({
      type: "FLIP_CARD",
      payload: { cardId: 1 },
    });
    expect(canvas.getByRole("button", { name: "Card 2, showing 7" })).toBeInTheDocument();
  },
};

export const FlippedNumber = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 2, value: 7, isFlipped: true, isMatched: false },
    theme: "numbers",
    dispatch: fn(),
    lastMatchedIds: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Card 3, showing 7" }));

    expect(args.dispatch).not.toHaveBeenCalled();
    // Already revealed — a real game reducer no-ops this, so it must still show its value
    expect(canvas.getByRole("button", { name: "Card 3, showing 7" })).toBeInTheDocument();
  },
};

export const FlippedIcon = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 3, value: "icon-sun", isFlipped: true, isMatched: false },
    theme: "icons",
    dispatch: fn(),
    lastMatchedIds: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Card 4, showing Sun" }));
    expect(canvas.getByRole("button", { name: "Card 4, showing Sun" })).toBeInTheDocument();
  },
};

export const JustMatched = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 4, value: "icon-hand-spock", isFlipped: true, isMatched: true },
    theme: "icons",
    dispatch: fn(),
    lastMatchedIds: [4],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Card 5, showing Hand Spock" }));
    // A matched card must never un-flip, no matter how many times it's clicked
    expect(canvas.getByRole("button", { name: "Card 5, showing Hand Spock" })).toBeInTheDocument();
  },
};

export const PreviouslyMatched = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 5, value: "icon-hand-spock", isFlipped: true, isMatched: true },
    theme: "icons",
    dispatch: fn(),
    lastMatchedIds: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Card 6, showing Hand Spock" }));
    expect(canvas.getByRole("button", { name: "Card 6, showing Hand Spock" })).toBeInTheDocument();
  },
};