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
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const CreateSenatorialDistrict = ({
  toggleModal,
  selectedSenatorialDistrict,
}: any) => {
  const modifiedDefaultValues = {
    ...selectedSenatorialDistrict,
    population: Number(
      selectedSenatorialDistrict?.population?.replace(/,/g, "")
    ),
    financialAllocation: Number(
      selectedSenatorialDistrict?.financialAllocation
        ? selectedSenatorialDistrict?.financialAllocation
            ?.toString()
            .replace(/,/g, "")
        : ""
    ),
    dateFounded: moment(selectedSenatorialDistrict?.dateFounded).format(
      "YYYY-MM-DD"
    ),
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();

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
    endpoint: selectedSenatorialDistrict
      ? `SenatorialDistricts/UpdateSenatorialDistrict`
      : "SenatorialDistricts/CreateSenatorialDistrict",
    successMessage: (data: any) => data?.remark,
    method: selectedSenatorialDistrict ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllSenatorialDistrictTable"],
        exact: false,
      });
    },
  });

  const submitForm = (data: any) => {
    if (backendPath === "" && !selectedSenatorialDistrict) {
      toast("Please upload a file first");
      return;
    }

    const formData: any = {
      ...data,
    };

    if (selectedSenatorialDistrict) {
      formData.lastModifiedBy = userId;
      formData.image = selectedSenatorialDistrict.image;
    } else {
      // formData.population = Number(data?.population?.replaceAll(",", "") || 0);
      formData.createdBy = userId;
      formData.image = backendPath;
    }

    createStateMutation.mutate(formData);
  };

  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: "Countries/GetListOfCountries",
    queryKey: ["GetListOfCountries"],
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
        {selectedSenatorialDistrict
          ? "Edit Senatorial District"
          : "Create New Senatorial District"}
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-4 gap-x-4 w-full"
      >
        <CustomInput
          label="Name"
          name="name"
          control={control}
          rules={{ required: "State Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Senator"
          name="senator"
          control={control}
          rules={{ required: "Senator is required" }}
          className="mt-4"
        />

        <CustomInput
          label="State"
          name="state"
          control={control}
          rules={{ required: "State is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Political Party (Senator)"
          name="politicalPartyOfSenator"
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
          label="Land Mass"
          name="landMass"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "Land Mass is required" }}
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

        <CustomInput
          label="Website"
          name="website"
          control={control}
          // rules={{ required: "State governor is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Ward Count"
          name="wardCount"
          type="number"
          onlyNumbers
          control={control}
          // rules={{ required: "MDA Count is required" }}
          className="mt-4"
        />

        <CustomInput
          label="LCDA Count"
          name="lcdaCount"
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
            acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
            onFileUpload={handleFileUpload}
            defaultFile={selectedSenatorialDistrict?.image}
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
            {selectedSenatorialDistrict
              ? "Update Senatorial District"
              : "Create Senatorial District"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export { CreateSenatorialDistrict };
