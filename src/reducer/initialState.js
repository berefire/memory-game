export const initialState = {
  status: "setup", // 'setup' | 'playing' | 'gameOver'
  settings: {
    theme: "numbers", // 'numbers' | 'icons'
    playerCount: 1,
    gridSize: 4, // 4 or 6
  },
  cards: [],
  flippedCardIds: [],
  lastMatchedIds: [],
  players: [],
  activePlayerIndex: 0,
  moves: 0,
  time: 0,
};