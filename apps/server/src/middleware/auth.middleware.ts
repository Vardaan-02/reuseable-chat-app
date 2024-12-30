import { Request, Response, NextFunction } from "express";
import {
  generateRefreshToken,
  generateSessionToken,
  verifySessionToken,
} from "../utils/jwt";
import { verifyRefreshToken } from "../utils/jwt";
import { TokenPayload } from "../types/token.type";
import db from "../db";
import { refreshTokens } from "../db/schema";
import { eq } from "drizzle-orm";

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied, no token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifySessionToken(token);
    req.user = decoded as TokenPayload;
    return next();
  } catch (error) {
    console.log("Session token expired or invalid, checking refresh token...");

    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies);
    if (!refreshToken) {
      res
        .status(401)
        .json({ error: "Session expired and no refresh token found." });
      return;
    }

    try {
      const decodedRefreshToken: TokenPayload =
        verifyRefreshToken(refreshToken);

      const tokenRecord = await db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.token, refreshToken))
        .limit(1)
        .then((results) => results[0]);

      if (!tokenRecord) {
        res.status(401).json({ error: "Invalid refresh token." });
        return;
      }

      const newSessionToken = generateSessionToken(
        decodedRefreshToken.userId,
        decodedRefreshToken.email
      );

      const newRefreshToken = generateRefreshToken(
        decodedRefreshToken.userId,
        decodedRefreshToken.email
      );

      const newExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 1000);

      await db
        .update(refreshTokens)
        .set({ token: newRefreshToken, expires_at: newExpiryDate })
        .where(eq(refreshTokens.token, refreshToken));

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.setHeader("Authorization", `Bearer ${newSessionToken}`);

      req.user = decodedRefreshToken;
      return next();
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      res.status(401).json({ error: "Invalid or expired refresh token." });
      return;
    }
  }
};
