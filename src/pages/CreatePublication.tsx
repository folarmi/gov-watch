/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import {
  UploadError,
  useCustomMutation,
  useUploadMutation,
} from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import { useNavigate } from "react-router-dom";
import { directUserToPageOnLogin } from "../utils";

// import ArticleForm from "@/app/component/forms/ArticleForm";

const CreatePublication = () => {
  const navigate = useNavigate();
  const { userCountry, userId, userType } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isDraft, setIsDraft] = useState(false);

  const createPublicationMutation = useCustomMutation({
    endpoint: "Publications/CreatePublication",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark ||
      error?.response?.data ||
      error?.response?.data?.errors,
    // console.log(error?.response?.data?.errors),

    onSuccessCallback: () => {
      navigate(directUserToPageOnLogin(userType));
    },
  });

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

  const submitForm = (data: any) => {
    if (backendPath === "") {
      toast("Please upload a file first");
      return;
    }

    const formData: any = {
      ...data,
      country: userCountry,
      contributorPublicId: userId,
      image: backendPath,
      tags: tags.join(" , "),
      isDraft,
    };
    createPublicationMutation.mutate(formData);
  };

  return (
    <ArticleForm
      onSubmit={submitForm}
      isEditing={false}
      uploadedFile={uploadedFile}
      handleFileUpload={handleFileUpload}
      setIsDraft={setIsDraft}
      isDraft={isDraft}
      tags={tags}
      setTags={setTags}
      isLoading={createPublicationMutation.isPending}
    />
  );
};

export { CreatePublication };
// dk9i5q1bg
