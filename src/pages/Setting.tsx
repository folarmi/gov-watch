/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import CustomInput from "../component/CustomInput";
import { useEffect, useState } from "react";
import CustomButton from "../component/CustomButton";
import Loader from "../component/Loader";
import CustomTextArea from "../component/CustomTextArea";
import {
  UploadError,
  useCustomMutation,
  useUploadMutation,
} from "../hooks/apiCalls";
import FileUploader from "../component/FileUploader";
import ImageDetails from "../component/ImageDetails";

const Setting = () => {
  const { userId, userObject } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      socialMediaLink: "",
      country: "",
      state: "",
    },
  });

  const [backendPath, setBackendPath] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const updateUserMutation = useCustomMutation({
    endpoint: "Users/UpdateUser",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      // window.location.reload();
    },
  });

  const submitForm = (data: any) => {
    const keysToDelete = [
      "statusCode",
      "remark",
      "totalCount",
      "skipToken",
      "validTo",
      "isSuccessful",
      "isStaff",
      "isActiveStaff",
      "userRole",
      "token",
      "isSubscribed",
      "subscriptionDate",
      "subscriptionExpirationDate",
      "isStaff",
      "isActiveStaff",
    ];

    keysToDelete.forEach((key) => {
      delete data[key];
    });

    const formData = {
      ...data,
      lastModifiedBy: userId,
      image: backendPath,
    };

    console.log(formData);
    updateUserMutation.mutate(formData);
  };

  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(handleSuccess, handleError);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  useEffect(() => {
    if (userObject) {
      reset(userObject);
    }
  }, [userObject, reset]);

  if (!userObject) {
    return <Loader />;
  }

  console.log(userObject);

  return (
    <SettingsLayout>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* <div className="absolute inset-0 flex justify-center">
          <div className="relative top-60 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div> */}

        <div>
          <CustomTextArea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={4}
            control={control}
            label="Bio"
            // onChange={(e) => setBio(e.target.value)}
            placeholder="Update your bio"
            name="bio"
          />
        </div>

        {/* <h3 className="font-bold text-lg mb-4">DETAILS</h3> */}
        <div className="space-y-4">
          <div className="flex items-center">
            <CustomInput
              className="mr-4"
              label="First Name"
              name="firstName"
              control={control}
            />
            <CustomInput label="Last Name" name="lastName" control={control} />
          </div>

          <div className="flex items-center">
            <CustomInput
              label="Email"
              className="mr-4"
              name="email"
              control={control}
              readOnly
            />
            <CustomInput
              label="Social Media Link"
              name="socialMediaLink"
              control={control}
            />
          </div>

          <div className="flex items-center">
            <CustomInput
              className="mr-4"
              label="Country"
              name="country"
              control={control}
            />
            <CustomInput
              label="State of Residence"
              name="state"
              control={control}
            />
          </div>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={handleFileUpload}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}

          <div className="w-1/4 ml-auto">
            <CustomButton
              type="submit"
              className="mt-4"
              disabled={updateUserMutation.isPending}
              loading={updateUserMutation.isPending}
            >
              Update Profile
            </CustomButton>
          </div>
        </div>
      </form>
    </SettingsLayout>
  );
};

export { Setting };
