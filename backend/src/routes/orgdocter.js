import { Router } from "express";
import { upload } from "../middlewares/mutlerFileUpload.js";
import { registerOrg } from "../controller/orgdocter.js";

const router = Router();

// Route for registering the user
router
  .route("/register")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), registerOrg);

router.route("/login");

export default router;
