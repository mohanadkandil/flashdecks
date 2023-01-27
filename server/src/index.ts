import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  getDecksController,
  getDeckController,
  createDeckController,
  deleteDeckController,
  createCardForDeckController,
  deleteCardForDeckController,
} from "./controllers";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get("/decks", getDecksController);

app.get("/decks/:deckId", getDeckController);

app.post("/decks", createDeckController);

app.post("/decks/:deckId/cards", createCardForDeckController);

app.delete("/decks/:deckId", deleteDeckController);

app.delete("/decks/:deckId/cards/:index", deleteCardForDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
