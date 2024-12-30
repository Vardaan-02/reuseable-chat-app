import { Request, Response } from "express";
import db from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { isValidEmail } from "../../validators/auth.validator";

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password, email, otp } = req.body;

  if (!email || !password || !otp) {
    res.status(400).json({ error: "Email ,OTP and New Password are required" });
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

    if (verifiedUser.reset_password_otp !== otp) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    if (new Date() > new Date(verifiedUser.reset_password_otp_expiry as Date)) {
      res
        .status(400)
        .json({ error: "Time for chaging the password has expired" });
      return;
    }

    const isSamePassword = await bcrypt.compare(
      password,
      verifiedUser.password
    );
    if (isSamePassword) {
      res
        .status(400)
        .json({ error: "New password cannot be the same as the old password" });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        email_verification_otp: null,
        reset_password_otp_expiry: null,
      })
      .where(eq(users.email, email));

    res.status(200).json({ message: "Password successfully updated" });
    return;
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: "An error occurred during password reset" });
    return;
  }
};
