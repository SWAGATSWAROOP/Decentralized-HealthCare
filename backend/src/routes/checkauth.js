import { Router } from "express";
import checkAuth from "../controller/check-auth.js";

const router = Router();

router.route("/check-auth").get(checkAuth);

export default router;
