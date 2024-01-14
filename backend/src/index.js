import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectionDB from "./db/db.js";
import { app } from "./app.js";

const port = process.env.PORT || 5000;
connectionDB()
  .then(
    app.listen(port, () => {
      console.log(`Listening on port number ${port}`);
    })
  )
  .catch((err) => {
    console.log("Error in connecting To DB", err);
  });
