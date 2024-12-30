import { Request, Response } from "express";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import db from "../../db";
import { isValidEmail } from "../../validators/auth.validator";

export const verifyEmailOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ error: "Email and OTP are required" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const verifiedUser = user[0];

    if (verifiedUser.email_verification_otp !== otp) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    if (
      new Date() > new Date(verifiedUser.email_verification_otp_expiry as Date)
    ) {
      res.status(400).json({ error: "OTP has expired" });
      return;
    }

    await db
      .update(users)
      .set({
        email_verified: true,
        email_verification_otp: null,
        email_verification_otp_expiry: null,
        email_verification_time: new Date(),
      })
      .where(eq(users.id, verifiedUser.id));

    res
      .status(200)
      .json({ message: "Email successfully verified. You can now log in." });
    return;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res
      .status(500)
      .json({ error: "An error occurred during OTP verification" });
    return;
  }
};
