/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { toast } from "react-toastify";
import CustomSelect from "../CustomSelect";
import ImageDetails from "../ImageDetails";
import CustomCheckBox from "../forms/CustomCheckBox";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import {
  UploadError,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";

const CreateMDA = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const queryClient = useQueryClient();

  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");
  const [isFederal, setIsFederal] = useState(false);
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

  const createMDAMutation = useCustomMutation({
    endpoint: "Mdas/CreateMda",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllMdasTable"],
        exact: false,
      });
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
      country: userCountry,
      isFederal,
      createdBy: userId,
    };

    createMDAMutation.mutate(formData);
  };

  const { data: categoryData, isLoading: categoryDataIsLoading } = useGetData({
    url: `Categories/GetAllCategories`,
    queryKey: ["GetAllCategories"],
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

  const categoryDataFormatted =
    categoryData?.categoryViewModel &&
    categoryData?.categoryViewModel?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.name,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">Create New MDA</p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="MDA Name"
          name="name"
          control={control}
          rules={{ required: "MDA Name is required" }}
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

        <CustomSelect
          name="state"
          options={stateDataFormatted}
          isLoading={stateDataIsLoading}
          label="State"
          control={control}
          placeholder="Select State"
          className="mt-4"
        />

        <CustomSelect
          name="category"
          options={categoryDataFormatted}
          isLoading={categoryDataIsLoading}
          label="Category"
          control={control}
          placeholder="Select Category"
          className="mt-4 col-span-2"
        />

        <div className="flex flex-col justify-center mt-3">
          <CustomCheckBox
            checked={isFederal}
            onChange={() => setIsFederal(!isFederal)}
            iflabel
            labelText="isFederal"
          />
        </div>

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
            loading={uploadMutation.isPending || createMDAMutation.isPending}
            variant="tertiary"
          >
            Create MDA
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateMDA;
