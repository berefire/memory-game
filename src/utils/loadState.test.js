import { describe, it, expect, beforeEach } from "vitest";
import { loadState, isValidGameState, STORAGE_KEY } from "./loadState";

const validCards = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  value: Math.floor(i / 2) + 1,
  isFlipped: false,
  isMatched: false,
}));

const validPlayers = [
  { id: 0, score: 0 },
  { id: 1, score: 0 },
];

const validState = {
  status: "playing",
  settings: { theme: "numbers", playerCount: 2, gridSize: 4 },
  cards: validCards,
  players: validPlayers,
  flippedCardIds: [],
  lastMatchedIds: [],
  activePlayerIndex: 0,
  moves: 0,
  time: 0,
};

describe("isValidGameState", () => {
  it("accepts a complete, correctly-shaped state", () => {
    expect(isValidGameState(validState)).toBe(true);
  });

  it("rejects null, a string, or a number", () => {
    expect(isValidGameState(null)).toBeFalsy();
    expect(isValidGameState("playing")).toBeFalsy();
    expect(isValidGameState(42)).toBeFalsy();
  });

  it("rejects a state missing settings entirely", () => {
    // eslint-disable-next-line no-unused-vars
    const { settings, ...rest } = validState;
    expect(isValidGameState(rest)).toBeFalsy();
  });

  it("rejects a state where settings.gridSize is the wrong type", () => {
    const broken = {
      ...validState,
      settings: { ...validState.settings, gridSize: "4" },
    };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where cards is not an array", () => {
    const broken = { ...validState, cards: "not-an-array" };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state missing status", () => {
    // eslint-disable-next-line no-unused-vars
    const { status, ...rest } = validState;
    expect(isValidGameState(rest)).toBe(false);
  });

  it("rejects a state where a card is null, keeping the length correct", () => {
    const broken = { ...validState, cards: [null, ...validCards.slice(1)] };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where a card is missing isFlipped, keeping the length correct", () => {
    const brokenCards = [
      { id: 0, value: 1, isMatched: false },
      ...validCards.slice(1),
    ];
    const broken = { ...validState, cards: brokenCards };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where a player is missing score, keeping the length correct", () => {
    const broken = { ...validState, players: [{ id: 0 }, { id: 1, score: 0 }] };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where cards.length doesn't match gridSize squared", () => {
    const broken = { ...validState, cards: [] };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where players.length doesn't match playerCount", () => {
    const broken = { ...validState, players: [] };
    expect(isValidGameState(broken)).toBe(false);
  });
});

describe("loadState", () => {
  const initialArg = { fallback: true };

  beforeEach(() => {
    sessionStorage.clear();
  });

  it("returns initialArg when nothing is saved", () => {
    expect(loadState(initialArg)).toBe(initialArg);
  });

  it("returns the saved state when it is valid", () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validState));
    expect(loadState(initialArg)).toEqual(validState);
  });

  it("returns initialArg when the saved value is not valid JSON", () => {
    sessionStorage.setItem(STORAGE_KEY, "not valid json{");
    expect(loadState(initialArg)).toBe(initialArg);
  });

  it("returns initialArg when the saved JSON is missing required fields", () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ status: "playing" }));
    expect(loadState(initialArg)).toBe(initialArg);
  });

  it("returns initialArg when a saved card is malformed", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...validState, cards: [null, ...validCards.slice(1)] }),
    );
    expect(loadState(initialArg)).toBe(initialArg);
  });

  it("returns initialArg when players.length doesn't match playerCount", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...validState, players: [] }),
    );
    expect(loadState(initialArg)).toBe(initialArg);
  });

  it("rejects a state where flippedCardIds references a nonexistent card id", () => {
    const broken = { ...validState, flippedCardIds: [999] };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state where lastMatchedIds references a nonexistent card id", () => {
    const broken = { ...validState, lastMatchedIds: [999] };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("accepts a state where flippedCardIds and lastMatchedIds reference real card ids", () => {
    const good = {
      ...validState,
      flippedCardIds: [0, 1],
      lastMatchedIds: [2, 3],
    };
    expect(isValidGameState(good)).toBe(true);
  });

  it("rejects a state with an unsupported status", () => {
    const broken = { ...validState, status: "paused" };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state with an unsupported theme", () => {
    const broken = {
      ...validState,
      settings: { ...validState.settings, theme: "emoji" },
    };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state with an unsupported gridSize", () => {
    const broken = {
      ...validState,
      settings: { ...validState.settings, gridSize: 8 },
    };
    expect(isValidGameState(broken)).toBe(false);
  });

  it("rejects a state with an unsupported playerCount", () => {
    const broken = {
      ...validState,
      settings: { ...validState.settings, playerCount: 5 },
    };
    expect(isValidGameState(broken)).toBe(false);
  });
});
