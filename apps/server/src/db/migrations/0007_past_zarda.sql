ALTER TABLE "refresh_tokens" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "user-id" SET DATA TYPE uuid;