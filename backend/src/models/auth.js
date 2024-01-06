import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import Mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

// User Schema for Authentication And user
const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Pre Hook for just executing the code before saving
// Passing next as the async function is a middle ware and a callback
//Not using arrow function as they have not access to this keyword
AuthSchema.pre("save", async function (next) {
  // we have to check if password is isModified then only encrypt/hash it else return
  if (!this.isModified("password")) return next();
  // Hashing or encrypting the password using bycrpt and also passing number of rounds
  this.password = await bycrpt.hash(this.password, 10);
  next();
});

// Adding custom methods by AuthSchema.method then . method name
// Checking password
AuthSchema.methods.isPasswordCorrect = async function (password) {
  // Checking the password
  return await bycrpt.compare(password, this.password);
};

//Creating another custom method for generating access and refresh refreshToken
//Doesnot take time but may take time depending upon use case so use async
AuthSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // Using algorith SHA256
      algorithm: "SH256",
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

AuthSchema.methods.generateRefreshToken = function () {
  // As the refresh token is regularly refreshed therefore payload is less
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      // Using algo RSA 256
      algorithm: "RS256",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = Mongoose.model("User", AuthSchema);
