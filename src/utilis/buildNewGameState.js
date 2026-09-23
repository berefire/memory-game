import { initialState } from '@/reducer/gameReducer';
import { createShuffledDeck } from '@/utilis/createShuffledDeck';

function buildNewGameState(settings) {
  const { theme, gridSize, playerCount } = settings;
  return {
    ...initialState,
    status: 'playing',
    settings,
    cards: createShuffledDeck(theme, gridSize),
    players: Array.from({ length: playerCount }, (_, index) => ({
      id: index,
      score: 0,
    })),
  };
}

export default buildNewGameState;