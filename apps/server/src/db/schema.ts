import {
  pgTable,
  varchar,
  integer,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  is_active: boolean("is_active").default(true),
  avatar_url: varchar("avatar_url", { length: 255 }),
  last_login_at: timestamp("last_login_at"),
  email_verified: boolean("email_verified").default(false),
  email_verification_otp: varchar("email_verification_otp", { length: 6 }),
  email_verification_otp_expiry: timestamp("email_verification_expiry_otp_date"),
  email_verification_time: timestamp("email_verificaiton_time"),
  reset_password_otp: varchar("reset_password_otp", { length: 6 }),
  reset_password_otp_expiry: timestamp("reset_password_otp_expiry"),
  failed_login_attempts: integer("number_of_failed_login_attempts").default(0),
  lockout_until: timestamp("lockout_until"),
  status: varchar("status", { length: 255 }),
  is_online: boolean("is_online").default(false),
  theme: varchar("theme", { length: 20 }).default("light"),
});

export const refreshTokens = pgTable("refresh-tokens", {
  id: uuid("id").primaryKey(),
  token: varchar({ length: 255 }).notNull(),
  expires_at: timestamp("expires_at").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => {
  return {
    refreshTokens: many(refreshTokens),
  };
});

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => {
  return {
    user: one(users, {
      fields: [refreshTokens.user_id],
      references: [users.id],
    }),
  };
});
