/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Link } from "react-router-dom";
// import Loader from "../component/Loader";
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
import { InfiniteScrolling } from "../component/InfiniteScrolling";
import { Article } from "../types/generalTypes";
import { useState } from "react";

const Drafts = () => {
  const [pageNumber, setPageNumber] = useState<any>(1);
  const pageSize = 12;

  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
    error,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&fetchAllDraftPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`
        : `Publications/GetAllPublications?fetchAllDraftPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: [
      "GetAllPendingPublications",
      userType,
      JSON.stringify(pageNumber),
    ],
    enabled: shouldFetchPublications,
  });

  return (
    <DashboardLayout>
      <InfiniteScrolling
        data={pendingPublicationsData}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={pendingPublicationsLoading}
        error={error}
        pageSize={pageSize}
        keyExtractor={(article) => article?.publicId}
        renderItem={(article: Article) => (
          <Card
            section={article?.section}
            articleTitle={article?.title}
            summary={article?.summary}
            date={article?.date}
            promise={article?.isPromise}
            imageUrl={article?.image}
            deadline={article?.promiseDeadline}
            id={article?.publicId}
            isPromisedFulfilled={article?.isPromiseFulfilled}
            isCredible={article?.isCredible}
            isBookMarked={article?.isBookmarked}
            isLiked={article?.isLiked}
            isPublished
            dateIncidentStarted={article?.dateIncidentStarted}
            dateIncidentResolved={article?.dateIncidentResolved}
            link={`/dashboard/drafts/${article?.id || article?.publicId}`}
          />
        )}
      />
    </DashboardLayout>
  );
};

export { Drafts };

{
  /* <div className="">
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
                      isCredible,
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
                            isCredible={isCredible}
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
      </div> */
}
