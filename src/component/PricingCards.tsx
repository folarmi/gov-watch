/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { dummyPlans } from "../data";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import CustomButton from "./CustomButton";
import { updateReferenceNumber } from "../lib/features/auth/paymentSlice";
import { useState } from "react";

type PricingCardProp = {
  planName: string;
  amount: string;
};

const PricingCard = ({ planName, amount }: PricingCardProp) => {
  const dispatch = useDispatch();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { referenceNumber } = useAppSelector(
    (state: RootState) => state.payment
  );

  const handleOpenNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const createPaymentMutation = useCustomMutation({
    endpoint: "Payments/CreatePayment",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,

    onSuccessCallback: (data) => {
      console.log(data?.paymentReferenceId);
      handleOpenNewTab(data?.checkoutUrl);
      dispatch(updateReferenceNumber(data?.paymentReferenceId));
    },
  });

  const {
    data: verifyPaymentData,
    isLoading,
    isSuccess,
  } = useGetData({
    url: `Payments/VerifyPayment?paymentReferenceNumber=${referenceNumber}&userId=${userId}&channel=paystack`,
    queryKey: ["VerifyPayment"],
    enabled: shouldFetch,
  });

  // React to query success
  if (isSuccess && verifyPaymentData) {
    setVerificationStatus(
      verifyPaymentData.success ? "Payment verified!" : "Verification failed."
    );
    dispatch(updateReferenceNumber(""));
    setShouldFetch(false);
  }

  const handleVerifyPayment = () => {
    setShouldFetch(true);
  };

  const submitForm = () => {
    const formData: any = {
      channel: "paystack",
      paymentService: "Bank Transfer",
      productName: planName,
      numberOfProductUnits: 1,
      numberOfStaffPaidFor: 0,
      isSubscriptionForAllStaff: null,
      staffUserId: null,
      beneficiaryEmailAddress: null,
      createdBy: userId,
    };

    createPaymentMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mr-8 mb-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {planName}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₦</span>
        <span className="text-5xl font-extrabold tracking-tight">{amount}</span>
        {/* <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span> */}
      </div>
      <ul role="list" className="space-y-5 my-7">
        {dummyPlans?.map(({ id, name, isActive }) => {
          return (
            <li
              className={`flex ${
                isActive ? "items-center" : "line-through decoration-gray-500"
              }`}
              key={id}
            >
              <svg
                className={`flex-shrink-0 w-4 h-4 ${
                  isActive ? "text-primary" : "text-gray-400"
                }"`}
                style={{
                  color: isActive ? "#008000" : "#9CA3AF",
                }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500  ms-3">
                {name}
              </span>
            </li>
          );
        })}
      </ul>

      <CustomButton
        type="button"
        onClick={() => submitForm()}
        loading={createPaymentMutation.isPending}
        disabled={createPaymentMutation.isPending}
        className="text-white bg-primary hover:bg-green_300 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </CustomButton>

      {referenceNumber !== "" && (
        <button
          onClick={() => handleVerifyPayment()}
          className={`mt-4 text-sm text-white bg-green_300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2 flex items-center justify-center ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "I've sent the money"
          )}
        </button>
      )}

      {verificationStatus && (
        <div className="mt-4 text-sm font-medium text-green-700">
          {verificationStatus}
        </div>
      )}
    </div>
  );
};

export default PricingCard;
