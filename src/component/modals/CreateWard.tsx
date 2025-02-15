/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";

import { toast } from "react-toastify";

import CustomSelect from "../CustomSelect";
import ImageDetails from "../ImageDetails";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import {
  updateFileHandler,
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useGetImageDetails,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";

const CreateWard = ({ toggleModal, selectedWard }: any) => {
  const modifiedDefaultValues = {
    ...selectedWard,
    population: Number(
      selectedWard?.population
        ? selectedWard?.population.toString().replace(/,/g, "")
        : ""
    ),
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();
  const { data: imageDetails } = useGetImageDetails(selectedWard);

  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState("");

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

  const createWardMutation = useCustomMutation({
    endpoint: selectedWard ? `Wards/UpdateWard` : "Wards/CreateWard",
    successMessage: (data: any) => data?.remark,
    method: selectedWard ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllWardsTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedWard) {
        toast("Please upload a file first");
        return;
      }

      let uploadedFilePath;

      if (!selectedWard && uploadedFile) {
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
      };

      // Handle image logic for edit mode
      if (selectedWard) {
        if (uploadedFile) {
          // If a new file is uploaded during edit, update the file and use the new path
          const newFilePath = await updateFileHandler(
            uploadedFile,
            userId,
            imageDetails?.publicId,
            updateUploadMutation
          );
          formData.image = newFilePath;
        } else {
          // If no new file is uploaded, use the existing image from selectedLGA
          formData.image = selectedWard?.image;
        }

        // Add lastModifiedBy for edit actions
        formData.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.image = uploadedFilePath;
        formData.regionId = data?.regionId?.value;
        formData.createdBy = userId;
      }

      // if (selectedWard) {
      //   formData.lastModifiedBy = userId;
      //   formData.image = selectedWard.image;
      // } else {
      //   // formData.population = Number(data.population.replace(/,/g, ""));
      //   formData.createdBy = userId;
      //   formData.regionId = data?.regionId?.value;
      //   formData.image = uploadedFilePath;
      // }

      createWardMutation.mutate(formData);
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
      <p className="text-center font-medium text-xl font">
        {selectedWard ? "Edit Ward" : "Create New Ward"}
      </p>

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
          name="population"
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
            defaultFile={selectedWard?.image}
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
            loading={
              uploadMutation.isPending ||
              createWardMutation.isPending ||
              updateUploadMutation.isPending
            }
            variant="tertiary"
          >
            {selectedWard ? "Edit Ward" : "Create Ward"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateWard;
