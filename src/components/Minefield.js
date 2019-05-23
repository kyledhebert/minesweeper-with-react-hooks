import React, { useContext } from "react";
import { GameContext, Mine } from "./index";

export const Minefield = () => {
  const { state } = useContext(GameContext);
  return (
    <div className="mine-field">
      {state.minefield.map((mine, index) => (
        <Mine mine={mine} key={`{mine-${index}`} />
      ))}
    </div>
  );
};
