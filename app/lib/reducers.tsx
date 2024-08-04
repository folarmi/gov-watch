import { Reducer, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer: Reducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
