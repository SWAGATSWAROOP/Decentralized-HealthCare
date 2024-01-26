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

//Putting a middleware to access URL
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

// For Including static files like JS HTML and CSS and all
app.use(express.static("public"));

//For Handling Cookies
app.use(cookieParser());

//routes import
import userrouter from "./routes/userRouter.js";
import profilerouter from "./routes/profileRouter.js";
import orgrouter from "./routes/orgdocter.js";
import checkAuth from "./routes/checkauth.js";
// Routes Declaration
app.get("/", (_, res) => {
  res.status(200).json({ working: "working" });
});
// user
app.use("/user", userrouter);

//profile
app.use("/profile", profilerouter);

//doc/org
app.use("/org", orgrouter);

// check-auth
app.use("/check", checkAuth);
