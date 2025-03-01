import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
// import Display from "../component/Display";
import { InfiniteScrolling } from "../component/InfiniteScrolling";
import { useState } from "react";
import { Article } from "../types/generalTypes";
import Card from "../component/Card";

const BookMarks = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 12;
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const {
    data: bookMarksData,
    isLoading: bookMarksDataIsLoading,
    error,
  } = useGetData({
    url: `UserBookmarks/GetAllUserBookmarksByUserId?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetAllUserBookmarksByUserId", pageNumber],
    enabled: !!userId,
  });

  return (
    <DashboardLayout>
      {/* <Display
        loadingState={bookMarksDataIsLoading}
        moduleData={bookMarksData}
      /> */}
      <InfiniteScrolling
        data={bookMarksData}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={bookMarksDataIsLoading}
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

export { BookMarks };
