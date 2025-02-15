/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import FileUploader from "../FileUploader";
import CustomButton from "../CustomButton";
import CustomTextArea from "../CustomTextArea";
import { toast } from "react-toastify";
import ImageDetails from "../ImageDetails";
import {
  updateFileHandler,
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetImageDetails,
  useUploadMutation,
} from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useQueryClient } from "@tanstack/react-query";

const CreateCountry = ({ toggleModal, selectedCountry }: any) => {
  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const { data: imageDetails } = useGetImageDetails(selectedCountry);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const modifiedDefaultValues = {
    ...selectedCountry,
    population: Number(selectedCountry?.population?.replace(/,/g, "")),
    gdp: Number(selectedCountry?.gdp?.replace(/,/g, "")),
  };
  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
    toast.error("File upload failed. Please try again.");
  };

  console.log(imageDetails);

  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");
  const uploadMutation = useUploadMutation(undefined, handleError);

  const countryMutation = useCustomMutation({
    endpoint: selectedCountry
      ? `Countries/UpdateCountry`
      : "Countries/CreateCountry",
    method: selectedCountry ? "put" : "post",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetCountriesTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedCountry) {
        toast("Please upload a file first");
        return;
      }
      let uploadedFilePath;

      if (!selectedCountry && uploadedFile) {
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
        population: +data.population,
        gdp: +data.gdp,
      };

      // Handle image logic for edit mode
      if (selectedCountry) {
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
          formData.image = selectedCountry?.image;
        }
        // Add lastModifiedBy for edit actions
        formData.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.image = uploadedFilePath;
        formData.createdBy = userId;
      }

      await countryMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl">
        {selectedCountry ? "Edit Country" : "Create A New Country"}
      </p>

      <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
        <div className="grid grid-cols-4 gap-x-4">
          <CustomInput
            label="Country Name"
            name="name"
            control={control}
            required
            rules={{
              required: "Country Name is required",
              min: {
                value: 4,
                message: "Country name cannot be less than 4 letters",
              },
            }}
            className="mt-4"
          />

          <CustomInput
            label="Country Capital"
            name="capital"
            control={control}
            rules={{ required: "Country Capital is required" }}
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
            label="Currency"
            name="currency"
            control={control}
            rules={{ required: "Currency is required" }}
            className="mt-4"
          />

          <CustomInput
            label="Population"
            name="population"
            control={control}
            type="number"
            rules={{ required: "Population is required" }}
            className="mt-4"
          />

          <CustomInput
            label="GDP"
            name="gdp"
            type="number"
            control={control}
            rules={{ required: "GDP is required" }}
            className="mt-4"
          />
          <CustomInput
            label="Bloc"
            name="bloc"
            control={control}
            rules={{ required: "Bloc is required" }}
            className="mt-4 col-span-2"
          />

          <div className="col-span-2">
            <CustomTextArea name="bio" control={control} label="Bio" />
          </div>

          <div className="col-span-2">
            <p className="text-sm font-medium pb-2">Flag</p>
            <FileUploader
              maxSizeMB={1}
              acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
              onFileUpload={setUploadedFile}
              defaultFile={selectedCountry?.image}
            />
            {uploadedFile && (
              <ImageDetails
                fileName={uploadedFile?.name || "Existing File"}
                fileSize={uploadedFile?.size || 0}
              />
            )}
          </div>
        </div>

        <div className="flex w-full justify-end mr-auto mt-4">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={uploadMutation.isPending || countryMutation.isPending}
            variant="tertiary"
          >
            {selectedCountry ? "Update Country" : "Create Country"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCountry;
