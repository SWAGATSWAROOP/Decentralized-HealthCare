import jwt from "jsonwebtoken";

export const decodedJWT = (accessToken) =>
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
