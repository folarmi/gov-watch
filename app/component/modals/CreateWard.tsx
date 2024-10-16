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

const CreateWard = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");
  const [selectedState, setSelectedState] = useState("");
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

  const createWardMutation = useCustomMutation({
    endpoint: "Wards/CreateWard",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    if (backendPath === "") {
      toast("Please upload a file first");
      return;
    }

    const formData: any = {
      ...data,
      image: backendPath,
      createdBy: userId,
      // regionId: data?.regionId?.value,
    };

    createWardMutation.mutate(formData);
  };

  const { data: lgaData, isLoading: lgaDataIsLoading } = useGetData({
    url: `/Lgas/GetListOfLgas?stateName=${selectedState}&countryName=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLgas"],
    enabled: !!selectedState,
  });

  const lgaDataFormatted =
    lgaData &&
    lgaData.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: `States/GetListOfStates?countryName=${userCountry}&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllStates"],
  });

  const stateDataFormatted =
    stateData &&
    stateData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">Create New Ward</p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="Ward Name"
          name="name"
          control={control}
          rules={{ required: "Ward Name is required" }}
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
          label="Chairman"
          name="chairman"
          control={control}
          rules={{ required: "Chairman is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          onlyNumbers
          control={control}
          rules={{ required: "Financial Allocation is required" }}
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
          label="Political Party (Chairman)"
          name="politicalPartyOfChairman"
          control={control}
          rules={{ required: "Political Party of Chairman is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Population"
          name="Population"
          control={control}
          type="number"
          onlyNumbers
          rules={{ required: "Population is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Land Mass"
          name="landMass"
          type="number"
          onlyNumbers
          control={control}
          rules={{ required: "Land Mass is required" }}
          className="mt-4"
        />

        <CustomSelect
          name="state"
          options={stateDataFormatted}
          isLoading={stateDataIsLoading}
          label="State"
          control={control}
          placeholder="Select State"
          className="mt-4 col-span-2"
          customOnChange={(name: any) => setSelectedState(name?.value)}
        />

        <CustomSelect
          name="lga"
          options={lgaDataFormatted}
          isLoading={lgaDataIsLoading}
          label="LGA"
          control={control}
          placeholder="Select LGA"
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
            loading={uploadMutation.isPending || createWardMutation.isPending}
            variant="tertiary"
          >
            Create Ward
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateWard;
