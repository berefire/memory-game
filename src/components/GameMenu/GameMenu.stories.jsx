import { expect, fn, waitFor, fireEvent } from "storybook/test";
import GameMenu from "./GameMenu";

export default {
  title: "Components/GameMenu",
  component: GameMenu,
  args: {
    dispatch: fn(),
    onClose: fn(),
    isOpen: true,
  },
};

export const Open = {};

export const RestartDispatchesAndCloses = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /restart/i }));

    expect(args.dispatch).toHaveBeenCalledWith({ type: "RESTART" });
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const NewGameDispatchesAndCloses = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /new game/i }));

    expect(args.dispatch).toHaveBeenCalledWith({ type: "RETURN_TO_SETUP" });
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const ResumeClosesWithoutDispatching = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /resume game/i }));

    expect(args.dispatch).not.toHaveBeenCalled();
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const EscapeKeyClosesTheMenu = {
  play: async ({ canvasElement, args }) => {
    const dialog = canvasElement.querySelector("dialog");
    dialog.close();
    await waitFor(() => expect(args.onClose).toHaveBeenCalledOnce());
  },
};

export const BackdropClickCloses = {
  play: async ({ canvasElement, args }) => {
    const dialog = canvasElement.querySelector("dialog");
    fireEvent.click(dialog);
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const ClickInsideContentDoesNotClose = {
  play: async ({ canvasElement, args }) => {
    const heading = canvasElement.querySelector("#game-menu-title");
    fireEvent.click(heading);
    expect(args.onClose).not.toHaveBeenCalled();
  },
};