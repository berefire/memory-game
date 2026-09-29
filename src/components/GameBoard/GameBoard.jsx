import Card from "@/components/Card/Card";

function GameBoard({ cards, gridSize, theme, dispatch, lastMatchedIds = [] }) {
  const gridColsClass =
    gridSize === 6
      ? "gap-2 md:gap-4 grid-cols-[repeat(6,minmax(0,3rem))] md:grid-cols-[repeat(6,5.125rem)]"
      : "gap-3 md:gap-6 grid-cols-[repeat(4,minmax(0,4.5rem))] md:grid-cols-[repeat(4,7.375rem)]";

  return (
    <>
      <p id="game-instructions" className="sr-only">
        Flip two cards to find a matching pair. Matched pairs stay face up;
        unmatched pairs flip back over.
      </p>
      <ul
        role="list"
        aria-label={`Memory game board, ${gridSize} by ${gridSize} grid`}
        aria-describedby="game-instructions"
        className={`grid w-full md:w-auto ${gridColsClass}`}
      >
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            dispatch={dispatch}
            theme={theme}
            lastMatchedIds={lastMatchedIds}
          />
        ))}
      </ul>
    </>
  );
}

export default GameBoard;
