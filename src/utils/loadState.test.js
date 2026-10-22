import { describe, it, expect, beforeEach } from "vitest";
import { loadState, isValidGameState, STORAGE_KEY } from "./loadState";

const validState = {
  status: "playing",
  settings: { theme: "numbers", playerCount: 2, gridSize: 4 },
  cards: [],
  players: [],
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
    const broken = { ...validState, settings: { ...validState.settings, gridSize: "4" } };
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
});