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
  updateProfile,
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
router.route("/login").post(loginUser);

//googlesign in
router.get("/", (_, res) => {
  const scopes = [
    "openid",
    "profile",
    "email",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
  ];
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?scope=${scopes.join(
      "%20"
    )}&access_type=offline&response_type=code&client_id=${
      process.env.CLIENT_ID
    }&redirect_uri=${process.env.REDIRECT_URI}`
  );
});
router.route("/google-signin").get(googleSignIn);

// Forget Password
router.route("/forgetpass").get(forgetPasswordUser).post(verifyOtp);

//secured routes
router.route("/logout").post(Verifyjwt, logOutUser);
router.route("/refresh-token").post(refreshAccesstoken);

// Change Profile
router
  .route("/changephoto")
  .post(upload.fields([{ name: "profilephoto", maxCount: 1 }]), updateProfile);

// Remove Profile
router.route("/removeprofile").post(removephoto);

export default router;
