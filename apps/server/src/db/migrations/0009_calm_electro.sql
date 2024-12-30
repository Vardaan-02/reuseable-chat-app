ALTER TABLE "refresh_tokens" RENAME COLUMN "expires-at" TO "expires_at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "created-at" TO "created_at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "updated-at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "user-id" TO "user_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created-at" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated-at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is-active" TO "is_active";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "avatar-url" TO "avatar_url";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "last-login-at" TO "last_login_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email-verified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email-verification-otp" TO "email_verification_otp";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email-verification-expiry-date" TO "email_verification_expiry_date";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "number-of-failed-login-attempts" TO "number_of_failed_login_attempts";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "lockout-until" TO "lockout_until";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is-online" TO "is_online";--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user-id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;