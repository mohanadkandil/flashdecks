import { TDeck } from "./getDecks";

export async function createCard(deckId: string, text: string): Promise<TDeck> {
  const response = await fetch(`http://localhost:5000/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
