import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { refreshTokens } from "../../db/schema";
import db from "../../db";

export const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(400).json({ error: "No refresh token found." });
    return;
  }

  try {
    await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshToken));

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
