import { Link, useParams } from "react-router-dom";
import { useGetDataById } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import Loader from "../component/Loader";
import backButton from "../assets/backButton.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import sampleWriter from "../assets/sampleWriter.webp";

import { RenderArticle } from "../component/forms/RenderArticle";

const PublicationDetails = () => {
  const params = useParams();

  const {
    data: publicationDetailsData,
    isLoading: publicationDetailsIsLoading,
  } = useGetDataById({
    url: `Publications/GetPublicationById?publicId=${params?.id}`,
    queryKey: ["GetAllUserBookmarksByUserId"],
    enabled: !!params?.id,
  });

  console.log(publicationDetailsData);
  return (
    <OuterPage>
      {publicationDetailsIsLoading ? (
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
              <p>{publicationDetailsData?.viewCount} views</p>
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

            <img
              src={publicationDetailsData?.image}
              alt="Article placeholder image"
              className="w-full h-64 md:h-80 lg:h-[680px] object-cover rounded-lg blur-xs my-4"
            />

            <RenderArticle articleContent={publicationDetailsData?.article} />

            {/* Start of additional information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 shadow-md">
              <h3 className="font-bold text-lg mb-2">Additional Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">State:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.state}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">LGA:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.lga}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Political Actor:
                  </span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.politicalActorName}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">MDAs:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.mda}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">Region:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.region}
                  </p>
                </div>

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
              </div>
            </div>

            {publicationDetailsData?.bio !== null && (
              <p className="my-6 text-base font-normal">
                <span className="font-semibold">
                  {publicationDetailsData?.authorName}
                </span>{" "}
                is a {publicationDetailsData?.bio}
              </p>
            )}

            <p className="font-black my-2">References</p>
            <p className="mb-8">{publicationDetailsData?.reference}</p>

            <p className="font-black mb-2">Tags</p>
            {publicationDetailsData &&
              publicationDetailsData?.tags
                .split(", ")
                ?.map((item: string, index: string) => {
                  return (
                    <span
                      key={index}
                      className="bg-gray-100 capitalize text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  );
                })}

            <div className="flex items-start my-8">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <img
                  // src={publicationDetailsData?.image}
                  src={sampleWriter}
                  className="w-full h-full object-cover rounded-full"
                  alt="Writer"
                />
              </div>

              <div className="ml-6">
                <p className="font-bold text-3xl">
                  Written by {publicationDetailsData?.authorName}
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
