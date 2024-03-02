import ApiResponse from "../utils/APIresponse.js";
import { genearateOTP } from "../utils/OTP.js";
import { sendMail } from "../utils/nodemailer.js";
import { OrgDoc } from "../models/orgdocter.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { decodeHeader } from "../utils/deCodeToken.js";

// Verify genotp throught token

export const forgetPasswordUser = async (req, res) => {
  try {
    let email = req.body?.email;
    email = email.toLowerCase();
    const user = await OrgDoc.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "User doesnot Exist"));
    }
    const genOTP = genearateOTP();
    const hashedOTP = await bcrypt.hash(genOTP, 10);
    console.log(genOTP);
    // The token expires in 3 minute
    const token = jwt.sign(
      { genOTP: hashedOTP, userid: user._id },
      process.env.FORGOT_PASSWORD_SECRET,
      { expiresIn: "3m" }
    );

    const mail = await sendMail(email, genOTP);
    if (!mail) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Unable to sent mail"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { token }, "Mail received Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Access"));
    }

    const { genOTP, userid } = decodeHeader(token);

    console.log(genOTP, userid);
    const checkOTP = await bcrypt.compare(otp, genOTP);
    if (!checkOTP) {
      console.log("otp doesnot match");
      return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
    }

    const user = await OrgDoc.findById(userid);
    if (!user) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid User"));
    }

    user.password = password;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  }
};
