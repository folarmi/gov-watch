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

export type CountryType = "Origin" | "Residence" | "Interest";

export interface AuthState {
  userType: UserType;
  userId: string;
  userCountry: string;
  userObject: any;
  countryType: "Origin" | "Residence" | "Interest" | "";
}

const initialState: AuthState = {
  userType: "",
  userId: "",
  userCountry: "",
  userObject: {},
  countryType: "",
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
    updateCountryType: (state, action: PayloadAction<CountryType>) => {
      state.countryType = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUserType,
  updateUserId,
  updateUserCountry,
  updateUserObject,
  updateCountryType,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
