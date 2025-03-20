/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import {
  UploadError,
  useCustomMutation,
  useGetDataById,
  useUploadMutation,
} from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import Loader from "../component/Loader";
import { directUserToPageOnLogin } from "../utils";
import { toast } from "react-toastify";
import { useState } from "react";

const SingleDraftPublication = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userId, userType, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { data: publicationData, isLoading: publicationDataIsLoading } =
    useGetDataById({
      url:
        params?.id && userId
          ? `/Publications/GetUserPublicationById?publicId=${params?.id}&userId=${userId}&isDraft=true`
          : "",
      queryKey: ["GetUserPublicationByIdForSinglePublication"],
      enabled: !!params?.id && !!userId,
    });

  const [backendPath, setBackendPath] = useState(publicationData?.image);
  const [isDraft, setIsDraft] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(handleSuccess, handleError);

  const createPublicationMutation = useCustomMutation({
    endpoint: "Publications/CreatePublication",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      navigate(directUserToPageOnLogin(userType));
    },
  });

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
    <>
      {publicationDataIsLoading ? (
        <Loader />
      ) : (
        <div className="">
          <ArticleForm
            defaultValues={publicationData}
            setIsDraft={setIsDraft}
            tags={tags}
            setTags={setTags}
            uploadedFile={uploadedFile}
            handleFileUpload={handleFileUpload}
            onSubmit={submitForm}
            isLoading={createPublicationMutation.isPending}
            // handleFileUpload={handleFileUpload}
            // Pass other necessary props...
          />
        </div>
      )}
    </>
  );
};

export { SingleDraftPublication };
