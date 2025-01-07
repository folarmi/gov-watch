/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useCustomMutation, useGetDataById } from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import Loader from "../component/Loader";
import { useState } from "react";

const SinglePublishedPublication = () => {
  const params = useParams();
  const [tags, setTags] = useState<string[]>([]);
  const { userId } = useAppSelector((state: RootState) => state.auth);

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

  const updatePublicationMutation = useCustomMutation({
    endpoint: "Publications/UpdatePublication",
    successMessage: (data: any) => data?.remark,
    method: "put",
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      window.location.reload();
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
      "datePromiseMade",
      "promiseDeadline",
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

    const formData: any = {
      ...filteredObject,
      lastModifiedBy: userId,
      // Change this when working with a normal user

      // isDraftUpdate: true,
      isSubmission: true,
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
          />
        </div>
      )}
    </>
  );
};

export { SinglePublishedPublication };
