import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ACTIONS } from "@/reducer/actions";
import { formatTime } from "@/utils/formatTime";
import ResultsModal from "./ResultsModal";

describe("ResultsModal", () => {
  it("does not open the dialog when isOpen is false", () => {
    const showModalSpy = vi
      .spyOn(HTMLDialogElement.prototype, "showModal")
      .mockImplementation(() => {});

    render(
      <ResultsModal
        isOpen={false}
        players={[{ id: 0, score: 8 }]}
        time={65}
        moves={12}
        dispatch={vi.fn()}
      />,
    );

    expect(showModalSpy).not.toHaveBeenCalled();
    showModalSpy.mockRestore();
  });

  it("opens the dialog when isOpen is true", () => {
    const showModalSpy = vi
      .spyOn(HTMLDialogElement.prototype, "showModal")
      .mockImplementation(() => {});

    render(
      <ResultsModal
        isOpen
        players={[{ id: 0, score: 8 }]}
        time={65}
        moves={12}
        dispatch={vi.fn()}
      />,
    );

    expect(showModalSpy).toHaveBeenCalledOnce();
    showModalSpy.mockRestore();
  });

  it("shows solo results with time and moves", () => {
    render(
      <ResultsModal isOpen players={[{ id: 0, score: 8 }]} time={65} moves={12} dispatch={vi.fn()} />
    );

    expect(screen.getByText("You did it!")).toBeInTheDocument();
    expect(screen.getByText("Time Elapsed")).toBeInTheDocument();
    expect(screen.getByText(formatTime(65))).toBeInTheDocument();
    expect(screen.getByText("12 Moves")).toBeInTheDocument();
  });

  it("declares a single winner in multiplayer mode", () => {
    render(
      <ResultsModal
        isOpen
        players={[{ id: 0, score: 3 }, { id: 1, score: 7 }]}
        time={0}
        moves={0}
        dispatch={vi.fn()}
      />
    );

    expect(screen.getByText("Player 2 Wins!")).toBeInTheDocument();
    expect(screen.getByText(/\(Winner!\)/)).toBeInTheDocument();
  });

  it("declares a tie when scores match", () => {
    render(
      <ResultsModal
        isOpen
        players={[{ id: 0, score: 5 }, { id: 1, score: 5 }]}
        time={0}
        moves={0}
        dispatch={vi.fn()}
      />
    );

    expect(screen.getByText("It's a tie!")).toBeInTheDocument();
    expect(screen.getAllByText(/\(Tied!\)/)).toHaveLength(2);
  });

  it("sorts players by score, highest first", () => {
    render(
      <ResultsModal
        isOpen
        players={[{ id: 0, score: 2 }, { id: 1, score: 9 }, { id: 2, score: 5 }]}
        time={0}
        moves={0}
        dispatch={vi.fn()}
      />
    );

    const scoreCells = screen.getAllByText(/Pairs$/);
    expect(scoreCells.map((el) => el.textContent)).toEqual(["9 Pairs", "5 Pairs", "2 Pairs"]);
  });

  it("dispatches RESTART when Restart is clicked", async () => {
    const dispatch = vi.fn();
    render(<ResultsModal isOpen players={[{ id: 0, score: 1 }]} time={0} moves={0} dispatch={dispatch} />);

    await userEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(dispatch).toHaveBeenCalledWith({ type: ACTIONS.RESTART });
  });

  it("dispatches RETURN_TO_SETUP when Setup New Game is clicked", async () => {
    const dispatch = vi.fn();
    render(<ResultsModal isOpen players={[{ id: 0, score: 1 }]} time={0} moves={0} dispatch={dispatch} />);

    await userEvent.click(screen.getByRole("button", { name: "Setup New Game" }));
    expect(dispatch).toHaveBeenCalledWith({ type: ACTIONS.RETURN_TO_SETUP });
  });
});