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

const CreateState = ({ toggleModal }: any) => {
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

  const createStateMutation = useCustomMutation({
    endpoint: "States/CreateState",
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

    console.log(data);

    const formData: any = {
      ...data,
      image: backendPath,
      createdBy: userId,
      regionId: data?.regionId?.value,
    };

    createStateMutation.mutate(formData);
  };

  const { data: regionData, isLoading: regionDataIsLoading } = useGetData({
    url: "Regions/GetAllRegions",
    queryKey: ["GetAllCategories"],
  });

  const regionDataFormatted =
    regionData?.regionViewModel &&
    regionData?.regionViewModel.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">Create New State</p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="State Name"
          name="name"
          control={control}
          rules={{ required: "State Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="State Capital"
          name="capital"
          control={control}
          rules={{ required: "State Capital is required" }}
          className="mt-4"
        />

        <CustomInput
          label="State Governor"
          name="governor"
          control={control}
          rules={{ required: "State governor is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Political Party (Governor)"
          name="politicalPartyOfGovernor"
          control={control}
          rules={{ required: "State governor is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Population"
          name="Population"
          control={control}
          type="number"
          rules={{ required: "Population is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          control={control}
          rules={{ required: "Financial Allocation is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Land Mass"
          name="landMass"
          type="number"
          control={control}
          rules={{ required: "Land Mass is required" }}
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
          label="Country"
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          className="mt-4"
        />

        <CustomSelect
          name="regionId"
          options={regionDataFormatted}
          isLoading={regionDataIsLoading}
          label="Region"
          control={control}
          placeholder="Select Region"
          className="mt-4"
        />

        <CustomInput
          label="MDA Count"
          name="mdaCount"
          type="number"
          control={control}
          rules={{ required: "MDA Count is required" }}
          className="mt-4"
        />

        <CustomInput
          label="LGA Count"
          name="lgaCount"
          type="number"
          control={control}
          rules={{ required: "LGA Count is required" }}
          className="mt-4"
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
            loading={uploadMutation.isPending || createStateMutation.isPending}
            variant="tertiary"
          >
            Create State
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateState;
