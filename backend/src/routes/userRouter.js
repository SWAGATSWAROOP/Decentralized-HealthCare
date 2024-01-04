import { Router } from "express";
import { registeruser } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registeruser);

export default router;
