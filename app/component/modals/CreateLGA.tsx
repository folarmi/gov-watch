"use client";

import FileUploader from "@/app/component/FileUploader";
import React, { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { toast } from "react-toastify";
import {
  UploadError,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "@/app/hooks/apiCalls";
import CustomSelect from "../CustomSelect";
import ImageDetails from "../ImageDetails";

const CreateLGA = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");
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

  const createLGAMutation = useCustomMutation({
    endpoint: "Lgas/CreateLga",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    if (backendPath === "") {
      toast("Please upload a file first");
    }

    const formData: any = {
      ...data,
      image: backendPath,
      createdBy: userId,
      state: data?.regionId?.value,
    };

    createLGAMutation.mutate(formData);
  };

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: "States/GetAllStates",
    queryKey: ["GetAllStates"],
  });

  const stateDataFormatted =
    stateData?.stateViewModel &&
    stateData?.stateViewModel.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">Create New LGA</p>

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

        <CustomInput
          label="Date Founded"
          name="dateFounded"
          type="date"
          control={control}
          rules={{ required: "Date Founded is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Leader Name"
          name="leaderName"
          control={control}
          rules={{ required: "Leader Name is required" }}
          className="mt-4 col-span-2"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          control={control}
          rules={{ required: "Financial Allocation is required" }}
          className="mt-4 col-span-2"
        />

        <CustomSelect
          name="state"
          options={stateDataFormatted}
          isLoading={stateDataIsLoading}
          label="State"
          control={control}
          placeholder="Select State"
          className="mt-4 col-span-2"
        />

        <div className="col-span-2">
          <CustomTextArea name="bio" control={control} label="Bio" />
        </div>

        <div className="col-span-2 ">
          <p className="text-sm font-medium pb-2">Flag</p>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif"]}
            onFileUpload={handleFileUpload}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}
        </div>

        <div className="flex w-full justify-end mr-auto">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={uploadMutation.isPending || createLGAMutation.isPending}
            variant="tertiary"
          >
            Create LGA
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateLGA;
