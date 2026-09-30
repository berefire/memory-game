import { useReducer, useEffect } from "react";
import { gameReducer } from "@/reducer/gameReducer";
import { initialState } from "@/reducer/initialState";
import { ACTIONS } from "@/reducer/actions";
import SetupPage from "@/pages/SetupPage";
import GamePage from "@/pages/GamePage";

const STORAGE_KEY = "memory-game-state";

function loadState(initialArg) {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialArg;
  } catch {
    return initialArg;
  }
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadState);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("Couldn't save game state to sessionStorage:", error);
      }
    }
  }, [state]);

  useEffect(() => {
    if (state.flippedCardIds.length === 2) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.CHECK_MATCH });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.flippedCardIds]);

  useEffect(() => {
    if (state.status !== "playing") return;

    const interval = setInterval(() => {
      dispatch({ type: ACTIONS.TICK });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status]);

  if (state.status === "setup") {
    return <SetupPage dispatch={dispatch} />;
  }

  return <GamePage state={state} dispatch={dispatch} />;
}

export default App;
