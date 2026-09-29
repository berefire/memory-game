import { useState } from "react";
import ToggleGroup from "@/components/ToggleGroup/ToggleGroup";
import { ACTIONS } from "@/reducer/actions";
import Button from "@/components/Button/Button";

function GameSetup({ dispatch }) {
    const [theme, setTheme] = useState("numbers");
    const [playerCount, setPlayerCount] = useState(1);
    const [gridSize, setGridSize] = useState(4);

    const handleStart = (e) => {
        e.preventDefault();
        dispatch({
            type: ACTIONS.START_GAME,
            payload: { theme, playerCount, gridSize },
        });
    };

    return (
        <main className="flex-1 flex flex-col gap-12 md:gap-20 justify-center items-center">
        <h1 className="font-body text-center text-[2rem] md:text-[2.5rem] font-bold text-grey-50 leading-tight">
          memory
        </h1>
            <h2 className="sr-only" id="setup-heading">Game Setup</h2>
            <form onSubmit={handleStart} aria-labelledby="setup-heading" className="bg-grey-50 p-6 md:py-14.25 md:px-13.75 flex flex-col gap-10 rounded-[0.625rem] w-full max-w-[calc(100%-3rem)] md:max-w-[calc(100%-7.125rem)] lg:max-w-[calc(100%-25.65rem)] xl:max-w-[calc(100%-49.125rem)]">
            <div className="flex flex-col gap-6">
            <ToggleGroup
                name="theme"
                label="Select Theme"
                options={[
                    { label: "Numbers", value: "numbers" },
                    { label: "Icons", value: "icons" },
                ]}
                value={theme}
                onChange={setTheme}
             />
             <ToggleGroup 
                name="players"
                label="Number of Players"
                options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                ]}
                value={playerCount}
                onChange={setPlayerCount}
             />
             <ToggleGroup
                name="gridSize"
                label="Grid Size"
                options={[
                    { label: "4x4", value: 4 },
                    { label: "6x6", value: 6 },
                ]}
                value={gridSize}
                onChange={setGridSize}
             />
             </div>
             <Button type="submit" fullWidth>
                Start Game
             </Button>
            </form>
        </main>
    );
}

export default GameSetup;