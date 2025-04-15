/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import {
  useCustomMutation,
  useGetData,
  useGetDataById,
} from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import Loader from "../component/Loader";
import backButton from "../assets/backButton.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import sampleWriter from "../assets/sampleWriter.webp";

import { RenderArticle } from "../component/forms/RenderArticle";
import { useEffect, useState } from "react";
import { Comments } from "../component/Comments";
import { scrollToTop } from "../utils";
// import { InfiniteScrolling } from "../component/InfiniteScrolling";

const PublicationDetails = () => {
  const params = useParams();
  const [viewCount, setViewCount] = useState();
  const [pageNumber, setPageNumber] = useState<any>(1);
  const pageSize = 12;

  const {
    data: publicationDetailsData,
    isLoading: publicationDetailsIsLoading,
  } = useGetDataById({
    url: `Publications/GetPublicationById?publicId=${params?.id}`,
    queryKey: ["GetAllUserBookmarksByUserId"],
    enabled: !!params?.id,
  });

  const {
    data: publicationCommentsData,
    isLoading: publicationCommentsIsLoading,
    // error: publicationCommentError,
    // error,
  } = useGetData({
    url: `PublicationComments/GetAllPublicationCommentsResponses?publicationId=${params?.id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetAllPublicationComments"],
  });

  const UpdatePublicationViewCount = useCustomMutation({
    endpoint: `Publications/UpdatePublicationViewCount?publicationId=${publicationDetailsData?.publicId}`,
    method: "put",
    // successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: (data: any) => {
      setViewCount(data?.viewCount);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      UpdatePublicationViewCount.mutate({});
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <OuterPage>
      {publicationDetailsIsLoading || publicationCommentsIsLoading ? (
        <Loader />
      ) : (
        <section className="w-full max-w-[680px] mt-4 mx-auto">
          <Link to="/" className="cursor-pointer">
            <img src={backButton} className="w-5 h-5" />
          </Link>

          <div className="flex mt-2 mb-8 items-center gap-x-4">
            <p className="text-base text-primary font-bold">
              {publicationDetailsData?.category}
            </p>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>

            <div className="flex items-center">
              <img src={eyeIcon} className="mr-2" />
              <p>{viewCount || 0} views</p>
            </div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <p className="text-base text-black/90 font-medium">
              {publicationDetailsData?.date}
            </p>
          </div>

          <main>
            <p
              style={{
                fontSize:
                  "font-size: clamp(2rem, 1.4783rem + 2.6087vw, 3.5rem)",
              }}
              className="text-6xl text-black font-black mb-2"
            >
              {publicationDetailsData?.title}
            </p>

            <div className="my-4">
              <img
                src={publicationDetailsData?.image}
                alt="Article placeholder image"
                className="w-full h-64 md:h-80 lg:h-[680px] object-contain rounded-lg blur-xs "
              />

              <p className="mt-2 text-sm text-gray-600 italic text-center underline">
                {publicationDetailsData?.imageCaption}
              </p>
            </div>

            <RenderArticle articleContent={publicationDetailsData?.article} />

            {/* Start of additional information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 shadow-md">
              <h3 className="font-bold text-lg mb-2">Additional Information</h3>

              <div className="grid grid-cols-2 gap-4">
                {publicationDetailsData?.state && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">State:</span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.state}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.lga && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">LGA:</span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.lga}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.politicalActorName && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                      Political Actor:
                    </span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.politicalActorName}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.mda && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">MDAs:</span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.mda}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.region && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">Region:</span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.region}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.isPromise && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                      Date Promise Made:
                    </span>
                    <p className="ml-2 text-gray-600">
                      {new Date(
                        publicationDetailsData?.datePromiseMade
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.isPromise && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                      Promise Deadline:
                    </span>
                    <p className="ml-2 text-gray-600">
                      {new Date(
                        publicationDetailsData?.promiseDeadline
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {publicationDetailsData?.isPromise && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">
                      Date Promise Fulfilled:
                    </span>
                    <p className="ml-2 text-gray-600">
                      {publicationDetailsData?.datePromiseFulfilled
                        ? new Date(
                            publicationDetailsData?.datePromiseFulfilled
                          ).toLocaleDateString()
                        : "Not fulfilled"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Last Modified:
              </span>{" "}
              {publicationDetailsData?.lastModifiedDate}
            </p>

            <Comments
              comments={publicationCommentsData?.publicationCommentViewModel}
              publicationDetailsData={publicationDetailsData}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              pageSize={pageSize}
            />

            {/* <InfiniteScrolling
              data={publicationCommentsData?.publicationCommentViewModel}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              isLoading={publicationCommentsIsLoading}
              error={publicationCommentError}
              pageSize={12}
              keyExtractor={(comment: any) => comment?.publicId}
              ifGrid={false}
              renderItem={() => (
                <Comments
                  comments={
                    publicationCommentsData?.publicationCommentViewModel
                  }
                  publicationDetailsData={publicationDetailsData}
                />
              )}
            /> */}

            <p className="font-black mt-8 mb-4">References</p>
            <RenderArticle articleContent={publicationDetailsData?.reference} />

            {/* <a
              target="_blank"
              href={publicationDetailsData?.reference}
              className="mb-12 underline text-blue-800"
            >
              {publicationDetailsData?.reference}
            </a> */}
            {/* <p> {publicationDetailsData?.reference}</p> */}

            <p className="font-black mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {publicationDetailsData &&
                publicationDetailsData?.tags
                  .split(", ")
                  ?.map((item: string, index: string) => {
                    return (
                      <span
                        key={index}
                        className="bg-primary capitalize text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap"
                      >
                        {item}
                      </span>
                    );
                  })}
            </div>

            {/* {publicationDetailsData?.bio !== null && (
              <p className="my-6 text-base font-normal">
                <span className="font-semibold">
                  {publicationDetailsData?.authorName}
                </span>{" "}
                is a {publicationDetailsData?.bio}
              </p>
            )}

            <div className="flex items-center my-8">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <img
                  // src={publicationDetailsData?.image}
                  src={publicationDetailsData?.contributorImage || sampleWriter}
                  className="w-full h-full object-cover rounded-full"
                  alt="Writer"
                />
              </div>

              <div className="ml-6">
                <p className="font-bold text-3xl">
                  Written by {publicationDetailsData?.authorName}
                </p>
              </div>
            </div> */}

            {/* {publicationDetailsData?.bio && (
              <div className="bg-gray-50 p-6 rounded-lg shadow-md my-6">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {publicationDetailsData?.authorName}
                  </span>{" "}
                  is {publicationDetailsData?.bio}.
                </p>
              </div>
            )} */}

            <div className="flex items-center space-x-8 my-8">
              {/* Profile Image */}
              <Link
                to={`/author/${publicationDetailsData?.contributorPublicId} `}
                className="w-36 h-36 overflow-hidden rounded-full shadow-lg"
                onClick={() => scrollToTop()}
              >
                <img
                  src={publicationDetailsData?.contributorImage || sampleWriter}
                  className="w-full h-full object-cover"
                  alt="Writer"
                />
              </Link>

              {/* Author Information */}
              <div>
                <p className="font-bold text-3xl text-gray-800">
                  Written by {publicationDetailsData?.authorName}
                </p>
                <p className="text-gray-600 mt-2 text-base">
                  {publicationDetailsData?.bio}
                </p>
              </div>
            </div>
          </main>
        </section>
      )}
    </OuterPage>
  );
};

export { PublicationDetails };
