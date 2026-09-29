import { useState } from "react";
import { fn } from "storybook/test";
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
    if (action.type === "FLIP_CARD") {
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
};

export const FlippedNumber = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 2, value: 7, isFlipped: true, isMatched: false },
    theme: "numbers",
    dispatch: fn(),
    lastMatchedIds: [],
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
};

export const JustMatched = {
  render: (args) => <CardWithState {...args} />,
  args: {
    card: { id: 4, value: "icon-hand-spock", isFlipped: true, isMatched: true },
    theme: "icons",
    dispatch: fn(),
    lastMatchedIds: [4],
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
};