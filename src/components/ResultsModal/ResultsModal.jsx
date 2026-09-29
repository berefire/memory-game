import { useEffect, useRef } from "react";
import { ACTIONS } from "@/reducer/actions";
import Button from "@/components/Button/Button";
import { formatTime } from "@/utils/formatTime";

function ResultsModal({ isOpen, players, time, moves, dispatch }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const preventClose = (e) => e.preventDefault();
    dialog?.addEventListener("cancel", preventClose);
    return () => dialog?.removeEventListener("cancel", preventClose);
  }, []);

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESTART });
  };

  const handleSetupNewGame = () => {
    dispatch({ type: ACTIONS.RETURN_TO_SETUP });
  };

  const isSolo = players.length === 1;
  const maxScore = isSolo ? null : Math.max(...players.map((p) => p.score));
  const winners = isSolo ? [] : players.filter((p) => p.score === maxScore);
  const isTie = winners.length > 1;
  const sortedPlayers = isSolo
    ? players
    : [...players].sort((a, b) => b.score - a.score);

  const title = isSolo
    ? "You did it!"
    : isTie
      ? "It's a tie!"
      : `Player ${winners[0].id + 1} Wins!`;

  const subtitle = isSolo
    ? "Game over! Here's how you got on..."
    : "Game over! Here are the results...";

  return (
    <dialog
      ref={dialogRef}
      className="hidden font-body leading-tight open:flex w-full max-w-[calc(100%-3rem)] md:max-w-[calc(100%-7.125rem)] lg:max-w-[calc(100%-25.65rem)] xl:max-w-[calc(100%-49.125rem)] flex-col gap-6 md:gap-10 rounded-[0.625rem] py-7 md:py-15 px-6 md:px-13.75 m-auto bg-grey-50 backdrop:bg-black/50"
      aria-labelledby="results-title"
    >
      <div className="flex flex-col gap-2 md:gap-4 text-center">
        <h2 id="results-title" className="text-2xl md:text-5xl font-bold text-blue-950">
          {title}
        </h2>
        <p className="font-bold text-sm md:text-[1.125rem] text-blue-400">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        {isSolo ? (
          <>
            <div className="flex items-center justify-between rounded-[0.3125rem] bg-blue-100 px-4 py-2.75">
              <span className="font-bold text-sm md:text-[1.125rem] text-blue-400">Time Elapsed</span>
              <span className="font-bold text-xl md:text-[2rem] text-blue-800">{formatTime(time)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-100 px-4 py-2.75">
              <span className="font-bold text-sm md:text-[1.125rem] text-blue-400">Moves Taken</span>
              <span className="font-bold text-xl md:text-[2rem] text-blue-800">{moves} Moves</span>
            </div>
          </>
        ) : (
          sortedPlayers.map((player) => {
            const isWinner = player.score === maxScore;
            return (
              <div
                key={player.id}
                className={`flex items-center justify-between rounded-[0.3125rem] px-4 py-2.75 ${
                  isWinner ? "bg-blue-800" : "bg-blue-100"
                }`}
              >
                <span className={`font-bold text-sm md:text-[1.125rem] ${isWinner ? "text-grey-50" : "text-blue-400"}`}>
                  Player {player.id + 1}
                  {isWinner ? (isTie ? " (Tied!)" : " (Winner!)") : ""}
                </span>
                <span className={`font-bold text-xl md:text-[2rem] ${isWinner ? "text-grey-50" : "text-blue-800"}`}>{player.score} Pairs</span>
              </div>
            );
          })
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={handleRestart} fullWidth size="medium">
          Restart
        </Button>
        <Button onClick={handleSetupNewGame} variant="secondary" fullWidth size="medium">
          Setup New Game
        </Button>
      </div>
    </dialog>
  );
}

export default ResultsModal;