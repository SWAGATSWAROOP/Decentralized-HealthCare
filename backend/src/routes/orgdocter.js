import { Router } from "express";
import { upload } from "../middlewares/mutlerFileUpload.js";
import { loginOrg, registerOrg } from "../controller/orgdocter.js";

const router = Router();

// Route for registering the user
router
  .route("/register")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), registerOrg);

// secured Route
router.route("/login").post(loginOrg);

export default router;
