import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ACTIONS } from "@/reducer/actions";
import App from "./App";

let capturedDispatch;
let capturedState;

vi.mock("@/pages/SetupPage", () => ({
  default: ({ dispatch }) => {
    capturedDispatch = dispatch;
    return <div data-testid="setup-page" />;
  },
}));

vi.mock("@/pages/GamePage", () => ({
  default: ({ state, dispatch }) => {
    capturedDispatch = dispatch;
    capturedState = state;
    return <div data-testid="game-page" />;
  },
}));

vi.mock("@/reducer/gameReducer", () => ({
  gameReducer: vi.fn((state, action) =>
    action.type === "TEST_SET" ? { ...state, ...action.payload } : state
  ),
}));

import { gameReducer } from "@/reducer/gameReducer";

const STORAGE_KEY = "memory-game-state";

describe("App", () => {
  beforeEach(() => {
    sessionStorage.clear();
    gameReducer.mockClear();
    capturedDispatch = undefined;
    capturedState = undefined;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders SetupPage when there is no saved state", () => {
    render(<App />);
    expect(screen.getByTestId("setup-page")).toBeInTheDocument();
    expect(screen.queryByTestId("game-page")).not.toBeInTheDocument();
  });

  it("renders GamePage when sessionStorage has a saved state past setup", () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ status: "playing", flippedCardIds: [] }));
    render(<App />);
    expect(screen.getByTestId("game-page")).toBeInTheDocument();
    expect(capturedState.status).toBe("playing");
  });

  it("falls back to initial state when sessionStorage has invalid JSON", () => {
    sessionStorage.setItem(STORAGE_KEY, "not valid json");
    render(<App />);
    expect(screen.getByTestId("setup-page")).toBeInTheDocument();
  });

  it("persists state to sessionStorage whenever it changes", () => {
    render(<App />);

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "playing" } });
    });

    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    expect(saved.status).toBe("playing");
  });

  it("dispatches CHECK_MATCH 1 second after two cards are flipped", () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { flippedCardIds: [0, 1] } });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(gameReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: ACTIONS.CHECK_MATCH })
    );
  });

  it("does not dispatch CHECK_MATCH if the flipped cards change before 1 second passes", () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { flippedCardIds: [0, 1] } });
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { flippedCardIds: [] } });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const checkMatchCalls = gameReducer.mock.calls.filter(([, action]) => action.type === ACTIONS.CHECK_MATCH);
    expect(checkMatchCalls).toHaveLength(0);
  });

  it("ticks every second while status is playing", () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "playing" } });
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const tickCalls = gameReducer.mock.calls.filter(([, action]) => action.type === ACTIONS.TICK);
    expect(tickCalls).toHaveLength(3);
  });

  it("stops ticking once status leaves playing", () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "playing" } });
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "setup" } });
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const tickCalls = gameReducer.mock.calls.filter(([, action]) => action.type === ACTIONS.TICK);
    expect(tickCalls).toHaveLength(2);
  });
});