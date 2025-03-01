/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import FileUploader from "@/app/component/FileUploader";
import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { toast } from "react-toastify";
import ImageDetails from "../ImageDetails";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import {
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import CustomSelect from "../CustomSelect";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";

const CreateLCDA = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState("");

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);

  const createLCDAMutation = useCustomMutation({
    endpoint: "Lcdas/CreateLcda",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllLcdasTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile) {
        toast("Please upload a file first");
        return;
      }

      let uploadedFilePath;

      if (uploadedFile) {
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

      const formData: any = {
        ...data,
        image: uploadedFilePath,
        createdBy: userId,
        regionId: data?.regionId?.value,
      };

      createLCDAMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: lgaData, isLoading: lgaDataIsLoading } = useGetData({
    url: `/Lgas/GetListOfLgas?stateName=${selectedState}&country=${userCountry}&pageNumber=1&pageSize=100`,
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
    url: `States/GetListOfStates?country=${userCountry}&pageNumber=1&pageSize=10`,
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
      <p className="text-center font-medium text-xl font">Create LCDA</p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="LCDA Name"
          name="name"
          control={control}
          rules={{ required: "LCDA Name is required" }}
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
          label="Land Mass(km squared)"
          name="landMass"
          type="number"
          onlyNumbers
          control={control}
          rules={{ required: "Land Mass(km squared) is required" }}
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
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={setUploadedFile}
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
            loading={uploadMutation.isPending || createLCDAMutation.isPending}
            variant="tertiary"
          >
            Create LCDA
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateLCDA;
