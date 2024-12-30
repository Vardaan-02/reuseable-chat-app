ALTER TABLE "refreshTokens" RENAME COLUMN "expires_at" TO "expiresAt";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "is_active" TO "isActive";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "avatar_url" TO "avatarUrl";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "last_login_at" TO "lastLoginAt";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "email_verified" TO "emailVerified";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "email_verification_otp" TO "emailVerification_otp";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "email_verification_expiry_date" TO "emailVerificationExpiryDate";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "number_of_failed_login_attempts" TO "numberOfFailedLoginAttempts";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "lockout_until" TO "lockoutUntil";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "is_online" TO "isOnline";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;