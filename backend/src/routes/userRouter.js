import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Router } from "express";
import {
  googleSignIn,
  logOutUser,
  loginUser,
  refreshAccesstoken,
  registeruser,
} from "../controller/user.controller.js";
import { Verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);

//googlesign in
router.get("/", (_, res) => {
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email%20phone&response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`
  );
});
router.route("/google-signin").get(googleSignIn);

//secured routes
router.route("/logout").post(Verifyjwt, logOutUser);
router.route("/refresh-token").post(refreshAccesstoken);

export default router;
