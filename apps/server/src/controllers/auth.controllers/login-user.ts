import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../../db";
import { users, refreshTokens } from "../../db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { generateRefreshToken, generateSessionToken } from "../../utils/jwt";

const TOKEN_EXPIRY =
  Number(process.env.TOKEN_EXPIRY) || 7 * 24 * 60 * 60 * 1000;

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1)
      .then((results) => results[0]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const sessionToken = generateSessionToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id, user.email);

    await db.transaction(async (trx) => {
      await db
        .delete(refreshTokens)
        .where(eq(refreshTokens.token, refreshToken));

      await db.delete(refreshTokens).where(eq(refreshTokens.user_id, user.id));

      await trx.insert(refreshTokens).values({
        id: uuidv4(),
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + TOKEN_EXPIRY),
      });
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: TOKEN_EXPIRY,
    });

    res.setHeader("Authorization", `Bearer ${sessionToken}`);

    res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        sessionToken,
        emailVerified: user.email_verified,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
