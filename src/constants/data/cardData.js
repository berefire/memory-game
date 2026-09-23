import { shuffle } from '@/utils/shuffle';

const NUMBER_VALUES = Array.from({ length: 18 }, (_, i) => i + 1); 

const ICON_VALUES = ['icon-ballon', 'icon-anchor', 'icon-flask', 'icon-sun', 'icon-hand', 'icon-bug', 'icon-moon', 'icon-snowflake', 'icon-sign', 'icon-car'];

export function createShuffledDeck(theme, gridSize) {
  const pairCount = (gridSize * gridSize) / 2;
  const values = theme === 'icons' ? ICON_VALUES : NUMBER_VALUES;
  const selectedValues = values.slice(0, pairCount);

  const deck = selectedValues.flatMap((value) => [{ value }, { value }]);

  return shuffle(deck).map((card, index) => ({
    id: index,
    value: card.value,
    isFlipped: false,
    isMatched: false,
  }));
}