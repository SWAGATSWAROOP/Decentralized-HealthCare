import ApiResponse from "../utils/APIresponse.js";
import { genearateOTP } from "../utils/OTP.js";
import { sendMail } from "../utils/nodemailer.js";
import { OrgDoc } from "../models/orgdocter.js";

// Global variables for changing values
let genOTP;
let user;

// ToDo OTP time increase

// Time for OTP validation
const resetOTP = () => (genOTP = undefined);

export const forgetPasswordUser = async (req, res) => {
  try {
    let email = req.body?.email;
    email = email.toLowerCase();
    user = await OrgDoc.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "User doesnot Exist"));
    }
    genOTP = genearateOTP();
    // To reset otp
    setTimeout(() => resetOTP(), 60000);

    const mail = await sendMail(email, genOTP);
    if (!mail) {
      genOTP = undefined;
      user = undefined;
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Unable to sent mail"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Mail received Successfully"));
  } catch (error) {
    genOTP = undefined;
    user = undefined;
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, password } = req.body;
    console.log(genOTP);
    if (otp != genOTP) {
      console.log("otp doesnot match");
      return res.status(400).json(new ApiResponse(400, {}, "Invalid OTP"));
    }
    user.password = password;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Updated Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Unable to verify"));
  } finally {
    // Clearing values
    genOTP = undefined;
    user = undefined;
  }
};