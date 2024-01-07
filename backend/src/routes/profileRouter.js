import { Router } from "express";
import { Verifyjwt } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controller/profile.controller.js";

const router = Router();

//Secured routes

//for getting data
router.route("/").get(Verifyjwt, getProfile);

//For updating data
router.route("/update").post();

export default router;
