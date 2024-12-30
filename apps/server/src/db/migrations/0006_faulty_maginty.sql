ALTER TABLE "refresh_tokens" RENAME COLUMN "expires_at" TO "expires-at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "created_at" TO "created-at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "updated_at" TO "updated-at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "user_id" TO "user-id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "created-at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated_at" TO "updated-at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_active" TO "is-active";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "avatar_url" TO "avatar-url";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "last_login_at" TO "last-login-at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_verified" TO "email-verified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_verification_otp" TO "email-verification-otp";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_verification_expiry" TO "email-verification-expiry-date";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "failed_login_attempts" TO "number-of-failed-login-attempts";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "lockout_until" TO "lockout-until";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_online" TO "is-online";--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user-id_users_id_fk" FOREIGN KEY ("user-id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;