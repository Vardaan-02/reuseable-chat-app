import { Request, Response } from "express";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import fs from "fs";
import db from "../../db";
import { isValidEmail } from "../../validators/auth.validator";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    let avatarUrl: string | null = null;
    if (req.file) {
      const localFilePath = req.file.path;

      const cloudinaryResult = await cloudinaryUpload(localFilePath);

      if (!cloudinaryResult || !cloudinaryResult.url) {
        fs.unlinkSync(localFilePath);
        res.status(500).json({ error: "Cloudinary upload failed" });
        return;
      }

      avatarUrl = cloudinaryResult.url;

      try {
        fs.unlinkSync(localFilePath);
      } catch (err) {
        console.error("Error deleting local file:", err);
      }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await db
        .insert(users)
        .values({
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
          avatar_url: avatarUrl,
        })
        .returning({
          id: users.id,
          name: users.name,
          email: users.email,
          avatar_url: users.avatar_url,
        });

      res.status(201).json({ user: newUser[0] });
      return;
    } catch (error) {
      console.error("Database insert error:", error);
      res.status(502).json({ error: "Database error, please try again later" });
      return;
    }
  } catch (error) {
    console.error("Unexpected error during registration:", error);
    res.status(500).json({
      error: "Registration failed, please try again later",
    });
    return;
  }
};
