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
import { useState } from "react";
import { Article } from "../types/generalTypes";

const Rejected = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 12;

  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const {
    data: rejectedPublicationsData,
    isLoading: rejectedPublicationsLoading,
    error,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&isRejected=true&pageNumber=${pageNumber}&pageSize=${pageSize}`
        : `Publications/GetAllPublications?isRejected=true&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetAllPendingPublications", userType, pageNumber],
    enabled: shouldFetchPublications,
  });
  return (
    <DashboardLayout>
      <InfiniteScrolling
        data={rejectedPublicationsData}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={rejectedPublicationsLoading}
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
  );
};

export { Rejected };

{
  /* <div className="">
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
      </div> */
}
