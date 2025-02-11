/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetData } from "../hooks/apiCalls";
import { queryParamsToAdd } from "../utils";
import Card from "./Card";
import EmptyPage from "./EmptyPage";

type Prop = {
  categoryName: string;
  userId: string;
  userObject: any;
  selectedFilter: string;
  queryParam: string;
  pageSize: number;
};

const InfiniteScrollArticles = ({
  categoryName,
  userId,
  userObject,
  selectedFilter,
  queryParam,
  pageSize,
}: Prop) => {
  const [articles, setArticles] = useState<any>([]); // Holds the list of articles
  const [pageNumber, setPageNumber] = useState(1); // Tracks the current page number
  const [hasMore, setHasMore] = useState(true); // Tracks if there are more articles to load

  const {
    data: articlesData,
    isLoading,
    error,
  } = useGetData({
    url: `Publications/GetLatestPublications?categoryName=${
      categoryName === "all" ? "" : categoryName
    }&searcherId=${userId}${
      userObject?.country ? `&countryName=${userObject.country}` : ""
    }&${queryParamsToAdd(
      selectedFilter,
      queryParam
    )}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: [
      "GetlatestPublications",
      categoryName,
      queryParam,
      userObject?.country,
      JSON.stringify(pageNumber),
    ],
  });

  useEffect(() => {
    if (articlesData) {
      if (articlesData.length > 0) {
        setArticles((prevArticles: any) => [...prevArticles, ...articlesData]);
      } else {
        setHasMore(false);
      }
    }
  }, [articlesData]);

  const fetchMoreData = () => {
    setPageNumber((prevPageNumber) => {
      const nextPage = prevPageNumber + 1;
      return nextPage;
    });
  };
  return (
    <div className="p-4">
      <InfiniteScroll
        dataLength={articles?.length} // Current length of the articles list
        next={fetchMoreData} // Function to load more data
        hasMore={hasMore} // Boolean to indicate if there's more data to load
        loader={<h4 className="text-center py-4">Loading...</h4>} // Loading spinner or message
        endMessage={
          <p className="text-center py-4">
            <b>You have reached the end of the list.</b>
          </p>
        }
      >
        <>
          {articles?.length < 1 ? (
            <EmptyPage />
          ) : (
            <div className="space-y-4">
              <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {articles &&
                  articles?.map(
                    ({
                      title,
                      date,
                      image,
                      section,
                      summary,
                      isPromise,
                      publicId,
                      promiseDeadline,
                      isPromiseFulfilled,
                      isBookmarked,
                      isCredible,
                      dateIncidentStarted,
                      dateIncidentResolved,
                      isLiked,
                    }: any) => {
                      return (
                        <div
                          key={title}
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
                            id={publicId}
                            isPromisedFulfilled={isPromiseFulfilled}
                            isCredible={isCredible}
                            isBookMarked={isBookmarked}
                            isLiked={isLiked}
                            isPublished
                            dateIncidentStarted={dateIncidentStarted}
                            dateIncidentResolved={dateIncidentResolved}
                            link={`/latest-publications/${publicId}`}
                          />
                        </div>
                      );
                    }
                  )}
              </section>
            </div>
          )}
        </>
      </InfiniteScroll>

      {isLoading && <p className="text-center py-4">Loading initial data...</p>}
      {error && (
        <p className="text-center py-4 text-red-500">Error: {error.message}</p>
      )}
    </div>
  );
};

export default InfiniteScrollArticles;
