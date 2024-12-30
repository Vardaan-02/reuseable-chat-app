import { setUser, UserState } from "@/store/slices/user-slice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHandleLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.post(`${API_URL}/api/auth/login`, data, {
        withCredentials: true,
      });
      return response.data;
    },

    onSuccess: (data: { user: UserState }) => {
      dispatch(setUser(data.user));
      toast.success("Welcome");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    },
  });
};
