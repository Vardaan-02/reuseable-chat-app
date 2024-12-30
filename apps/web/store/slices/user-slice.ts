import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string | null;
  email: string | null;
  sessionToken: string | null;
  emailVerified: boolean | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  sessionToken: null,
  emailVerified: null,
};

export const socketSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<UserState>) {
      return action.payload;
    },
    removeUser() {
      return {
        email: null,
        name: null,
        sessionToken: null,
        emailVerified: null,
      };
    },
  },
});

export const { setUser, removeUser } = socketSlice.actions;

export default socketSlice.reducer;
