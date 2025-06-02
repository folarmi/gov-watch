/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { updateReferenceNumber } from "../lib/features/auth/paymentSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { directUserToPageOnLogin } from "../utils";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

type PricingCardProp = {
  selectedPlan?: string;
  title: string;
  price: string;
  frequency: string;
};

const PricingCard = ({
  selectedPlan,
  title,
  price,
  frequency,
}: PricingCardProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
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
      handleOpenNewTab(data?.checkoutUrl);
      dispatch(updateReferenceNumber(data?.paymentReferenceId));
    },
  });

  // Enable verification only if a reference exists (user initiated payment)
  useEffect(() => {
    if (referenceNumber) {
      setShouldFetch(true); // Enable API polling
    }
  }, [referenceNumber]);

  const { data: verifyPaymentData, isSuccess } = useGetData({
    url: `Payments/VerifyPayment?paymentReferenceNumber=${referenceNumber}&userId=${userId}&channel=paystack`,
    queryKey: ["VerifyPayment"],
    enabled: shouldFetch,
  });

  // Polling Effect: Re-check every 5 seconds if payment is not verified
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (shouldFetch) {
      interval = setInterval(() => {
        setShouldFetch(true); // Trigger API call
      }, 5000); // Check every 5 seconds
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [shouldFetch]);

  // React to query success
  useEffect(() => {
    if (isSuccess && verifyPaymentData) {
      if (verifyPaymentData.statusCode === 200) {
        if (referenceNumber !== "" && selectedPlan === title) {
          setVerificationStatus("Payment verified! ✅");
        }
        dispatch(updateReferenceNumber("")); // Clear reference after success
        setShouldFetch(false); // Stop polling
        navigate(directUserToPageOnLogin(userType));
      } else {
        if (referenceNumber !== "" && selectedPlan === title) {
          setVerificationStatus("Verification failed. ❌ Retrying...");
        }
      }
    }
  }, [
    isSuccess,
    verifyPaymentData,
    dispatch,
    referenceNumber,
    selectedPlan,
    title,
  ]);

  const submitForm = () => {
    const formData: any = {
      channel: "paystack",
      paymentService: "Bank Transfer",
      productName: title.replace(/\s+/g, ""),
      numberOfProductUnits: 1,
      numberOfStaffPaidFor: 0,
      isSubscriptionForAllStaff: null,
      staffUserId: null,
      beneficiaryEmailAddress: null,
      createdBy: userId,
    };

    if (!isAuthenticated) {
      toast.error("Please sign in to subscribe");
      return;
    }

    createPaymentMutation.mutate(formData);
  };

  return (
    // <div className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  mb-8 min-h-[460px]">
    //   <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
    //     {planName}
    //   </h5>
    //   <div className="flex items-baseline text-gray-900 dark:text-white">
    //     <span className="text-3xl font-semibold">₦</span>
    //     <span className="text-5xl font-extrabold tracking-tight">{amount}</span>
    //   </div>
    //   <ul role="list" className="space-y-5 my-7">
    //     {features.map(({ id, name, isActive }: any) => (
    //       <li
    //         key={id}
    //         className={`flex ${
    //           isActive ? "items-center" : "line-through decoration-gray-500"
    //         }`}
    //       >
    //         <svg
    //           className={`flex-shrink-0 w-4 h-4 ${
    //             isActive ? "text-primary" : "text-gray-400"
    //           }`}
    //           style={{
    //             color: isActive ? "#008000" : "#9CA3AF",
    //           }}
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //         >
    //           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    //         </svg>

    //         <span className="text-base font-normal leading-tight text-gray-500  ms-3">
    //           {name}
    //         </span>
    //       </li>
    //     ))}
    //   </ul>

    //   <CustomButton
    //     type="button"
    // onClick={() => submitForm()}
    // loading={createPaymentMutation.isPending}
    // disabled={createPaymentMutation.isPending}
    //     className="text-white bg-primary hover:bg-green_300 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
    //   >
    //     Choose plan
    //   </CustomButton>

    //   {verificationStatus && (
    //     <div className="mt-4 text-sm font-medium text-green-700">
    //       {verificationStatus}
    //     </div>
    //   )}
    // </div>
    <div className={`flex flex-col border rounded-xl p-6 shadow-sm bg-white `}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-2xl font-bold mt-2">{price}</div>
      <p className="text-sm text-gray-500 mb-4">{frequency}</p>

      <CustomButton
        type="button"
        className={`mt-auto py-2 px-4 rounded-md font-medium `}
        onClick={() => submitForm()}
        loading={createPaymentMutation.isPending}
        disabled={createPaymentMutation.isPending}
      >
        Buy Now
      </CustomButton>
    </div>
  );
};

export { PricingCard };
