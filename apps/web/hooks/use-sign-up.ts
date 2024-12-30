import { UserInfo } from "@/app/types/sign-up-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHandleUserInformation = () => {
  return useMutation({
    mutationFn: async (data: UserInfo) => {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Registration Completed");
    },
    onError: (error: { response: { data: { error: string } } }) => {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    },
  });
};

export const useGenerateOTPForEmailVarification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post(`${API_URL}/api/auth/send-email-otp`, {
        email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP Sent");
    },
    onError: (error: { response: { data: { error: string } } }) => {
      console.log(error.response?.data?.error);
      toast.error(error.response?.data?.error);
    },
  });
};

export const useValidateEmail = () => {
  return useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await axios.post(
        `${API_URL}/api/auth/verify-email-otp`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Email Verified");
    },
    onError: (error: { response: { data: { error: string } } }) => {
      console.log(error);
      toast.error(error.response?.data?.error);
    },
  });
};
