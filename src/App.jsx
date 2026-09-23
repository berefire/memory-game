import { useReducer, useEffect } from 'react';
import { gameReducer, initialState } from '@/reducer/gameReducer';
import { ACTIONS } from '@/reducer/actions';


function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if(state.flippedCardIds.length === 2) {
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

  return (
    <>

    </>
  )
}

export default App
