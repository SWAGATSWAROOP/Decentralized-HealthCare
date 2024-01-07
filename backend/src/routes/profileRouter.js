import { Router } from "express";
import { Verifyjwt } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../controller/profile.controller.js";

const router = Router();

//Secured routes

//for getting data
router.route("/").get(Verifyjwt, getProfile);

//For updating data
router.route("/update").post(updateProfile);

//for changing password
router.route("/change-password").post(updatePassword);

export default router;
