import { useState } from "react";
import { ACTIONS } from "@/reducer/actions";
import GameMenu from "@/components/GameMenu/GameMenu";
import Button from "@/components/Button/Button";

function Header({ dispatch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESTART });
  };

  const handleNewGame = () => {
    dispatch({ type: ACTIONS.RETURN_TO_SETUP });
  };

  return (
    <header className="flex items-center justify-between">
      <h1 className="font-body text-2xl md:text-[2.5rem] leading-tight font-bold text-blue-950">memory</h1>

      {/* Desktop: buttons always visible */}
      <div className="hidden gap-2 md:flex">
        <Button
          onClick={handleRestart}
          size="medium"
          className="px-7"
        >
          Restart
        </Button>
        <Button
          onClick={handleNewGame}
          variant="secondary"
          size="medium"
          className="px-7"
        >
          New Game
        </Button>
      </div>

      {/* Mobile: single Menu button opens the modal */}
      <Button
          onClick={() => setIsMenuOpen(true)}
          size="small"
          className="px-4.5 md:hidden"
        >
        Menu
      </Button>

        <GameMenu isOpen={isMenuOpen} dispatch={dispatch} onClose={() => setIsMenuOpen(false)} />
   

    </header>
  );
}

export default Header;