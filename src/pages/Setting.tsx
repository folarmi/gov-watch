/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import CustomInput from "../component/CustomInput";
import { useEffect, useMemo, useState } from "react";
import CustomButton from "../component/CustomButton";
import Loader from "../component/Loader";
import CustomTextArea from "../component/CustomTextArea";
import {
  UploadError,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../hooks/apiCalls";
import FileUploader from "../component/FileUploader";
import ImageDetails from "../component/ImageDetails";
import { useQueryClient } from "@tanstack/react-query";
import { getAllCountryOptions, getUserInitials } from "../utils";
import CustomSelect from "../component/CustomSelect";

const Setting = () => {
  const queryClient = useQueryClient();
  const countryOptions = useMemo(() => getAllCountryOptions(), []);

  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const { data: userObject, isLoading } = useGetData({
    url: `Users/GetUserById?publicId=${userId}`,
    queryKey: ["GetUserDetails"],
  });

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
      queryClient.invalidateQueries({
        queryKey: ["GetUserDetails"],
        exact: false,
      });
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
      image: backendPath || userObject?.image,
    };

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

  // const handleSelectedType = (item: CountryType) => {
  //   dispatch(updateCountryType(item));
  // };

  return (
    <SettingsLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <>
            {userObject?.image !== null ? (
              <div className="flex items-center w-full justify-center rounded-full">
                <img
                  className=" w-20 h-20 rounded-full object-cover"
                  src={userObject?.image}
                  alt="User avatar"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="font-medium text-white uppercase">
                  {getUserInitials(userObject, userType)}
                </span>
              </div>
            )}
          </>
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
              <CustomInput
                label="Last Name"
                name="lastName"
                control={control}
              />
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

            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Country Type
              </label>
              <div className="flex gap-x-2">
                {["Origin", "Residence", "Interest"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 rounded-full border text-sm ${
                      countryType === type
                        ? "bg-green-600 text-white"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    // onClick={() => handleSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="flex items-center gap-x-4">
              <CustomSelect
                options={countryOptions}
                placeholder="Select country"
                label="Country of origin"
                name="countryOfOrigin"
                control={control}
                isDisabled
              />
              <CustomSelect
                options={countryOptions}
                placeholder="Select country"
                label="Country of Residence"
                name="countryOfResidence"
                control={control}
              />
              <CustomSelect
                options={countryOptions}
                placeholder="Select country"
                label="Country of Interest"
                name="countryOfInterest"
                control={control}
              />
            </div>

            <FileUploader
              maxSizeMB={1}
              acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
              onFileUpload={handleFileUpload}
              defaultFile={userObject?.image}
            />
            {uploadedFile && (
              <ImageDetails
                fileName={uploadedFile.name}
                fileSize={uploadedFile.size}
              />
            )}

            <div className="w-full md:w-1/4 ml-auto">
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
      )}
    </SettingsLayout>
  );
};

export { Setting };
