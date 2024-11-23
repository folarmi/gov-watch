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
  UploadError,
  useCustomMutation,
  useUploadMutation,
} from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";

const CreateCountry = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(handleSuccess, handleError);
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  const createCountryMutation = useCustomMutation({
    endpoint: "Countries/CreateCountry",
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
      population: +data.population,
      gdp: +data.gdp,
      image: backendPath,
      Bloc: "NATO",
      createdBy: userId,
    };

    createCountryMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        Create A New Country
      </p>

      <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
        <div className="grid grid-cols-4 gap-x-4">
          <CustomInput
            label="Country Name"
            name="name"
            control={control}
            rules={{ required: "Country Name is required" }}
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
            className="mt-4 col-span-2"
          />

          <CustomInput
            label="GDP"
            name="gdp"
            type="number"
            control={control}
            rules={{ required: "GDP is required" }}
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
        </div>

        <div className="flex w-full justify-end mr-auto mt-4">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={
              uploadMutation.isPending || createCountryMutation.isPending
            }
            variant="tertiary"
          >
            Create Country
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCountry;