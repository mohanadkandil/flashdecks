import { API_URL } from "./config";

export async function createDeck(title: string) {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return response.json();
}
