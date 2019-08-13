import React, { useContext } from "react";
import classNames from "classnames";

import { GameContext } from "./index";

import {
  revealNeighbors,
  allBombsFlagged,
  unrevealedCountEqualsBombCount,
  revealAll,
  updateMinefield
} from "../utils";

export const Mine = ({ mine }) => {
  const { state, dispatch } = useContext(GameContext);
  const shouldShowBomb = () =>
    (state.isGameOver || mine.revealed || state.isGameWon) && mine.bomb;
  const shouldShowFlag = () =>
    (!state.isGameOver || !state.isGameWon) && mine.flagged;
  const shouldShowNeighbors = () =>
    (state.isGameOver || mine.revealed) && mine.neighbors;

  const isGameWon = () => {
    return (
      allBombsFlagged(state.minefield) ||
      unrevealedCountEqualsBombCount(state.minefield)
    );
  };

  const handleGameWon = () => {
    const revealed = revealAll(state.minefield);
    const minefield = updateMinefield(state.minefield, revealed);

    dispatch({ type: "setgamewon", payload: true });
    dispatch({ type: "setminefield", payload: minefield });
  };

  const handleClick = () => {
    if (mine.bomb) {
      dispatch({ type: "setgameover", payload: true });
    } else if (!mine.neighbors) {
      mine.revealed = true;
      const revealedNeighbors = revealNeighbors(state.minefield, mine);
      const minefield = updateMinefield(state.minefield, revealedNeighbors);
      dispatch({ type: "setminefield", payload: minefield });
    } else if (mine.neighbors) {
      mine.revealed = true;
      const minefield = updateMinefield(state.minefield, [mine]);
      dispatch({ type: "setminefield", payload: minefield });
    }

    if (isGameWon()) {
      handleGameWon();
    }
  };

  const toggleFlagged = e => {
    // don't show context menu
    e.preventDefault();

    if (mine.revealed && !mine.flagged) {
      return;
    }

    //shouldn't be able to create more flags than bombs when incrementing
    if (!mine.flagged && state.flags === state.mines) {
      return;
    }

    mine.flagged
      ? dispatch({ type: "setflags", payload: state.flags - 1 })
      : dispatch({ type: "setflags", payload: state.flags + 1 });

    mine.flagged = !mine.flagged;

    if (isGameWon()) {
      handleGameWon();
    }
    return false;
  };

  const mineClasses = classNames({
    mine: true,
    "mine-revealed": mine.revealed || state.isGameOver
  });

  return (
    <div
      className={mineClasses}
      onClick={handleClick}
      onContextMenu={e => toggleFlagged(e)}
    >
      {shouldShowBomb()
        ? "💣"
        : shouldShowFlag()
        ? "🚩"
        : shouldShowNeighbors()
        ? `${mine.neighbors}`
        : ""}
    </div>
  );
};
