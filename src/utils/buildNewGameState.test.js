import { describe, it, expect, vi } from "vitest";

vi.mock("@/utils/createShuffledDeck", () => ({
  createShuffledDeck: vi.fn(() => ["card-a", "card-b"]),
}));

import { createShuffledDeck } from "@/utils/createShuffledDeck";
import buildNewGameState from "./buildNewGameState";

describe("buildNewGameState", () => {
  const settings = { theme: "icons", gridSize: 6, playerCount: 2 };

  it("sets status to playing", () => {
    const state = buildNewGameState(settings);
    expect(state.status).toBe("playing");
  });

  it("stores the given settings", () => {
    const state = buildNewGameState(settings);
    expect(state.settings).toEqual(settings);
  });

  it("builds the deck using the settings theme and gridSize", () => {
    buildNewGameState(settings);
    expect(createShuffledDeck).toHaveBeenCalledWith("icons", 6);
  });

  it("uses the shuffled deck as the cards", () => {
    const state = buildNewGameState(settings);
    expect(state.cards).toEqual(["card-a", "card-b"]);
  });

  it("creates one player per playerCount, each starting at score 0", () => {
    const state = buildNewGameState(settings);
    expect(state.players).toEqual([
      { id: 0, score: 0 },
      { id: 1, score: 0 },
    ]);
  });

  it("resets the other game-progress fields to their initial values", () => {
    const state = buildNewGameState(settings);
    expect(state.flippedCardIds).toEqual([]);
    expect(state.lastMatchedIds).toEqual([]);
    expect(state.activePlayerIndex).toBe(0);
    expect(state.moves).toBe(0);
    expect(state.time).toBe(0);
  });

  it("creates an empty players array when playerCount is 0", () => {
    const state = buildNewGameState({ theme: "numbers", gridSize: 4, playerCount: 0 });
    expect(state.players).toEqual([]);
  });
});