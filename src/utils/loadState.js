export const STORAGE_KEY = "memory-game-state";
const VALID_STATUSES = ["setup", "playing", "gameOver"];
const VALID_THEMES = ["numbers", "icons"];
const VALID_PLAYER_COUNTS = [1, 2, 3, 4];
const VALID_GRID_SIZES = [4, 6];

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

function hasValidCardIdReferences(data) {
  const cardIds = new Set(data.cards.map((card) => card.id));
  return (
    data.flippedCardIds.every((id) => cardIds.has(id)) &&
    data.lastMatchedIds.every((id) => cardIds.has(id))
  );
}

export function isValidGameState(data) {
  return (
    data &&
    typeof data === "object" &&
    VALID_STATUSES.includes(data.status) &&
    data.settings &&
    VALID_THEMES.includes(data.settings.theme) &&
    VALID_GRID_SIZES.includes(data.settings.gridSize) &&
    VALID_PLAYER_COUNTS.includes(data.settings.playerCount) &&
    Array.isArray(data.cards) &&
    data.cards.length === data.settings.gridSize * data.settings.gridSize &&
    data.cards.every(isValidCard) &&
    Array.isArray(data.players) &&
    data.players.length === data.settings.playerCount &&
    data.players.every(isValidPlayer) &&
    Array.isArray(data.flippedCardIds) &&
    Array.isArray(data.lastMatchedIds) &&
    hasValidCardIdReferences(data)
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