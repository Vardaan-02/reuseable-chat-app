export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  avatar_url?: string;
  last_login_at?: Date;
  email_verified: boolean;
  email_verification_otp?: string;
  email_verification_otp_expiry?: Date;
  email_verification_time?: Date;
  reset_password_otp?: string;
  reset_password_otp_expiry?: Date;
  failed_login_attempts: number;
  lockout_until?: Date;
  status?: string;
  is_online: boolean;
  theme: "light" | "dark";
}
