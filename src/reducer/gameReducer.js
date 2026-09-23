import { ACTIONS } from "./actions";

export const initialState = {
  status: "setup", // 'setup' | 'playing' | 'gameOver'
  settings: {
    theme: "numbers", // 'numbers' | 'icons'
    playerCount: 1,
    gridSize: 4, // 4 or 6
  },
  cards: [], 
  flippedCardIds: [], 
  players: [], 
  activePlayerIndex: 0,
  moves: 0,
  time: 0,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FLIP_CARD: {
      const { cardId } = action.payload;
      const card = state.cards.find((c) => c.id === cardId);

      if (
        card.isFlipped ||
        card.isMatched ||
        state.flippedCardIds.length >= 2
      ) {
        return state;
      }

      const updatedCards = state.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c,
      );

      return {
        ...state,
        cards: updatedCards,
        flippedCardIds: [...state.flippedCardIds, cardId],
      };
    }

    case ACTIONS.CHECK_MATCH: {
      const [firstId, secondId] = state.flippedCardIds;
      const firstCard = state.cards.find((c) => c.id === firstId);
      const secondCard = state.cards.find((c) => c.id === secondId);
      const isMatch = firstCard.value === secondCard.value;

      const updatedCards = state.cards.map((c) => {
        if (c.id === firstId || c.id === secondId) {
          return isMatch
            ? { ...c, isMatched: true }
            : { ...c, isFlipped: false };
        }
        return c;
      });

      const updatedPlayers = isMatch
        ? state.players.map((p, index) =>
            index === state.activePlayerIndex
              ? { ...p, score: p.score + 1 }
              : p,
          )
        : state.players;

      return {
        ...state,
        cards: updatedCards,
        flippedCardIds: [],
        players: updatedPlayers,
        moves: state.moves + 1,
        activePlayerIndex: isMatch
          ? state.activePlayerIndex
          : (state.activePlayerIndex + 1) % state.players.length,
      };
    }

    case ACTIONS.START_GAME: {
      const { theme, playerCount, gridSize } = action.payload;

      return {
        ...initialState,
        status: "playing",
        settings: { theme, playerCount, gridSize },
        cards: createShuffledDeck(theme, gridSize),
        players: Array.from({ length: playerCount }, (_, index) => ({
          id: index,
          score: 0,
        })),
      };
    }

    default:
      return state;
  }
}
