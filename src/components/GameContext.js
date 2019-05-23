import React, { useReducer, createContext } from "react";

import { generateMineField } from "../utils";

const initialState = {
  minefield: generateMineField(),
  flags: 0,
  isGameOver: false,
  isGameWon: false
};

initialState.mines = initialState.minefield.filter(
  mine => mine.bomb === true
).length;

const gameReducer = (state, action) => {
  switch (action.type) {
    case "updateminefield":
      return { ...state, minefield: action.payload };
    case "setmines":
      return { ...state, mines: action.payload };
    case "setgameover":
      return { ...state, isGameOver: action.payload };
    case "setgamewon":
      return { ...state, isGameWon: action.payload };
    case "setflags":
      return { ...state, flags: action.payload };
    case "incrementflags":
      return { ...state, flags: state.flags + 1 };
    case "decrementflags":
      return { ...state, flags: state.flags - 1 };
    default:
      return state;
  }
};

export const GameContext = createContext();

export const GameProvider = props => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};
