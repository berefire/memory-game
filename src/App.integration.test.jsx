import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { STORAGE_KEY } from "@/utils/loadState";
import App from "./App";

describe("App (integration, real pages)", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the real SetupPage and GameSetup when there is no saved game", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "memory" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
  });

  it("renders the real GamePage and GameBoard when a saved game is in progress", () => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        status: "playing",
        settings: { theme: "numbers", playerCount: 1, gridSize: 4 },
        cards: [
          { id: 0, value: 1, isFlipped: false, isMatched: false },
          { id: 1, value: 1, isFlipped: false, isMatched: false },
        ],
        players: [{ id: 0, score: 0 }],
        flippedCardIds: [],
        lastMatchedIds: [],
        activePlayerIndex: 0,
        moves: 0,
        time: 0,
      }),
    );

    vi.useFakeTimers();
    render(<App />);

    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Card 1, hidden" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Card 2, hidden" })).toBeInTheDocument();
  });
});