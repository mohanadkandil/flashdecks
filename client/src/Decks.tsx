import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createDeck,
  createCard,
  deleteDeck,
  getDeck,
  getDecks,
  TDeck,
  deleteCard,
} from "./api";

import "./Deck.css";

export default function Decks() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  };

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  };

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => {
          return (
            <li key={index}>
              <button onClick={() => handleDeleteCard(index)}>X</button>
              {card}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-text">Card Text</label>
        <input
          id="deck-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
