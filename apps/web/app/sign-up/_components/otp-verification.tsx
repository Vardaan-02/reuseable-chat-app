"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ReloadIcon } from "@radix-ui/react-icons";

type OTPVerificationProps = {
  onSubmit: (otp: string) => void;
  onPrev: () => void;
  email: string;
  isPending: boolean;
};

export function OTPVerification({
  onSubmit,
  onPrev,
  email,
  isPending,
}: OTPVerificationProps) {
  const [resendTimer, setResendTimer] = useState(30);
  const otp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResend = () => {
    // Here you would typically call an API to resend the OTP
    console.log("Resending OTP");
    setResendTimer(30);
  };

  return (
    <motion.form className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: OTP Verification</h2>
      <p className="text-sm text-gray-600 mb-4">
        We&apos;ve sent a verification code to your email ({email}). Please
        enter it below.
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp">One-time Passcode</Label>
        <InputOTP maxLength={6} id={"otp"} ref={otp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="ghost" onClick={onPrev}>
          Edit Email
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
        </Button>
      </div>
      {isPending ? (
        <Button disabled className="w-full">
          <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
          Please wait
        </Button>
      ) : (
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(otp.current?.value as string);
          }}
        >
          Verify
        </Button>
      )}
    </motion.form>
  );
}
