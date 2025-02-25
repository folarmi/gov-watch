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
      "dateIncidentResolved",
      "dateIncidentStarted",
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

    console.log(formData);
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
            isLoading={updatePublicationMutation.isPending}
          />
        </div>
      )}
    </>
  );
};

export { SinglePublishedPublication };

// {
//   "publicId": "846b2464-db56-4d00-888d-17330e7fff8c",
//   "snippet": "fdjkfjkdf",
//   "article": "<p>skdnfjknsjdfn</p>",
//   "image": "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1740471211/1e706917-3557-4fe2-ad0d-1a75958a08ef.png",
//   "imageCaption": "this is an image",
//   "contributorPublicId": "a7e36778-2fec-4b6e-8569-dbe47778dff0",
//   "category": "Brady Hampton",
//   "state": "Abia",
//   "ward": null,
//   "lcda": "Ifeoma Noble",
//   "isFederal": false,
//   "title": "Update date incident started",
//   "mda": "Nadine Burke",
//   "tags": "test , red , blur",
//   "reference": "<p>smdnfjksndf</p>",
//   "authorName": "Folacodes",
//   "link": "<p>skndfksnfksdfnskjndf</p>",
//   "isPromise": false,
//   "isCredible": false,
//   "isPromisedFulfilled": null,
//   "datePromiseMade": null,
//   "promiseDeadline": null,
//   "datePromiseFulfilled": null,
//   "dateIncidentResolved": null,
//   "dateIncidentStarted": "2025-02-14",
//   "politicalActorName": "Aphrodite Douglas",
//   "lga": "Brock Boothasdfghjk",
//   "country": "Nigeria",
//   "isSubmission": true,
//   "lastModifiedBy": "a7e36778-2fec-4b6e-8569-dbe47778dff0"
// }
