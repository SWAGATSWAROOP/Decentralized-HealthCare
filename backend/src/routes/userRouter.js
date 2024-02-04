import { Router } from "express";
import {
  googleSignIn,
  logOutUser,
  loginUser,
  refreshAccesstoken,
  registeruser,
} from "../controller/user.controller.js";
import { Verifyjwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/mutlerFileUpload.js";
import {
  removephoto,
  updateUserProfilePhoto,
} from "../controller/updateUserProfilePhoto.js";
import {
  forgetPasswordUser,
  verifyOtp,
} from "../controller/forgetpasswordUser.js";

const router = Router();

// Uploading profile photo
router
  .route("/register")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), registeruser);

// User login
router.route("/login").post(loginUser);

//googlesign in
router.route("/google-signin").post(googleSignIn);

// Forget Password
router.route("/forgetpass").post(forgetPasswordUser);
router.route("/submitotp").post(verifyOtp);

//secured routes
router.route("/logout").post(Verifyjwt, logOutUser);
router.route("/refresh-token").post(refreshAccesstoken);

// Change Profile
router
  .route("/changephoto")
  .post(
    upload.fields([{ name: "profilephoto", maxCount: 1 }]),
    updateUserProfilePhoto
  );

// Remove Profile
router.route("/removeprofile").post(removephoto);

export default router;
