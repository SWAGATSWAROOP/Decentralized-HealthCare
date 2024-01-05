import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
export const app = express();

// For cross origin connection
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Putting limit on how much data can be received
app.use(express.json({ limit: "1mb" }));

app.use(express.urlencoded({ extended: true, limit: "32kb" }));

// For Including static files like JS HTML and CSS and all
app.use(express.static("public"));

//For Handling Cookies
app.use(cookieParser());

//routes import
import userrouter from "./routes/userRouter.js";

// Routes Declaration
app.use("/user", userrouter);
