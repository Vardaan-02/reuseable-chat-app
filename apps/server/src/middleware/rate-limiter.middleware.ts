import rateLimit from "express-rate-limit";

export const sendOtpRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many email verification attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const resetPasswordRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: "Too many reset password attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
