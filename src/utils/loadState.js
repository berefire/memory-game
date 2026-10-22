export const STORAGE_KEY = "memory-game-state";

export function isValidGameState(data) {
  return (
    data &&
    typeof data === "object" &&
    typeof data.status === "string" &&
    data.settings &&
    typeof data.settings.theme === "string" &&
    typeof data.settings.gridSize === "number" &&
    typeof data.settings.playerCount === "number" &&
    Array.isArray(data.cards) &&
    Array.isArray(data.players) &&
    Array.isArray(data.flippedCardIds) &&
    Array.isArray(data.lastMatchedIds)
  );
}

export function loadState(initialArg) {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return initialArg;
    const parsed = JSON.parse(saved);
    return isValidGameState(parsed) ? parsed : initialArg;
  } catch {
    return initialArg;
  }
}