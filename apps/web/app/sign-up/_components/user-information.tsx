"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";
import { PasswordInput } from "@/components/ui/password-input";
import { UserInfo } from "@/app/types/sign-up-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  useGenerateOTPForEmailVarification,
  useHandleUserInformation,
} from "@/hooks/use-sign-up";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  profilePicture: z
    .any()
    .refine((file) => file instanceof File, "Profile picture is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .nullable(),
});

type UserInfoProps = {
  onNext: (data: UserInfo) => void;
  initialData: Partial<z.infer<typeof schema>>;
};

export function UserInformation({ onNext, initialData }: UserInfoProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const {
    mutateAsync: handleUserInformation,
    isPending: handlingUserInformation,
  } = useHandleUserInformation();

  const { mutateAsync: handleGenerateOTP, isPending: generationOTP } =
    useGenerateOTPForEmailVarification();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const validations = [/.{8,}/, /[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];

    for (const regex of validations) {
      if (!regex.test(password)) {
        console.error("Password does not meet the required criteria.");
        return;
      }
    }

    try {
      const newData = { ...data, password };
      await handleUserInformation(newData);
      await handleGenerateOTP(data.email);

      onNext(newData);
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-background">
      <h2 className="text-2xl font-bold mb-6">Step 1: User Information</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Vardaan" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="vardaanpahwa02@gamil.com" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <PasswordInput
            id="password"
            password={password}
            setPassword={setPassword}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          ></Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <Controller
          name="profilePicture"
          control={control}
          render={(
            { field: { onChange, value, ...field } } // eslint-disable-line
          ) => (
            <div className="flex items-center space-x-4">
              <div className="relative rounded-full bg-secondary aspect-square h-24">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                    onChange(e.target.files?.[0]);
                  }}
                  {...field}
                />
              </div>
            </div>
          )}
        />
        {errors.profilePicture && (
          <p className="text-red-500 text-sm">
            {errors.profilePicture.message as string}
          </p>
        )}
      </div>
      {generationOTP || handlingUserInformation ? (
        <Button disabled className="w-full">
          <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" variant={"success"} className={`w-full`}>
          Next
        </Button>
      )}
    </motion.form>
  );
}
