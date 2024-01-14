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
import { updateProfileOrg } from "../controller/updateProfilePhotoOrg.js";
import {
  forgetPasswordUser,
  verifyOtp,
} from "../controller/forgetpasswordOrg.js";

const router = Router();

// Route for registering the user
router
  .route("/register")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), registerOrg);

// forgetpass
router.route("/forgetpass").get(forgetPasswordUser).post(verifyOtp);

// secured Route
router.route("/login").post(loginOrg);
router.route("/logout").post(verifyDoc, logOut);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/profile").get(getProfileOrg);
router.route("/update").post(updateDetails);
router.route("/updatepass").post(updatePassword);
router
  .route("/updatephoto")
  .post(
    upload.fields([{ name: "profilephoto", maxCount: 1 }]),
    updateProfileOrg
  );

export default router;
