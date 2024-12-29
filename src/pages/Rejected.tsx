/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../component/Card";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import {
  getPublicationTypeByUserId,
  shouldFetchPublications,
  userTypeObject,
} from "../utils";
import EmptyPage from "../component/EmptyPage";

const Rejected = () => {
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const {
    data: rejectedPublicationsData,
    isLoading: rejectedPublicationsLoading,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&isRejected=true&page=1&pageSize=10`
        : "Publications/GetAllPublications?isRejected=true&page=1&pageSize=100",
    queryKey: ["GetAllPendingPublications", userType],
    enabled: shouldFetchPublications,
  });
  return (
    <DashboardLayout>
      <div className="">
        {rejectedPublicationsLoading ? (
          <Loader />
        ) : (
          <>
            {rejectedPublicationsData?.length < 1 ? (
              <EmptyPage />
            ) : (
              <div className="flex flex-wrap justify-between">
                {rejectedPublicationsData?.map(
                  ({
                    title,
                    date,
                    image,
                    section,
                    summary,
                    isPromise,
                    id,
                    publicId,
                    promiseDeadline,
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
                          deadline={promiseDeadline}
                          id={id}
                          // imageUrl={coatOfArms}
                        />
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export { Rejected };
