/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { InfiniteScrolling } from "../component/InfiniteScrolling";
import { useState } from "react";
import { Article } from "../types/generalTypes";

const PendingPublications = () => {
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
        ? `${getPublicationTypeByUserId}${userId}&fetchAllSubmittedPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`
        : `Publications/GetAllPublications?fetchAllSubmittedPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
        colSize={3}
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
            link={`/dashboard/pending/${article?.id || article?.publicId}`}
          />
        )}
      />
    </DashboardLayout>
  );
};

export { PendingPublications };

{
  /* <div className="">
        {pendingPublicationsLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-between">
            {pendingPublicationsData &&
              pendingPublicationsData?.map(
                ({
                  title,
                  submittedOn,
                  image,
                  section,
                  summary,
                  isPromise,
                  id,
                  publicId,
                  promiseDeadline,
                  isCredible,
                }: any) => {
                  return (
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      date={submittedOn}
                      promise={isPromise}
                      imageUrl={image}
                      isCredible={isCredible}
                      deadline={promiseDeadline}
                      link={`/dashboard/pending/${id || publicId}`}
                      id={id || publicId}
                      // imageUrl={coatOfArms}
                    />
                  );
                }
              )}
          </div>
        )}
      </div> */
}
