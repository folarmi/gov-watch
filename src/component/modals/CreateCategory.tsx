/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import CustomButton from "../CustomButton";
import CloseButton from "../forms/CloseButton";
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

const CreateCategory = ({ toggleModal, selectedCategory }: any) => {
  const modifiedDefaultValues = {
    ...selectedCategory,
    population: Number(
      selectedCategory?.population
        ? selectedCategory.population.toString().replace(/,/g, "")
        : ""
    ),
    dateOfBirth: selectedCategory?.dateOfBirth
      ? new Date(selectedCategory?.dateOfBirth).toISOString().split("T")[0]
      : null,
  };

  const { data: imageDetails } = useGetImageDetails(selectedCategory);

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(undefined, handleError);
  const updateUploadMutation = useUploadMutation(undefined, handleError, "put");

  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const createCategoryMutation = useCustomMutation({
    endpoint: selectedCategory
      ? "Categories/UpdateCategory"
      : "Categories/CreateCategory",
    successMessage: (data: any) => data?.remark,
    method: selectedCategory ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllCategoriesTable"],
        exact: false,
      });
    },
  });

  const submitForm = async (data: any) => {
    try {
      if (!uploadedFile && !selectedCategory) {
        toast("Please upload a file first");
      }

      let uploadedFilePath;

      // If there's a new file selected, upload it first
      if (!selectedCategory && uploadedFile) {
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
        name: data?.name,
      };

      if (selectedCategory) {
        if (uploadedFile) {
          // If a new file is uploaded during edit, update the file and use the new path
          const newFilePath = await updateFileHandler(
            uploadedFile,
            userId,
            imageDetails?.publicId,
            updateUploadMutation
          );
          formData.categoryImage = newFilePath;
        } else {
          // If no new file is uploaded, use the existing image from selectedLGA
          formData.categoryImage = selectedCategory?.image;
          formData.id = selectedCategory?.id;
        }

        // Add lastModifiedBy for edit actions
        formData.userId = userId;
      } else {
        // For create actions, use the uploaded file path
        formData.image = uploadedFilePath;
        formData.userId = userId;
        formData.name = data?.name;
      }
      await createCategoryMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="popup-modal" onSubmit={handleSubmit(submitForm)}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <CloseButton toggleModal={toggleModal} />
          <div className="p-4 md:p-5">
            <CustomInput
              label="Name"
              name="name"
              control={control}
              rules={{ required: "Category Name is required" }}
            />

            <div className="mb-4">
              <p className="text-sm font-medium pb-2">Category Image</p>
              <FileUploader
                maxSizeMB={1}
                acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
                onFileUpload={setUploadedFile}
                defaultFile={selectedCategory?.categoryImage}
              />
              {uploadedFile && (
                <ImageDetails
                  fileName={uploadedFile.name}
                  fileSize={uploadedFile.size}
                />
              )}
            </div>

            <div className="flex items-center">
              <div className="mr-3">
                <CustomButton onClick={toggleModal} variant="skeleton">
                  Cancel
                </CustomButton>
              </div>

              <CustomButton
                loading={
                  uploadMutation.isPending ||
                  createCategoryMutation.isPending ||
                  updateUploadMutation.isPending
                }
                variant="tertiary"
              >
                {selectedCategory ? "Update Category" : "Create Category"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateCategory;
