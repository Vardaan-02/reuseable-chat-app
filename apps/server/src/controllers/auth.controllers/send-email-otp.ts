import { Request, Response } from "express";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import db from "../../db";
import nodemailer from "nodemailer";
import { isValidEmail } from "../../validators/auth.validator";
import crypto from "crypto";

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "No Reply <noreply@gmail.com>",
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP for email verification is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

export const sendEmailVerificationOTP = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const verifiedUser = user[0];

    if (verifiedUser.email_verified) {
      res.status(400).json({ error: "Email is already verified" });
      return;
    }

    const otp = generateOTP();

    await db
      .update(users)
      .set({
        email_verification_otp: otp,
        email_verification_otp_expiry: new Date(Date.now() + 10 * 60 * 1000),
      })
      .where(eq(users.id, verifiedUser.id));

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "OTP sent. Please check your email to verify your account.",
    });
    return;
  } catch (error) {
    console.error("Error during OTP sending:", error);
    res.status(500).json({ error: "An error occurred while sending OTP" });
    return;
  }
};