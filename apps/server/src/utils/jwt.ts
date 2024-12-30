import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/token.type";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY as string;

export const generateSessionToken = (userId: string, email: string) => {
  const payload = { userId, email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string, email: string) => {
  const payload = { userId, email };
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

export const verifySessionToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    return decoded as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired session token");
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET_KEY);
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    return decoded as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
