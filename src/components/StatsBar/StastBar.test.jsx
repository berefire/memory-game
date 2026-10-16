import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { formatTime } from "@/utils/formatTime";
import StatsBar from "./StatsBar";

vi.mock("@/components/StatTile/StatTile", () => ({
  default: ({ label, value, announceChanges }) => (
    <div data-testid={`stat-tile-${label}`} data-announce={String(!!announceChanges)}>
      {label}: {value}
    </div>
  ),
}));

vi.mock("@/components/PlayerTile/PlayerTile", () => ({
  default: ({ player, isActive }) => (
    <div data-testid={`player-tile-${player.id}`} data-active={String(isActive)}>
      Player {player.id + 1}: {player.score}
    </div>
  ),
}));

describe("StatsBar", () => {
  it("shows Time and Moves stat tiles in solo mode", () => {
    render(<StatsBar time={65} moves={10} players={[{ id: 0, score: 0 }]} activePlayerIndex={0} />);

    expect(screen.getByRole("group", { name: "Game stats" })).toBeInTheDocument();
    expect(screen.getByTestId("stat-tile-Time")).toHaveTextContent(`Time: ${formatTime(65)}`);
    expect(screen.getByTestId("stat-tile-Moves")).toHaveTextContent("Moves: 10");
    expect(screen.getByTestId("stat-tile-Moves")).toHaveAttribute("data-announce", "true");
    expect(screen.queryByTestId(/player-tile-/)).not.toBeInTheDocument();
  });

  it("does not announce a turn in solo mode", () => {
    render(<StatsBar time={0} moves={0} players={[{ id: 0, score: 0 }]} activePlayerIndex={0} />);
    expect(screen.queryByText(/'s turn/)).not.toBeInTheDocument();
  });

  it("shows one PlayerTile per player in multiplayer mode", () => {
    render(
      <StatsBar
        time={0}
        moves={0}
        players={[{ id: 0, score: 3 }, { id: 1, score: 5 }]}
        activePlayerIndex={1}
      />
    );

    expect(screen.getByRole("group", { name: "Player scores" })).toBeInTheDocument();
    expect(screen.getByTestId("player-tile-0")).toHaveAttribute("data-active", "false");
    expect(screen.getByTestId("player-tile-1")).toHaveAttribute("data-active", "true");
    expect(screen.queryByTestId(/stat-tile-/)).not.toBeInTheDocument();
  });

  it("announces whose turn it is in multiplayer mode", () => {
    render(
      <StatsBar
        time={0}
        moves={0}
        players={[{ id: 0, score: 0 }, { id: 1, score: 0 }]}
        activePlayerIndex={1}
      />
    );

    expect(screen.getByText("Player 2's turn")).toBeInTheDocument();
  });
});