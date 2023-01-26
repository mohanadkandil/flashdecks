import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the new app");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
