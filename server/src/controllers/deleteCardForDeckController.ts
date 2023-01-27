import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardForDeckController(req: Request, res: Response) {
  const { deckId, index } = req.params;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("Deck not found");
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
