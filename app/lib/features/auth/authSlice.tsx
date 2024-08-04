import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserType =
  | "Editor"
  | "Admin"
  | "Contributor"
  | "User"
  | "Staff"
  | "Organization"
  | "";

export interface AuthState {
  userType: UserType;
  userId: string;
}

const initialState: AuthState = {
  userType: "",
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserType, updateUserId } = authSlice.actions;

export default authSlice.reducer;
