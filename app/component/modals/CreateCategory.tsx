"use client";

import React, { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
// import { useMutation } from "@tanstack/react-query";
// import api from "@/app/lib/axios";
import { toast } from "react-toastify";
import FileUploader from "../FileUploader";
import CustomButton from "../CustomButton";
import CloseButton from "../forms/CloseButton";
import {
  UploadError,
  useCustomMutation,
  useUploadMutation,
} from "@/app/hooks/apiCalls";

const CreateCategory = ({ toggleModal }: any) => {
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

  // const createCategoryMutation = useMutation({
  //   mutationFn: async (data: FormData) => {
  //     const response = await api.post("CreateCategory", data);
  //     return response;
  //   },
  //   onSuccess: (data) => {
  //     if (data?.status === 201) {
  //       toast(data?.data?.remark);
  //       toggleModal();
  //     }
  //   },
  //   onError: (error: any) => {
  //     toast.error(error?.response?.data?.remark);
  //   },
  // });

  const createCategoryMutation = useCustomMutation({
    endpoint: "Categories/CreateCategory",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      // Add your success logic here, e.g., closing the modal
      toggleModal();
      console.log("done");
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

            <div className="flex  items-center">
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
                Create Category
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateCategory;

// import { configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
//   persistReducer,
//   persistStore,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import rootReducer from "./reducers";
// import { baseApi } from "./services/base-service";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   whitelist: [
//     // "auth",
//     "multiStep",
//     // "companyInfo",
//     // "regulatoryInfo",
//     // "soleProprietorInfo",
//     // "relatedPartyInfo",
//   ],
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // serializableCheck: false,
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         //   ignoredActionPaths: ["companyInfo/saveCompanyInfo"],
//         //   ignoredPaths: ["companyInfo/saveCompanyInfo"],
//       },
//     }).concat(baseApi.middleware),
//   devTools: true,
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // export default store;
