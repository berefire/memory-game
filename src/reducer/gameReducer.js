import buildNewGameState from "@/utils/buildNewGameState";
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
  lastMatchedIds: [],
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

      const isStartingNewAttempt = state.flippedCardIds.length === 0;

      const updatedCards = state.cards.map((c) =>
        c.id === cardId ? { ...c, isFlipped: true } : c,
      );

      return {
        ...state,
        cards: updatedCards,
        flippedCardIds: [...state.flippedCardIds, cardId],
        lastMatchedIds: isStartingNewAttempt ? [] : state.lastMatchedIds,
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

      const isGameOver = updatedCards.every((c) => c.isMatched);

      return {
        ...state,
        status: isGameOver ? "gameOver" : state.status,
        cards: updatedCards,
        flippedCardIds: [],
        lastMatchedIds: isMatch ? [firstId, secondId] : state.lastMatchedIds,
        players: updatedPlayers,
        moves: state.moves + 1,
        activePlayerIndex: isMatch
          ? state.activePlayerIndex
          : (state.activePlayerIndex + 1) % state.players.length,
      };
    }

    case ACTIONS.START_GAME: {
      return buildNewGameState(action.payload);
    }

    case ACTIONS.RESTART: {
      return buildNewGameState(state.settings);
    }

    case ACTIONS.TICK: {
      if (state.status !== "playing") {
        return state;
      }
      return {
        ...state,
        time: state.time + 1,
      };
    }

    case ACTIONS.RETURN_TO_SETUP: {
      return {
        ...initialState,
        settings: state.settings,
      };
    }

    default:
      return state;
  }
}
