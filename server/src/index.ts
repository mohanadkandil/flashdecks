import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";
import dotenv from "dotenv";
dotenv.config({ path: __dirname });
const app = express();
console.log(process.env.MONGO_URI);
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to the new app");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
