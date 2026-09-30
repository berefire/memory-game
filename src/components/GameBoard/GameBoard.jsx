import { useRef, useState } from "react";
import Card from "@/components/Card/Card";

function GameBoard({ cards, gridSize, theme, dispatch, lastMatchedIds = [] }) {
  const [focusedId, setFocusedId] = useState(0);
  const buttonRefs = useRef([]);

  const gridColsClass =
    gridSize === 6
      ? "gap-2 md:gap-4 grid-cols-[repeat(6,minmax(0,3rem))] md:grid-cols-[repeat(6,5.125rem)]"
      : "gap-3 md:gap-6 grid-cols-[repeat(4,minmax(0,4.5rem))] md:grid-cols-[repeat(4,7.375rem)]";

  const moveFocus = (nextId) => {
    if (nextId < 0 || nextId >= cards.length) return;
    setFocusedId(nextId);
    buttonRefs.current[nextId]?.focus();
  };

  const handleKeyDown = (id) => (e) => {
    const row = Math.floor(id / gridSize);
    const col = id % gridSize;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        if (col < gridSize - 1) moveFocus(id + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (col > 0) moveFocus(id - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (row < gridSize - 1) moveFocus(id + gridSize);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (row > 0) moveFocus(id - gridSize);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <p id="board-instructions" className="sr-only">
        Flip two cards to find a matching pair. Matched pairs stay face up;
        unmatched pairs flip back over. Use the arrow keys to move between
        cards.
      </p>
      <ul
        role="list"
        aria-label={`Memory game board, ${gridSize} by ${gridSize} grid`}
        aria-describedby="board-instructions"
        className={`grid w-full md:w-auto ${gridColsClass}`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            ref={(el) => (buttonRefs.current[card.id] = el)}
            card={card}
            dispatch={dispatch}
            theme={theme}
            lastMatchedIds={lastMatchedIds}
            tabIndex={card.id === focusedId ? 0 : -1}
            onKeyDown={handleKeyDown(card.id)}
            onFocus={() => setFocusedId(card.id)}
          />
        ))}
      </ul>
    </>
  );
}

export default GameBoard;
