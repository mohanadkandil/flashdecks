import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  getDecksController,
  createDeckController,
  deleteDeckController,
} from "./controllers";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get("/decks", getDecksController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckId", deleteDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
