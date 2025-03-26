/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useCustomMutation, useGetDataById } from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import Loader from "../component/Loader";
import { useEffect, useState } from "react";
import {
  convertToISOString,
  directUserToPageOnLogin,
  userTypeObject,
} from "../utils";

const SinglePublishedPublication = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const [isDraft, setIsDraft] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { data: publicationData, isLoading: publicationDataIsLoading } =
    useGetDataById({
      url:
        params?.id && userId
          ? // ? `/Publications/GetUserPublicationById?publicId=${params?.id}&userId=${userId}&isDraft=true`
            `/Publications/GetPublicationById?publicId=${params?.id}`
          : "",
      queryKey: ["GetUserPublicationByIdForSinglePublication"],
      enabled: !!params?.id && !!userId,
    });

  const [tags, setTags] = useState<string[]>([]);

  // Update tags when publicationData is fetched
  useEffect(() => {
    if (publicationData?.tags) {
      // Split the tags string into an array
      const tagsArray = publicationData.tags.split(/\s*,\s*/);
      setTags(tagsArray);
    }
  }, [publicationData]);

  const updatePublicationMutation = useCustomMutation({
    endpoint: "Publications/UpdatePublication",
    successMessage: (data: any) => data?.remark,
    method: "put",
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      navigate(directUserToPageOnLogin(userType));
    },
  });

  const handleEditSubmit = (data: any) => {
    // if (backendPath === "") {
    //   toast("Please upload a file first");
    //   return;
    // }

    const requiredFields = [
      "publicId",
      "snippet",
      "article",
      "image",
      "imageCaption",
      "contributorPublicId",
      "category",
      "state",
      "senatorialDistrict",
      "ward",
      "lcda",
      "isFederal",
      "title",
      "mda",
      "tags",
      "reference",
      "authorName",
      "link",
      "isPromise",
      "isCredible",
      "isPromisedFulfilled",
      "publishDate",
      "datePromiseMade",
      "promiseDeadline",
      "dateIncidentStarted",
      "dateIncidentResolved",
      "datePromiseFulfilled",
      "politicalActorName",
      "lga",
      "country",
      "isSubmission",
    ];

    const filteredObject = Object.fromEntries(
      requiredFields.map((key) => [
        key,
        data[key] ?? (typeof key === "boolean" ? false : null), // Default values
      ])
    );

    const latestTags = tags.join(", ");
    const formData: any = {
      ...filteredObject,
      tags: latestTags,
      lastModifiedBy: userId,
      dateIncidentResolved:
        data?.dateIncidentResolved &&
        convertToISOString(data?.dateIncidentResolved),
      dateIncidentStarted:
        data?.dateIncidentStarted &&
        convertToISOString(data?.dateIncidentStarted),
      isDraftUpdate:
        userType === userTypeObject?.admin || userType === userTypeObject.editor
          ? false
          : isDraft
          ? true
          : false,
      isSubmission: isDraft ? false : true,
    };
    updatePublicationMutation.mutate(formData);
  };

  return (
    <>
      {publicationDataIsLoading ? (
        <Loader />
      ) : (
        <div>
          <ArticleForm
            isEditing={true}
            defaultValues={publicationData}
            tags={tags}
            setTags={setTags}
            onSubmit={handleEditSubmit}
            isLoading={
              publicationDataIsLoading || updatePublicationMutation.isPending
            }
            setIsDraft={setIsDraft}
            isDraft={isDraft}
            uploadedFile={uploadedFile}
            handleFileUpload={setUploadedFile}
            isPublished={true}
          />
        </div>
      )}
    </>
  );
};

export { SinglePublishedPublication };
