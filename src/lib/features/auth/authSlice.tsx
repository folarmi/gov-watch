/* eslint-disable @typescript-eslint/no-explicit-any */
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
  userCountry: string;
  userObject: any;
}

const initialState: AuthState = {
  userType: "",
  userId: "",
  userCountry: "",
  userObject: {},
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
    updateUserCountry: (state, action: PayloadAction<string>) => {
      state.userCountry = action.payload;
    },
    updateUserObject: (state, action: PayloadAction<string>) => {
      state.userObject = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUserType,
  updateUserId,
  updateUserCountry,
  updateUserObject,
} = authSlice.actions;

export default authSlice.reducer;
