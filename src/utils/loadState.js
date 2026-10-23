export const STORAGE_KEY = "memory-game-state";

function isValidCard(card) {
  return (
    card &&
    typeof card === "object" &&
    typeof card.id === "number" &&
    (typeof card.value === "string" || typeof card.value === "number") &&
    typeof card.isFlipped === "boolean" &&
    typeof card.isMatched === "boolean"
  );
}

function isValidPlayer(player) {
  return (
    player &&
    typeof player === "object" &&
    typeof player.id === "number" &&
    typeof player.score === "number"
  );
}

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
    data.cards.length === data.settings.gridSize * data.settings.gridSize &&
    data.cards.every(isValidCard) &&
    Array.isArray(data.players) &&
    data.players.length === data.settings.playerCount &&
    data.players.every(isValidPlayer) &&
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