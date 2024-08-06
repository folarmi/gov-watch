"use client";

import React, { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
import { useMutation } from "@tanstack/react-query";
import api from "@/app/lib/axios";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import CustomButton from "../CustomButton";

const CreateCategory = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState("");

  const uploadImageMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("UploadImage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast(data?.data?.remark);
        setBackendPath(data?.data?.filePath);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.errors?.CreatedBy[0]);
      toast.error(error?.response?.data?.errors?.UploadFile[0]);
    },
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);

    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);

    uploadImageMutation.mutate(formData);
  };

  const createCategoryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("CreateCategory", data);
      return response;
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast(data?.data?.remark);
        toggleModal();
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.remark);
      // console.log(error?.response?.data?.remark);
    },
  });

  const submitForm = (data: any) => {
    if (backendPath === "") {
      toast("Please upload a file first");
    }

    const formData: any = {
      name: data?.name,
      userId,
      image: backendPath,
    };
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
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              onClick={toggleModal}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5">
            <CustomInput
              label="Name"
              name="name"
              control={control}
              rules={{ required: "Category Name is required" }}
            />

            <div className="mb-4">
              <p className="text-sm font-semibold pb-2">Category Image</p>
              <FileUploader
                maxSizeMB={1}
                acceptFormats={["png", "jpeg", "jpg", "gif"]}
                onFileUpload={handleFileUpload}
              />
              {uploadedFile && (
                <div className="mt-2">
                  <h2>Uploaded File Details:</h2>
                  <p>Name: {uploadedFile.name}</p>
                  <p>
                    Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <button
              data-modal-hide="popup-modal"
              onClick={toggleModal}
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 mr-3"
            >
              Cancel
            </button>

            <CustomButton
              loading={
                uploadImageMutation.isPending ||
                createCategoryMutation.isPending
              }
              variant="tertiary"
            >
              Create Category
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateCategory;
