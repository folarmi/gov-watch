/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import paymentSlice from "./features/auth/paymentSlice";

const appReducer = combineReducers({
  auth: authSlice,
  payment: paymentSlice,
});

const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
