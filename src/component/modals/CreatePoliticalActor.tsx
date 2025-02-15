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
  updateFileHandler,
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useGetImageDetails,
  useUploadMutation,
} from "../../hooks/apiCalls";
import FileUploader from "../FileUploader";
import { politicalLevelData } from "../../data";
import { useQueryClient } from "@tanstack/react-query";
// import { CustomDatePicker } from "../forms/CustomDatePicker";

const CreatePoliticalActor = ({ toggleModal, selectedPoliticalActor }: any) => {
  const modifiedDefaultValues = {
    ...selectedPoliticalActor,
    population: Number(
      selectedPoliticalActor?.population
        ? selectedPoliticalActor.population?.toString().replace(/,/g, "")
        : ""
    ),
    dateOfBirth: selectedPoliticalActor?.dateOfBirth
      ? new Date(selectedPoliticalActor?.dateOfBirth)
          .toISOString()
          .split("T")[0]
      : null,
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });

  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { data: imageDetails } = useGetImageDetails(selectedPoliticalActor);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isInPoliticalParty, setIsInPoliticalParty] = useState(false);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

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

  const createWardMutation = useCustomMutation({
    endpoint: selectedPoliticalActor
      ? "PoliticalActors/UpdatePoliticalActor"
      : "PoliticalActors/CreatePoliticalActor",
    successMessage: (data: any) => data?.remark,
    method: selectedPoliticalActor ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllPoliticalActorsTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedPoliticalActor) {
        toast("Please upload a file first");
        return;
      }

      let uploadedFilePath;

      if (!selectedPoliticalActor && uploadedFile) {
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

      if (selectedPoliticalActor) {
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
          formData.image = selectedPoliticalActor?.image;
        }

        // Add lastModifiedBy for edit actions
        formData.lastModifiedBy = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.image = uploadedFilePath;
        formData.createdBy = userId;
        formData.country = userCountry;
      }

      await createWardMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
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
    <div className="bg-white rounded-xl p-6 h-96 min-h-[600px] overflow-scroll">
      <p className="text-center font-medium text-xl font">
        {selectedPoliticalActor
          ? "Edit Political Actor"
          : "Create New Political Actor"}
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid grid-cols-2 gap-x-4 w-full"
      >
        {/* <CustomDatePicker /> */}
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
          // rules={{ required: "Social Media Link is required" }}
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
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={setUploadedFile}
            defaultFile={selectedPoliticalActor?.image}
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
            loading={
              uploadMutation.isPending ||
              createWardMutation.isPending ||
              updateUploadMutation.isPending
            }
            variant="tertiary"
          >
            {selectedPoliticalActor
              ? "Edit Political Actor"
              : "Create Political Actor"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePoliticalActor;
