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
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const CreateState = ({ toggleModal, selectedState }: any) => {
  const queryClient = useQueryClient();

  const modifiedDefaultValues = {
    ...selectedState,
    population: Number(selectedState?.population?.replace(/,/g, "")),
    financialAllocation: Number(
      selectedState?.financialAllocation
        ? selectedState?.financialAllocation?.toString().replace(/,/g, "")
        : ""
    ),
    dateFounded: moment(selectedState?.dateFounded).format("DD-MM-YYYY"),
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });

  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);

  const createStateMutation = useCustomMutation({
    endpoint: selectedState ? `States/UpdateState` : "States/CreateState",
    successMessage: (data: any) => data?.remark,
    method: selectedState ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllStatesTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedState) {
        toast("Please upload a file first");
        return;
      }

      let uploadedFilePath;

      const formData: any = {
        ...data,
      };

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

      if (selectedState) {
        formData.lastModifiedBy = userId;
        formData.image = selectedState.image;
      } else {
        // formData.population = Number(data?.population?.replaceAll(",", "") || 0);
        formData.createdBy = userId;
        formData.image = uploadedFilePath;
      }

      createStateMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const { data: regionData, isLoading: regionDataIsLoading } = useGetData({
    url: "Regions/GetAllRegions",
    queryKey: ["GetAllRegions"],
  });

  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: "Countries/GetListOfCountries",
    queryKey: ["GetListOfCountries"],
  });

  const regionDataFormatted =
    regionData?.regionViewModel &&
    regionData?.regionViewModel.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });

  const countriesDataFormatted =
    countryData &&
    countryData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        {selectedState ? "Edit State" : "Create New State"}
      </p>

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
          // rules={{ required: "State governor is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Population"
          name="population"
          control={control}
          type="number"
          onlyNumbers
          // rules={{ required: "Population is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Financial Allocation"
          name="financialAllocation"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Financial Allocation is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Land Mass(km squared)"
          name="landMass"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Land Mass(km squared) is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Date Founded"
          name="dateFounded"
          type="date"
          control={control}
          // rules={{ required: "Date Founded is required" }}
          className="mt-4"
        />

        <CustomSelect
          name="country"
          options={countriesDataFormatted}
          isLoading={countryDataIsLoading}
          label="Country"
          control={control}
          placeholder="Select Country"
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
          onlyNumbers
          control={control}
          // rules={{ required: "MDA Count is required" }}
          className="mt-4"
        />

        <CustomInput
          label="LGA Count"
          name="lgaCount"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "LGA Count is required" }}
          className="mt-4"
        />

        <div className="col-span-2">
          <CustomTextArea name="bio" control={control} label="Bio" />
        </div>

        <div className="col-span-2 ">
          <p className="text-sm font-medium pb-2">Flag</p>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "svg", "webp"]}
            onFileUpload={setUploadedFile}
            defaultFile={selectedState?.image}
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
            {selectedState ? "Update State" : "Create State"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateState;
