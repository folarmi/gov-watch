import { useCustomMutation } from "../../hooks/apiCalls";
import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CaveatModal = ({ toggleModal, userDetails }: any) => {
  const updateUserSubscriptionMutation = useCustomMutation({
    endpoint: "Users/UpdateUserSubscription",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      // window.location.reload();
    },
  });

  return (
    <div
      onClick={toggleModal}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4">
        Confirm Subscription Update
      </h2>
      <p className="text-sm mb-4">
        Are you sure you want to update this user's subscription? Please note
        that this action cannot be undone.
      </p>
      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
          onClick={toggleModal}
        >
          Cancel
        </button>
        {/* <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          // onClick={onConfirm}
        >
          Confirm
        </button> */}
        <CustomButton
          className="w-fit"
          loading={updateUserSubscriptionMutation.isPending}
          onClick={() => updateUserSubscriptionMutation.mutate(userDetails)}
          // onClick={() => {
          //   setIsDraft(true);
          //   onSubmit;
          // }}
        >
          Confirm
        </CustomButton>
      </div>
    </div>
  );
};

export { CaveatModal };
