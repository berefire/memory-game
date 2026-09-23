import { shuffle } from '@/utils/shuffle';
import { FaRegSnowflake } from "react-icons/fa6";
import { IoFlaskSharp, IoFootball } from "react-icons/io5";
import { FaLiraSign, FaCar, FaHandSpock, FaSun, FaAnchor, FaRegMoon } from "react-icons/fa";
import { AiFillBug } from "react-icons/ai";

const NUMBER_VALUES = Array.from({ length: 18 }, (_, i) => i + 1); 

export const ICON_MAP = {
  "icon-football": IoFootball,
  "icon-anchor": FaAnchor,
  "icon-flask-sharp": IoFlaskSharp,
  "icon-bug": AiFillBug,
  "icon-moon": FaRegMoon,
  "icon-snowflake": FaRegSnowflake,
  "icon-car": FaCar,
  "icon-lira": FaLiraSign,
  "icon-hand-spock": FaHandSpock,
  "icon-sun": FaSun,
};

console.log(
  Object.entries(ICON_MAP).map(([key, value]) => [key, typeof value])
);

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