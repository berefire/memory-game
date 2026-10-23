import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GamePage from "./GamePage";

vi.mock("@/components/Header/Header", () => ({
  default: (props) => (
    <div data-testid="header-mock" data-has-dispatch={String(typeof props.dispatch === "function")} />
  ),
}));

vi.mock("@/components/GameBoard/GameBoard", () => ({
  default: (props) => (
    <div
      data-testid="game-board-mock"
      data-grid-size={props.gridSize}
      data-theme={props.theme}
      data-cards-length={props.cards.length}
      data-last-matched={JSON.stringify(props.lastMatchedIds)}
      data-has-dispatch={String(typeof props.dispatch === "function")}
    />
  ),
}));

vi.mock("@/components/StatsBar/StatsBar", () => ({
  default: (props) => (
    <div
      data-testid="stats-bar-mock"
      data-time={props.time}
      data-moves={props.moves}
      data-players-length={props.players.length}
      data-active-player-index={props.activePlayerIndex}
    />
  ),
}));

vi.mock("@/components/ResultsModal/ResultsModal", () => ({
  default: (props) => <div data-testid="results-modal-mock" data-is-open={String(props.isOpen)} />,
}));

vi.mock("@/components/Attribution/Attribution", () => ({
  default: (props) => (
    <div data-testid="attribution-mock" data-color-text={props.colorText} data-color-link={props.colorLink} />
  ),
}));

function makeState(overrides = {}) {
  return {
    status: "playing",
    settings: { theme: "numbers", playerCount: 1, gridSize: 4 },
    cards: [{ id: 0, value: 1, isFlipped: false, isMatched: false }],
    flippedCardIds: [],
    lastMatchedIds: [],
    players: [{ id: 0, score: 0 }],
    activePlayerIndex: 0,
    moves: 0,
    time: 0,
    ...overrides,
  };
}

describe("GamePage", () => {
  it("passes dispatch to Header", () => {
    render(<GamePage state={makeState()} dispatch={vi.fn()} />);
    expect(screen.getByTestId("header-mock")).toHaveAttribute("data-has-dispatch", "true");
  });

  it("passes the board state to GameBoard", () => {
    const state = makeState({ lastMatchedIds: [0] });
    render(<GamePage state={state} dispatch={vi.fn()} />);

    const board = screen.getByTestId("game-board-mock");
    expect(board).toHaveAttribute("data-grid-size", "4");
    expect(board).toHaveAttribute("data-theme", "numbers");
    expect(board).toHaveAttribute("data-cards-length", "1");
    expect(board).toHaveAttribute("data-last-matched", "[0]");
    expect(board).toHaveAttribute("data-has-dispatch", "true");
  });

  it("passes score state to StatsBar", () => {
    const state = makeState({ time: 42, moves: 7 });
    render(<GamePage state={state} dispatch={vi.fn()} />);

    const statsBar = screen.getByTestId("stats-bar-mock");
    expect(statsBar).toHaveAttribute("data-time", "42");
    expect(statsBar).toHaveAttribute("data-moves", "7");
    expect(statsBar).toHaveAttribute("data-players-length", "1");
    expect(statsBar).toHaveAttribute("data-active-player-index", "0");
  });

  it("opens ResultsModal only when status is gameOver", () => {
    const { rerender } = render(<GamePage state={makeState({ status: "playing" })} dispatch={vi.fn()} />);
    expect(screen.getByTestId("results-modal-mock")).toHaveAttribute("data-is-open", "false");

    rerender(<GamePage state={makeState({ status: "gameOver" })} dispatch={vi.fn()} />);
    expect(screen.getByTestId("results-modal-mock")).toHaveAttribute("data-is-open", "true");
  });

  it("renders Attribution with colors suited to the light background", () => {
    render(<GamePage state={makeState()} dispatch={vi.fn()} />);
    const attribution = screen.getByTestId("attribution-mock");
    expect(attribution).toHaveAttribute("data-color-text", "text-blue-950");
    expect(attribution).toHaveAttribute("data-color-link", "text-blue-800");
  });
});