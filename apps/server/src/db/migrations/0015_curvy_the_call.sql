ALTER TABLE "refreshTokens" RENAME COLUMN "expiresAt" TO "expires_at";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "avatarUrl" TO "avatar_url";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "lastLoginAt" TO "last_login_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "emailVerification_otp" TO "email_verification_otp";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "emailVerificationExpiryDate" TO "email_verification_expiry";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "numberOfFailedLoginAttempts" TO "failed_login_attempts";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "lockoutUntil" TO "lockout_until";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "isOnline" TO "is_online";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;