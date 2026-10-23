import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { STORAGE_KEY } from "@/utils/loadState";
import { ACTIONS } from "@/reducer/actions";

let capturedDispatch;
let capturedState;

const validPlayingState = {
  status: "playing",
  settings: { theme: "numbers", playerCount: 1, gridSize: 4 },
  cards: Array.from({ length: 16 }, (_, i) => ({
    id: i,
    value: Math.floor(i / 2) + 1,
    isFlipped: false,
    isMatched: false,
  })),
  players: [{ id: 0, score: 0 }],
  flippedCardIds: [],
  lastMatchedIds: [],
  activePlayerIndex: 0,
  moves: 0,
  time: 0,
};

async function renderMockedApp() {
  const { default: App } = await import("./App");
  const { gameReducer } = await import("@/reducer/gameReducer");
  render(<App />);
  return { gameReducer };
}

beforeEach(() => {
  vi.resetModules();
  sessionStorage.clear();
  capturedDispatch = undefined;
  capturedState = undefined;
});

afterEach(() => {
  vi.useRealTimers();
  vi.doUnmock("@/pages/SetupPage");
  vi.doUnmock("@/pages/GamePage");
  vi.doUnmock("@/reducer/gameReducer");
});

describe("App (page rendering mocked)", () => {
  beforeEach(() => {
    vi.doMock("@/pages/SetupPage", () => ({
      default: ({ dispatch }) => {
        capturedDispatch = dispatch;
        return <div data-testid="setup-page" />;
      },
    }));

    vi.doMock("@/pages/GamePage", () => ({
      default: ({ state, dispatch }) => {
        capturedDispatch = dispatch;
        capturedState = state;
        return <div data-testid="game-page" />;
      },
    }));

    vi.doMock("@/reducer/gameReducer", () => ({
      gameReducer: vi.fn((state, action) =>
        action.type === "TEST_SET" ? { ...state, ...action.payload } : state,
      ),
    }));
  });

  it("renders SetupPage when there is no saved state", async () => {
    await renderMockedApp();
    expect(screen.getByTestId("setup-page")).toBeInTheDocument();
    expect(screen.queryByTestId("game-page")).not.toBeInTheDocument();
  });

  it("renders GamePage when sessionStorage has a saved state past setup", async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validPlayingState));
    await renderMockedApp();
    expect(screen.getByTestId("game-page")).toBeInTheDocument();
    expect(capturedState.status).toBe("playing");
  });

  it("falls back to initial state when sessionStorage has invalid JSON", async () => {
    sessionStorage.setItem(STORAGE_KEY, "not valid json");
    await renderMockedApp();
    expect(screen.getByTestId("setup-page")).toBeInTheDocument();
  });

  it("persists state to sessionStorage whenever it changes", async () => {
    await renderMockedApp();

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "playing" } });
    });

    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    expect(saved.status).toBe("playing");
  });

  it("dispatches CHECK_MATCH 1 second after two cards are flipped", async () => {
    vi.useFakeTimers();
    const { gameReducer } = await renderMockedApp();

    act(() => {
      capturedDispatch({
        type: "TEST_SET",
        payload: { flippedCardIds: [0, 1] },
      });
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(gameReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: ACTIONS.CHECK_MATCH }),
    );
  });

  it("does not dispatch CHECK_MATCH if the flipped cards change before 1 second passes", async () => {
    vi.useFakeTimers();
    const { gameReducer } = await renderMockedApp();

    act(() => {
      capturedDispatch({
        type: "TEST_SET",
        payload: { flippedCardIds: [0, 1] },
      });
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

    const checkMatchCalls = gameReducer.mock.calls.filter(
      ([, action]) => action.type === ACTIONS.CHECK_MATCH,
    );
    expect(checkMatchCalls).toHaveLength(0);
  });

  it("ticks every second while status is playing", async () => {
    vi.useFakeTimers();
    const { gameReducer } = await renderMockedApp();

    act(() => {
      capturedDispatch({ type: "TEST_SET", payload: { status: "playing" } });
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const tickCalls = gameReducer.mock.calls.filter(
      ([, action]) => action.type === ACTIONS.TICK,
    );
    expect(tickCalls).toHaveLength(3);
  });

  it("stops ticking once status leaves playing", async () => {
    vi.useFakeTimers();
    const { gameReducer } = await renderMockedApp();

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

    const tickCalls = gameReducer.mock.calls.filter(
      ([, action]) => action.type === ACTIONS.TICK,
    );
    expect(tickCalls).toHaveLength(2);
  });
});

describe("App (integration, real pages)", () => {
  beforeEach(() => {
    vi.doUnmock("@/pages/SetupPage");
    vi.doUnmock("@/pages/GamePage");
    vi.doUnmock("@/reducer/gameReducer");
  });

  it("renders the real SetupPage and GameSetup when there is no saved game", async () => {
    const { default: App } = await import("./App");
    render(<App />);

    expect(screen.getByRole("heading", { name: "memory" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
  });

  it("renders the real GamePage and GameBoard when a saved game is in progress", async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validPlayingState));

    vi.useFakeTimers();
    const { default: App } = await import("./App");
    render(<App />);

    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Card 1, hidden" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Card 2, hidden" }),
    ).toBeInTheDocument();
  });

  it("starts a real game when Start Game is submitted from the real SetupPage", async () => {
    const { default: App } = await import("./App");
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: /start game/i }));

    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    const cardButtons = screen.getAllByRole("button", {
      name: /^Card \d+, hidden$/,
    });
    expect(cardButtons.length).toBeGreaterThan(0);
  });

  it("flips a real card when clicked during a real game", async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validPlayingState));
    const { default: App } = await import("./App");
    render(<App />);

    await userEvent.click(
      screen.getByRole("button", { name: "Card 1, hidden" }),
    );

    expect(
      screen.queryByRole("button", { name: "Card 1, hidden" }),
    ).not.toBeInTheDocument();
  });

  it("resets a flipped card back to hidden when Restart is clicked", async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validPlayingState));
    const { default: App } = await import("./App");
    render(<App />);

    await userEvent.click(
      screen.getByRole("button", { name: "Card 1, hidden" }),
    );
    expect(
      screen.queryByRole("button", { name: "Card 1, hidden" }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Restart" }));

    expect(
      screen.getByRole("button", { name: "Card 1, hidden" }),
    ).toBeInTheDocument();
  });

  it("returns to the real SetupPage when New Game is clicked", async () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(validPlayingState));
    const { default: App } = await import("./App");
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "New Game" }));

    expect(
      screen.getByRole("button", { name: /start game/i }),
    ).toBeInTheDocument();
  });
});
