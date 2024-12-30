import { removeUser } from "@/store/slices/user-slice";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHandleLogout = () => {
  const { sessionToken } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Logged Out");
      dispatch(removeUser());
    },
    onError: (error: { response: { data: { error: string } } }) => {
      toast.error(error.response.data.error);
    },
  });
};
