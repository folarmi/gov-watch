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

const Drafts = () => {
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&fetchAllDraftPublication=true&page=1&pageSize=10`
        : `Publications/GetAllPublications?fetchAllDraftPublication=true&page=1&pageSize=100`,
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
            <>
              {pendingPublicationsData?.length < 1 ? (
                <EmptyPage />
              ) : (
                <>
                  {" "}
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
                      promiseDeadline,
                      category,
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
                            isPublished={false}
                            category={category}
                            link={`/dashboard/drafts/${id || publicId}`}
                            // imageUrl={coatOfArms}
                          />
                        </Link>
                      );
                    }
                  )}
                </>
              )}
            </>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export { Drafts };
