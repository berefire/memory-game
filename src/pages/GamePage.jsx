import Header from "@/components/Header/Header";
import GameBoard from "@/components/GameBoard/GameBoard";
import StatsBar from "@/components/StatsBar/StatsBar";
import ResultsModal from "@/components/ResultsModal/ResultsModal";
import Attribution from "@/components/Attribution/Attribution";

function GamePage({ state, dispatch }) {
  return (
    <div className="min-h-dvh flex flex-col gap-20 md:gap-33.75 pt-6 px-6 md:px-10 md:pt-10">
      <Header dispatch={dispatch} />
      <main className="flex-1 flex flex-col items-center">
        <div className="inline-flex flex-col items-center gap-31.5">
          <GameBoard
            key={state.settings.gridSize}
            cards={state.cards}
            gridSize={state.settings.gridSize}
            theme={state.settings.theme}
            dispatch={dispatch}
            lastMatchedIds={state.lastMatchedIds}
          />
          <StatsBar
            time={state.time}
            moves={state.moves}
            players={state.players}
            activePlayerIndex={state.activePlayerIndex}
          />
        </div>
        <ResultsModal
          isOpen={state.status === "gameOver"}
          players={state.players}
          time={state.time}
          moves={state.moves}
          dispatch={dispatch}
        />
      </main>
      <Attribution colorText="text-blue-950" colorLink="text-blue-800" />
    </div>
  );
}

export default GamePage;
