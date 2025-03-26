import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MarkMessageAsResolved = ({ toggleModal, selectedMessage }: any) => {
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const resolveMessageMutation = useCustomMutation({
    endpoint: "ContactUsResponses/ResolveContactUs",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetContactUs"],
        exact: false,
      });
    },
  });
  console.log(selectedMessage);
  const resolveMessageFunction = () => {
    const data: any = {
      id: selectedMessage,
      resolvedBy: userId,
      isResolved: true,
    };

    resolveMessageMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Confirm Resolution
      </h2>
      <p className="text-sm mb-4">
        Are you sure you want to mark this message as resolved?
      </p>

      <form className="flex items-center">
        <CustomButton
          className="w-fit mr-8"
          variant="secondary"
          onClick={toggleModal}
        >
          Cancel
        </CustomButton>
        <CustomButton
          loading={resolveMessageMutation.isPending}
          onClick={(e) => {
            e.preventDefault();
            resolveMessageFunction();
          }}
          className="w-fit"
        >
          Confirm
        </CustomButton>
      </form>
    </div>
  );
};

export { MarkMessageAsResolved };
