import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  const { text } = req.body;

  if (!deck) return res.status(400).send("Deck with this id does not exist");

  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
