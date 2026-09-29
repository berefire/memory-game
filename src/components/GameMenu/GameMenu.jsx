import { ACTIONS } from "@/reducer/actions";
import Button from "@/components/Button/Button";
import { useEffect, useRef } from "react";

function GameMenu({ dispatch, onClose, isOpen }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESTART });
    onClose();
  };

  const handleNewGame = () => {
    dispatch({ type: ACTIONS.RETURN_TO_SETUP });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="hidden open:flex flex-col m-auto rounded-[0.625rem] p-6 w-full max-w-[calc(100%-3rem)] backdrop:bg-black/50 bg-grey-50"
      aria-labelledby="game-menu-title"
    >
      <div
        className="flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >

      <h2 id="game-menu-title" className="sr-only">Game Menu</h2>
        <Button
          onClick={handleRestart}
          size="medium"
          fullWidth
        >
          Restart
        </Button>
        <Button
          onClick={handleNewGame}
          variant="secondary"
          size="medium"
          fullWidth
        >
          New Game
        </Button>
        <Button
          onClick={onClose}
          variant="secondary"
          size="medium"
          fullWidth
        >
          Resume Game
        </Button>
      </div>
    </dialog>
  );
}

export default GameMenu;