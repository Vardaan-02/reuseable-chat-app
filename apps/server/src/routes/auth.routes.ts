import express from "express";
import { registerUser } from "../controllers/auth.controllers/register-user";
import {
  resetPasswordRateLimiter,
  sendOtpRateLimiter,
} from "../middleware/rate-limiter.middleware";
import { verifyEmailOTP } from "../controllers/auth.controllers/verify-email-otp";
import { sendEmailVerificationOTP } from "../controllers/auth.controllers/send-email-otp";
import { loginUser } from "../controllers/auth.controllers/login-user";
import { forgotPassword } from "../controllers/auth.controllers/forgot-password";
import { resetPassword } from "../controllers/auth.controllers/reset-password";
import { authMiddleware } from "../middleware/auth.middleware";
import { logout } from "../controllers/auth.controllers/logout-user";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email-otp", verifyEmailOTP);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", resetPasswordRateLimiter, forgotPassword);
router.post("/send-email-otp", sendOtpRateLimiter, sendEmailVerificationOTP);

router.post("/logout", authMiddleware, logout);
// router.get('/sessions', authenticateJWT, getActiveSessions);
// router.post('/sessions/:sessionId', authenticateJWT, logoutSpecificSession);
// router.post('/lock-account', authenticateJWT, lockAccount);
// router.post('/unlock-account', authenticateJWT, unlockAccount);

export default router;
