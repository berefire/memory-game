import Card from "@/components/Card/Card";

function GameBoard({ cards, gridSize, theme, dispatch, lastMatchedIds = [] }) {
  const gridColsClass =
    gridSize === 6
      ? "gap-2 md:gap-4 grid-cols-[repeat(6,3rem)] md:grid-cols-[repeat(6,5.125rem)]"
      : "gap-3 md:gap-6 grid-cols-[repeat(4,4.5rem)] md:grid-cols-[repeat(4,7.375rem)]";

  return (
    <ul className={`grid ${gridColsClass}`}>
      {cards.map((card) => (
        <Card card={card} key={card.id} dispatch={dispatch} theme={theme} lastMatchedIds={lastMatchedIds} />
      ))}
    </ul>
  );
}

export default GameBoard;
