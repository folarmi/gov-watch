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
import moment from "moment";

const CreateSenatorialDistrict = ({
  toggleModal,
  selectedSenatorialDistrict,
}: any) => {
  const modifiedDefaultValues = {
    ...selectedSenatorialDistrict,
    population: Number(
      typeof selectedSenatorialDistrict.population === "string"
        ? selectedSenatorialDistrict?.population?.replace(/,/g, "")
        : selectedSenatorialDistrict?.population
    ),
    financialAllocation: Number(
      selectedSenatorialDistrict?.financialAllocation
        ? selectedSenatorialDistrict?.financialAllocation
            ?.toString()
            .replace(/,/g, "")
        : ""
    ),
    dateFounded: moment(selectedSenatorialDistrict?.dateFounded).format(
      "DD-MM-YYYY"
    ),
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();
  const { data: imageDetails } = useGetImageDetails(selectedSenatorialDistrict);

  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

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

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedSenatorialDistrict) {
        toast("Please upload a file first");
        return;
      }
      let uploadedFilePath;

      if (!selectedSenatorialDistrict && uploadedFile) {
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
      if (selectedSenatorialDistrict) {
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
          formData.image = selectedSenatorialDistrict?.image;
        }

        // Add lastModifiedBy for edit actions
        formData.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.image = uploadedFilePath;
        formData.createdBy = userId;
      }

      await createStateMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
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
            acceptFormats={["png", "jpeg", "jpg", "gif", "svg", "webp"]}
            onFileUpload={setUploadedFile}
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
            loading={
              uploadMutation.isPending ||
              createStateMutation.isPending ||
              updateUploadMutation.isPending
            }
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
