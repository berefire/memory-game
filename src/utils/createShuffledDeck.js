import { shuffle } from '@/utils/shuffle';
import { ICON_MAP, NUMBER_VALUES } from '@/data/cardData';

export function createShuffledDeck(theme, gridSize) {
  const pairCount = (gridSize * gridSize) / 2;
  const values = theme === 'icons' ? Object.keys(ICON_MAP) : NUMBER_VALUES;
  const selectedValues = values.slice(0, pairCount);

  const deck = selectedValues.flatMap((value) => [{ value }, { value }]);

  return shuffle(deck).map((card, index) => ({
    id: index,
    value: card.value,
    isFlipped: false,
    isMatched: false,
  }));
}