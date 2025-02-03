/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { SettingsLayout } from "../layouts/SettingsLayout";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import { useCustomMutation } from "../hooks/apiCalls";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const ChangePassword = () => {
  const { control, handleSubmit } = useForm();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const changePasswordMutation = useCustomMutation({
    endpoint: "Authentication/UpdatePassword",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      // window.location.reload();
    },
  });

  const submitForm = (data: any) => {
    const formData = {
      ...data,
      email: userObject?.email,
      token: userObject?.token,
    };

    changePasswordMutation.mutate(formData);
  };
  return (
    <SettingsLayout>
      <form onSubmit={handleSubmit(submitForm)} className="w-full md:w-1/2">
        <CustomInput
          className="mr-4"
          label="Old Password"
          name="oldPassword"
          control={control}
          type="password"
        />
        <CustomInput
          className="mr-4"
          label="New Password"
          name="newPassword"
          control={control}
          type="password"
        />
        <CustomInput
          className="mr-4"
          label="Confirm New Password"
          name="confirmPassword"
          control={control}
          type="password"
        />

        <div className=" ml-auto">
          <CustomButton
            type="submit"
            className="mt-4"
            disabled={changePasswordMutation.isPending}
            loading={changePasswordMutation.isPending}
          >
            Change Password
          </CustomButton>
        </div>
      </form>
    </SettingsLayout>
  );
};

export { ChangePassword };
