import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/utils/shuffle", () => ({
  shuffle: vi.fn((deck) => deck),
}));

import { shuffle } from "@/utils/shuffle";
import { createShuffledDeck } from "./createShuffledDeck";
import { ICON_MAP, NUMBER_VALUES } from "@/data/cardData";

describe("createShuffledDeck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates gridSize squared cards", () => {
    const deck = createShuffledDeck("numbers", 4);
    expect(deck).toHaveLength(16);
  });

  it("creates exactly two cards per value", () => {
    const deck = createShuffledDeck("numbers", 4);
    const counts = {};
    deck.forEach((card) => {
      counts[card.value] = (counts[card.value] || 0) + 1;
    });
    expect(Object.values(counts)).toEqual(Array(8).fill(2));
  });

  it("uses the first pairCount numbers for the numbers theme", () => {
    const deck = createShuffledDeck("numbers", 4);
    const usedValues = [...new Set(deck.map((card) => card.value))].sort((a, b) => a - b);
    expect(usedValues).toEqual(NUMBER_VALUES.slice(0, 8));
  });

  it("uses the first pairCount icons for the icons theme", () => {
    const deck = createShuffledDeck("icons", 4);
    const usedValues = new Set(deck.map((card) => card.value));
    const expectedValues = new Set(Object.keys(ICON_MAP).slice(0, 8));
    expect(usedValues).toEqual(expectedValues);
  });

  it("produces exactly 18 unique pairs at the maximum 6x6 grid size", () => {
    const deck = createShuffledDeck("icons", 6);
    expect(deck).toHaveLength(36);
    const usedValues = new Set(deck.map((card) => card.value));
    expect(usedValues.size).toBe(18);
  });

  it("passes the unshuffled deck to shuffle before assigning ids", () => {
    createShuffledDeck("numbers", 4);

    expect(shuffle).toHaveBeenCalledOnce();
    const passedDeck = shuffle.mock.calls[0][0];
    expect(passedDeck).toHaveLength(16);
    expect(passedDeck[0]).toEqual({ value: 1 });
  });

  it("assigns sequential ids and starts every card face-down and unmatched", () => {
    const deck = createShuffledDeck("numbers", 4);
    deck.forEach((card, index) => {
      expect(card.id).toBe(index);
      expect(card.isFlipped).toBe(false);
      expect(card.isMatched).toBe(false);
    });
  });
});