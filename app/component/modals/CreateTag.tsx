import React from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { useCustomMutation } from "@/app/hooks/apiCalls";

const CreateTag = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();

  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createTagMutation = useCustomMutation({
    endpoint: "Tags/CreateTag",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    const formData: any = {
      ...data,
      createdBy: userId,
    };

    createTagMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">Create New Tag</p>

      <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
        <div className="">
          <CustomInput
            label="Tag Name"
            name="name"
            control={control}
            rules={{ required: "Tag Name is required" }}
            className="mt-4"
          />
        </div>

        <div className="flex w-full justify-end mr-auto mt-4">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={createTagMutation.isPending}
            variant="tertiary"
          >
            Create Tag
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateTag;
