import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck, deleteDeck, getDecks, TDeck } from "./api";
import "./App.css";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [deckTitle, setDeckTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(deckTitle);
    setDecks([...decks, deck]);
    setDeckTitle("");
  };

  const handleDeleteDick = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    const fetchDecks = async () => {
      const decks = await getDecks();
      setDecks(decks);
    };
    fetchDecks();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        <ul className="decks">
          {decks.map((deck) => {
            return (
              <li key={deck._id}>
                <button onClick={() => handleDeleteDick(deck._id)}>X</button>
                <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
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
    </div>
  );
}

export default App;
