import dotenv from "dotenv";
dotenv.config();
import Mongoose from "mongoose";

const connectionDB = async () => {
  await Mongoose.connect(process.env.DB_URI)
    .then(console.log("Connection to DB sucessfull"))
    .catch((err) => {
      console.log("Error in connecting to DB ", err);
    });
};

export default connectionDB;
