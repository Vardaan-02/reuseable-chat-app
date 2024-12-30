CREATE TABLE "refreshTokens" (
	"id" uuid PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"isActive" boolean DEFAULT true,
	"avatarUrl" varchar(255),
	"lastLoginAt" timestamp,
	"emailVerified" boolean DEFAULT false,
	"emailVerification_otp" varchar(6),
	"emailVerificationExpiryDate" timestamp,
	"numberOfFailedLoginAttempts" integer DEFAULT 0,
	"lockoutUntil" timestamp,
	"status" varchar(255),
	"isOnline" boolean DEFAULT false,
	"theme" varchar(20) DEFAULT 'light',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;