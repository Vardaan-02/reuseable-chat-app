CREATE TABLE "refreshTokens" (
	"id" uuid PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isActive" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "avatarUrl" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastLoginAt" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerification_otp" varchar(6);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerificationExpiryDate" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "numberOfFailedLoginAttempts" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lockoutUntil" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "status" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isOnline" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "theme" varchar(20) DEFAULT 'light';--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");