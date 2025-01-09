import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import CustomButton from "../CustomButton";

type Prop = {
  toggleModal: () => void;
  moduleName: string;
  endpoint: string;
  id: string;
  queryKey: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ConfirmModuleDeletion = ({
  toggleModal,
  moduleName,
  endpoint,
  id,
  queryKey,
}: Prop) => {
  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const approveDeletionMutation = useCustomMutation({
    endpoint,
    method: "delete",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: [queryKey],
        exact: false,
      });
    },
  });

  const approveDeletionFunction = () => {
    const data: any = {
      id,
      userId,
    };

    approveDeletionMutation.mutate({ data });
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
      <p className="text-sm mb-4">
        Are you sure you want to delete this {moduleName}?
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
          loading={approveDeletionMutation.isPending}
          onClick={(e) => {
            e.preventDefault();
            approveDeletionFunction();
          }}
          className="w-fit"
        >
          Confirm
        </CustomButton>
      </form>
    </div>
  );
};

export default ConfirmModuleDeletion;
