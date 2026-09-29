import StatTile from "@/components/StatTile/StatTile";
import PlayerTile from "@/components/PlayerTile/PlayerTile";
import { formatTime } from "@/utils/formatTime";

function StatsBar({ time, moves, players, activePlayerIndex }) {
  const isMultiplayer = players.length > 1;

  return (
    <div
      className="flex self-stretch items-center justify-between gap-3"
      role="group"
      aria-label={isMultiplayer ? "Player scores" : "Game stats"}
    >
      {isMultiplayer && (
        <p className="sr-only" aria-live="polite">
          Player {activePlayerIndex + 1}'s turn
        </p>
      )}
      {isMultiplayer ? (
        players.map((player, index) => (
          <PlayerTile
            key={player.id}
            player={player}
            isActive={index === activePlayerIndex}
          />
        ))
      ) : (
        <>
          <StatTile label="Time" value={formatTime(time)} />
          <StatTile label="Moves" value={moves} announceChanges />
        </>
      )}
    </div>
  );
}

export default StatsBar;
