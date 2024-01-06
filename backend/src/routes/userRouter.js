import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registeruser,
} from "../controller/user.controller.js";
import { Verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(Verifyjwt, logOutUser);

export default router;
