/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import Card from "../component/Card";
import DashboardLayout from "../layouts/DashboardLayout";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import {
  getPublicationTypeByUserId,
  shouldFetchPublications,
  userTypeObject,
} from "../utils";

const PendingPublications = () => {
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&fetchAllSubmittedPublication=true&page=1&pageSize=10`
        : "Publications/GetAllPublications?fetchAllSubmittedPublication=true&page=1&pageSize=100",
    queryKey: ["GetAllPendingPublications", userType],
    enabled: shouldFetchPublications,
  });
  return (
    <DashboardLayout>
      <div className="">
        {pendingPublicationsLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-between">
            {pendingPublicationsData?.map(
              ({
                title,
                date,
                image,
                section,
                summary,
                isPromise,
                id,
                publicId,
              }: any) => {
                return (
                  <Link
                    to={`/dashboard/pending/${id || publicId}`}
                    key={id}
                    className="w-full sm:w-1/2 md:w-1/3 mt-10"
                  >
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                      // imageUrl={coatOfArms}
                    />
                  </Link>
                );
              }
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export { PendingPublications };
