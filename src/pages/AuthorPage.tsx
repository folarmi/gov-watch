/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { Avatar } from "../component/Avatar";

const AuthorPage = () => {
  const { id } = useParams();

  const { data: userBioData, isLoading: userBioIsLoading } = useGetData({
    url: `Users/GetUserBioById?publicId=${id}`,
    queryKey: ["GetUserBioById"],
  });

  const { data: publicationData, isLoading } = useGetData({
    url: `Publications/GetLatestPublications?userId=${id}&pageNumber=1&pageSize=50`,
    queryKey: ["GetLatestPublicationsByUserId"],
  });

  return (
    <OuterPage>
      <>
        {isLoading || userBioIsLoading ? (
          <Loader />
        ) : (
          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Author Bio Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="sm:flex items-center p-8">
                {/* <div className="sm:flex-shrink-0"> */}
                <Avatar
                  size="lg"
                  imageUrl={userBioData?.image}
                  name={` ${userBioData?.firstName || ""} ${
                    userBioData?.lastName || ""
                  }`.trim()}
                />
                {/* </div> */}
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userBioData?.firstName} {userBioData?.lastName}
                  </h1>
                  <p className="mt-4 text-gray-600">
                    {userBioData?.bio || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Publications Section */}
            <div className="max-w-3xl mx-auto mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Publications
              </h2>
              <div className="space-y-6">
                {publicationData?.map((publication: any, index: any) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link
                      to={`/latest-publications/${publication?.publicId}`}
                      className="sm:flex"
                    >
                      {/* Publication Image */}
                      <div className="sm:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover sm:h-32 sm:w-32 rounded-lg"
                          src={publication?.image}
                          alt={publication?.title}
                        />
                      </div>
                      {/* Publication Details */}
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {publication?.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {publication?.date}
                        </p>
                        <p className="mt-2 text-gray-600">
                          {publication.content.length > 100
                            ? `${publication.content.slice(0, 100)}...`
                            : publication.content}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    </OuterPage>
  );
};

export { AuthorPage };
