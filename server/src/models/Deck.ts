import { Schema, ObjectId, model } from "mongoose";

const DeckSchema = new Schema({
  title: String,
  cards: [String],
});

const DeckModel = model("Deck", DeckSchema);

export default DeckModel;
