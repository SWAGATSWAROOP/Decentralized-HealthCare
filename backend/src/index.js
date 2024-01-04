import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectionDB from "./db/db.js";

connectionDB();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
