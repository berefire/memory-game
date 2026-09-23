import { ACTIONS } from "@/reducer/actions";
import { ICON_MAP } from "@/constants/data/cardData";

function Card({ card, dispatch, theme }) {
  const isRevealed = card.isFlipped || card.isMatched;

  const handleClick = () => {
    dispatch({
      type: ACTIONS.FLIP_CARD,
      payload: { cardId: card.id },
    });
  };

  const IconComponent = theme === "icons" ? ICON_MAP[card.value] : null;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isRevealed}
      aria-label={isRevealed ? `Card showing ${card.value}` : "Hidden card"}
      className="aspect-square w-18 md:w-29.5 perspective-[62.5rem] font-body"
    >
      <div
        className={`relative h-full w-full transition-transform duration-300 transform-3d ${
          isRevealed ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-blue-800 hover:bg-blue-950 backface-hidden" />

        <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-blue-300 hover:bg-blue-400 text-[2.5rem] md:text-[3.5rem] leading-tight font-bold text-grey-50 backface-hidden rotate-y-180 ${ card.isMatched ? "bg-orange-400 hover:bg-orange-300" : "" }`}>
          {IconComponent ? (
            <IconComponent aria-hidden="true" className="size-8.75 md:size-14" />
          ) : (
            card.value
          )}
        </div>
      </div>
    </button>
  );
}

export default Card;