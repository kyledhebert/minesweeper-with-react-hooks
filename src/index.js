import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { Game, GameProvider } from "./components";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
