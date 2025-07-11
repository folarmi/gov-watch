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
  updateFileHandler,
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useGetImageDetails,
  useUploadMutation,
} from "../hooks/apiCalls";
import FileUploader from "../component/FileUploader";
import ImageDetails from "../component/ImageDetails";
import { useQueryClient } from "@tanstack/react-query";
import { getAllCountryOptions, getUserInitials } from "../utils";
import CustomSelect from "../component/CustomSelect";
import { toast } from "react-toastify";

const Setting = () => {
  const queryClient = useQueryClient();
  const countryOptions = useMemo(() => getAllCountryOptions(), []);
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const { data: userObject, isLoading } = useGetData({
    url: `Users/GetUserById?publicId=${userId}`,
    queryKey: ["GetUserDetails", userId],
    enabled: !!userId,
  });

  const { data: imageDetails } = useGetImageDetails(userObject);

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

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

  const submitForm = async (data: any) => {
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
      image: userObject?.image,
    };

    try {
      let uploadedFilePath;

      if (uploadedFile && userObject?.image === "") {
        // Upload the new file
        uploadedFilePath = await uploadFile(
          uploadedFile,
          userId,
          uploadMutation
        );

        if (!uploadedFilePath) {
          toast.error("File upload failed.");
          return;
        }
      }

      // Handle existing user image
      if (userObject?.image) {
        if (uploadedFile) {
          // User has an existing image AND uploaded a new one → update
          const newFilePath = await updateFileHandler(
            uploadedFile,
            userId,
            imageDetails?.publicId,
            updateUploadMutation
          );
          formData.image = newFilePath;
        } else {
          // User has an existing image but didn’t upload a new one → reuse
          formData.image = userObject.image;
        }

        // Mark that the user updated their data
        formData.lastModifiedBy = userId;
      } else {
        // New user or no existing image
        formData.image = uploadedFilePath;
        formData.createdBy = userId;
      }

      // Submit the form
      await updateUserMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userObject) {
      reset(userObject);
    }
  }, [userObject, reset]);

  return (
    <SettingsLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <>
            {userObject?.image ? (
              <div className="flex items-center w-full justify-center rounded-full">
                <img
                  className=" w-20 h-20 rounded-full object-cover"
                  src={userObject?.image}
                  alt="User avatar"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold uppercase"
                  role="img"
                  aria-label="User initials"
                >
                  {getUserInitials(userObject, userType)}
                </div>
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
              onFileUpload={setUploadedFile}
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
