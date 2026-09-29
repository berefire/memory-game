import StatTile from "@/components/StatTile/StatTile";
import PlayerTile from "@/components/PlayerTile/PlayerTile";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function StatsBar({ time, moves, players, activePlayerIndex }) {
  const isMultiplayer = players.length > 1;

  return (
    <div
      className="flex self-stretch items-center justify-between gap-3"
      role="group"
      aria-label={isMultiplayer ? "Player scores" : "Game stats"}
    >
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
          <StatTile label="Moves" value={moves} />
        </>
      )}
    </div>
  );
}

export default StatsBar;
