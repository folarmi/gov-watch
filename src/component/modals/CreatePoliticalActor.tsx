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
import { politicalLevelData } from "../../data";
import { useQueryClient } from "@tanstack/react-query";

const CreatePoliticalActor = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");
  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };
  const [isInPoliticalParty, setIsInPoliticalParty] = useState(false);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(handleSuccess, handleError);

  const { data: politicalActorData, isLoading: politicalActorDataIsLoading } =
    useGetData({
      url: `/PoliticalParties/GetListOfPoliticalParties?country=${userCountry}&pageNumber=1&pageSize=100`,
      queryKey: ["GetListOfLcdas"],
    });

  const politicalDataFormatted =
    politicalActorData &&
    politicalActorData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  const createWardMutation = useCustomMutation({
    endpoint: "PoliticalActors/CreatePoliticalActor",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllPoliticalActorsTable"],
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
      createdBy: userId,
    };

    createWardMutation.mutate(formData);
  };

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
        Create New Political Actor
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-2 gap-x-4 w-full"
      >
        <CustomInput
          label="Political Actor Name"
          name="name"
          control={control}
          rules={{ required: "Political Actor Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Date Of Birth"
          name="dateOfBirth"
          type="date"
          control={control}
          rules={{ required: "Date Of Birth is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Social Media Link"
          name="socialMediaLink"
          control={control}
          rules={{ required: "Social Media Link is required" }}
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

        <div
          className={`flex flex-col justify-center mt-3 ${
            isInPoliticalParty ? "col-span-1" : "col-span-2 "
          } mb-4`}
        >
          <CustomCheckBox
            checked={isInPoliticalParty}
            onChange={() => setIsInPoliticalParty(!isInPoliticalParty)}
            iflabel
            labelText="Is this political actor in a Political Party?"
            name="isInPoliticalParty"
          />
        </div>

        {isInPoliticalParty && (
          <CustomSelect
            name="currentPoliticalParty"
            options={politicalDataFormatted}
            isLoading={politicalActorDataIsLoading}
            label="Current Political Party"
            control={control}
            placeholder="Select Political Party"
            className="mt-4 col-span-2"
          />
        )}

        <CustomSelect
          name="level"
          options={politicalLevelData}
          label="Political Level"
          control={control}
          placeholder="Political level"
          className="mt-4 col-span-2"
        />

        <CustomTextArea name="bio" control={control} label="Bio" />

        <div className="">
          <p className="text-sm font-medium pb-2">Image</p>

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

        <div className="col-span-2">
          <CustomTextArea
            name="otherInformation"
            control={control}
            label="Other Information"
          />
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
            Create Political Actor
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePoliticalActor;
