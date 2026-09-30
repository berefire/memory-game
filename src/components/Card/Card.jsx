import { forwardRef } from "react";
import { ACTIONS } from "@/reducer/actions";
import { ICON_MAP } from "@/data/cardData";
import { getReadableValue } from "@/utils/getReadableValue";

const Card = forwardRef(function Card(
  { card, dispatch, theme, lastMatchedIds = [], tabIndex = -1, onKeyDown, onFocus },
  ref,
) {
  const isRevealed = card.isFlipped || card.isMatched;
  const isJustMatched = lastMatchedIds.includes(card.id);
  const position = card.id + 1;
  const readableValue = getReadableValue(card.value, theme);

  const handleClick = () => {
    dispatch({ type: ACTIONS.FLIP_CARD, payload: { cardId: card.id } });
  };

  const IconComponent = theme === "icons" ? ICON_MAP[card.value] : null;

  return (
    <li className="list-none grid place-items-center">
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        tabIndex={tabIndex}
        aria-disabled={isRevealed}
        aria-label={
          isRevealed
            ? `Card ${position}, showing ${readableValue}`
            : `Card ${position}, hidden`
        }
        className="aspect-square w-full rounded-full perspective-[62.5rem] font-body text-[2.5rem] md:text-[3.5rem] focus-visible:focus-ring focus-visible:focus-ring-blue-800"
      >
        <div
          className={`relative h-full w-full transition-transform duration-300 transform-3d ${
            isRevealed ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-blue-800 hover:bg-blue-950 backface-hidden" />
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-full leading-tight font-bold text-grey-50 backface-hidden rotate-y-180 ${isJustMatched ? "bg-orange-400 hover:bg-orange-300" : "bg-blue-300 hover:bg-blue-400"}`}
          >
            {IconComponent ? <IconComponent aria-hidden="true" /> : card.value}
          </div>
        </div>
      </button>
    </li>
  );
});

export default Card;