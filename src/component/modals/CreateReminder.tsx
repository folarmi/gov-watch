/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import { LucideX } from "lucide-react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { convertToISOString } from "../../utils";
import { useNavigate } from "react-router-dom";

const CreateReminder = ({
  toggleModal,
  publicationPublicId,
  publicationTitle,
}: any) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createReminderMutation = useCustomMutation({
    endpoint: "Reminders/CreateReminder",
    // successMessage: (data: any) => data?.remark,
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["CreateReminder"],
        exact: false,
      });
    },
  });

  const submitForm = (data: any) => {
    const payload = {
      publicationPublicId,
      publicationTitle,
      comment: data.comment,
      createdBy: userId,
      dueDate: convertToISOString(data.dueDate),
    };

    createReminderMutation.mutate(payload);
  };
  return (
    <div className="bg-white rounded-xl w-[500px] p-6">
      <div className="flex justify-center">
        <p className="text-center font-medium text-xl pr-2">Create Reminder</p>
        <LucideX className="cursor-pointer" onClick={toggleModal} />
      </div>
      <form className="mt-4" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Reminder Date"
          name="dueDate"
          type="date"
          control={control}
          rules={{ required: "Date Founded is required" }}
          className="mt-4"
          min={
            new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0]
          }
        />
        <CustomTextArea name="comment" control={control} label="Comment" />

        <CustomButton
          loading={createReminderMutation.isPending}
          className="w-full mt-4"
          variant="tertiary"
        >
          Remind me
        </CustomButton>
      </form>
    </div>
  );
};

export { CreateReminder };
