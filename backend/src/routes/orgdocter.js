import { Router } from "express";
import { upload } from "../middlewares/mutlerFileUpload.js";
import {
  logOut,
  loginOrg,
  refreshAccessToken,
  registerOrg,
  updateDetails,
  updatePassword,
} from "../controller/orgdocter.js";
import { verifyDoc } from "../middlewares/authDoc.middleware.js";
import { getProfileOrg } from "../controller/orgdocter.js";

const router = Router();

// Route for registering the user
router
  .route("/register")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), registerOrg);

// secured Route
router.route("/login").post(loginOrg);
router.route("/logout").post(verifyDoc, logOut);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/profile").get(getProfileOrg);
router.route("/update").post(updateDetails);
router.route("/updatepass").post(updatePassword);

export default router;
