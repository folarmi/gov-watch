import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
  referenceNumber: string;
  checkoutUrl: string;
}

const initialState: PaymentState = {
  checkoutUrl: "",
  referenceNumber: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateCheckoutUrl: (state, action: PayloadAction<string>) => {
      state.checkoutUrl = action.payload;
    },
    updateReferenceNumber: (state, action: PayloadAction<string>) => {
      state.referenceNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCheckoutUrl, updateReferenceNumber } =
  paymentSlice.actions;

export default paymentSlice.reducer;
