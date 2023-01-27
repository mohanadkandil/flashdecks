import React, { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [deckTitle, setDeckTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: deckTitle }),
    });
    const deck = await response.json();
    setDecks([...decks, deck]);
    setDeckTitle("");
  };

  const handleDeleteDick = async (deckId: string) => {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await fetch("http://localhost:5000/decks");
      const decks = await response.json();
      setDecks(decks);
    };
    fetchDecks();
  }, []);
  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => {
          return (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDick(deck._id)}>X</button>
              {deck.title}
            </li>
          );
        })}
      </ul>
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
