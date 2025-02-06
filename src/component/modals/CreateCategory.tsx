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
  UploadError,
  useCustomMutation,
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

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();
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

  const submitForm = (data: any) => {
    if (backendPath === "" && !selectedCategory) {
      toast("Please upload a file first");
    }

    const formData: any = {
      name: data?.name,
    };

    if (selectedCategory) {
      formData.userId = userId;
      formData.categoryImage = selectedCategory?.image;
      // formData.categoryImage =
      //   "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1736507512/626f5a51-063a-4e01-8157-e56d46a194ae.png";
    } else {
      formData.userId = userId;
      formData.name = data?.name;
      formData.image = backendPath || backendPath;
    }
    console.log(formData);
    createCategoryMutation.mutate(formData);
  };

  return (
    <form
      id="popup-modal"
      //   className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      onSubmit={handleSubmit(submitForm)}
    >
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
                onFileUpload={handleFileUpload}
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
                  uploadMutation.isPending || createCategoryMutation.isPending
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
