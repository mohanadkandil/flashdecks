import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [deckTitle, setDeckTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: deckTitle }),
    });
    setDeckTitle("");
  };
  return (
    <div className="App">
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={deckTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDeckTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
