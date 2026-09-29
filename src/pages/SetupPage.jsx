import GameSetup from "@/components/GameSetup/GameSetup";
import Attribution from "@/components/Attribution/Attribution";

function SetupPage({ dispatch }) {
  return (
    <div className="min-h-dvh flex flex-col bg-blue-800">
        <GameSetup dispatch={dispatch} />
        <Attribution />
    </div>
  );
}

export default SetupPage;
