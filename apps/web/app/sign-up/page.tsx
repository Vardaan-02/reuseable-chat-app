"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ui/progress-bar";
import { UserInfo } from "@/app/types/sign-up-form";
import { useValidateEmail } from "@/hooks/use-sign-up";
import { useRouter } from "next/navigation";
import { UserInformation } from "./_components/user-information";
import { OTPVerification } from "./_components/otp-verification";
import Background from "@/components/ui/backgorund";

export default function SignupForm() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const handleNextStep = (data: UserInfo) => {
    setUserInfo(data);
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const { mutateAsync: validateEmail, isPending: validatingEmail } =
    useValidateEmail();

  const handleSubmit = async (otp: string) => {
    await validateEmail({ email: userInfo.email, otp });
    router.replace("/");
  };

  return (
    <>
      <Background />
      <div className="w-full max-w-md lg:max-w-lg mx-auto p-6 space-y-6 flex flex-col min-h-screen justify-center">
        <ProgressBar value={step - 1} />
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <UserInformation onNext={handleNextStep} initialData={userInfo} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OTPVerification
                onSubmit={handleSubmit}
                onPrev={handlePrevStep}
                email={userInfo.email}
                isPending={validatingEmail}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
