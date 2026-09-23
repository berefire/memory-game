import { useState } from "react";
import ToggleGroup from "@/components/ToggleGroup/ToggleGroup";
import { ACTIONS } from "@/reducer/actions";

function GameSetup({ dispatch }) {
    const [theme, setTheme] = useState("numbers");
    const [playerCount, setPlayerCount] = useState(1);
    const [gridSize, setGridSize] = useState(4);

    const handleStart = () => {
        dispatch({
            type: ACTIONS.START_GAME,
            payload: { theme, playerCount, gridSize },
        });
    };

    return (
        <div>
            <h1 className="sr-only">Game Setup</h1>
            <div className="bg-grey-50 p-6 md:py-14.25 md:px-13.75 flex flex-col gap-10 rounded-[0.625rem]">
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
             <button type="button" onClick={handleStart} className="bg-orange-400 hover:bg-orange-300 cursor-pointer focus-ring focus-ring-orange-400 py-3 rounded-[1.625rem] text-grey-50 font-bold text-lg md:text-[2rem] leading-tight">Start Game</button>
            </div>
        </div>
    );
}

export default GameSetup;