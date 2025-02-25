import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Card from "../component/Card";

import {
  getPublicationTypeByUserId,
  shouldFetchPublications,
  userTypeObject,
} from "../utils";
import { InfiniteScrolling } from "../component/InfiniteScrolling";
import { useState } from "react";
import { Article } from "../types/generalTypes";

const TotalArticles = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const pageSize = 12;

  const {
    data: totalPublicationsData,
    isLoading: totalPublicationsLoading,
    error,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&fetchAllPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`
        : `Publications/GetAllPublications?fetchAllPublication=true&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetAllTotalPublications", userType, pageNumber],
    enabled: shouldFetchPublications,
  });

  return (
    <>
      <DashboardLayout>
        <InfiniteScrolling
          data={totalPublicationsData}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isLoading={totalPublicationsLoading}
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
              link={`/dashboard/published/${article?.id || article?.publicId}`}
            />
          )}
        />
      </DashboardLayout>
    </>
  );
};

export { TotalArticles };

{
  /* <div className="flex flex-wrap justify-between">
            {totalPublicationsData?.map(
              ({
                title,
                date,
                image,
                section,
                summary,
                isPromise,
                id,
                publicId,
                isCredible,
              }: any) => {
                return (
                  <Link
                    to={`/dashboard/published/${id || publicId}`}
                    key={id}
                    className="w-full sm:w-1/2 md:w-1/3 mt-10"
                  >
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      isCredible={isCredible}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                      id={id}
                      link={`/dashboard/published/${id || publicId}`}
                      // imageUrl={coatOfArms}
                    />
                  </Link>
                );
              }
            )}
          </div> */
}
