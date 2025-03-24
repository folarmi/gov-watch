import { LucideX } from "lucide-react";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CreateNotification = ({ toggleModal, selectedLGA }: any) => {
  const { control, handleSubmit } = useForm();

  const submitForm = () => {};
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-end items-center">
        <p className="text-center font-medium text-xl font">
          {selectedLGA ? "Edit Notification" : "Create New Notification"}
        </p>
        <LucideX onClick={toggleModal} />
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="LGA Name"
          name="name"
          control={control}
          rules={{ required: "LGA Name is required" }}
          className="mt-4"
        />
      </form>
    </div>
  );
};

export { CreateNotification };
