ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "avatar_url";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "last_login_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email_verified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email_verification_otp";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "email_verification_expiry";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "failed_login_attempts";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "lockout_until";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "is_online";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "theme";