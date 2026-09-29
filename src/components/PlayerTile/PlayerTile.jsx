function PlayerTile({ player, isActive }) {
  return (
    <div className="relative flex-1 min-w-0">
      {isActive && (
        <div
          className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-orange-400"
          aria-hidden="true"
        />
      )}
      <div
        className={`flex flex-col items-center rounded-lg px-3.25 py-2.5 ${
          isActive ? "bg-orange-400 text-grey-50" : "bg-blue-100 text-blue-800"
        }`}
      >
        <span className="font-body text-[0.9375rem] md:text-lg font-bold leading-tight">
          <span
            className={`md:hidden ${
              isActive ? " text-grey-50" : " text-blue-400"
            }`}
          >
            P{player.id + 1}
          </span>
          <span
            className={`hidden md:inline ${
              isActive ? " text-grey-50" : " text-blue-400"
            }`}
          >
            Player {player.id + 1}
          </span>
        </span>
        <output
          aria-live="polite"
          className="font-body text-[1.5rem] md:text-[2rem] font-bold leading-tight"
        >
          {player.score}
        </output>
      </div>
    </div>
  );
}

export default PlayerTile;
