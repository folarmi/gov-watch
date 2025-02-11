/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Card from "./Card";
// import EmptyPage from "./EmptyPage";

// type Prop = {
//   articlesData: any;
//   setPageNumber: any;
//   isLoading: boolean;
//   error: any;
// };

// const InfiniteScrollArticles = ({
//   articlesData,
//   setPageNumber,
//   isLoading,
//   error,
// }: Prop) => {
//   const [articles, setArticles] = useState<any>([]); // Holds the list of articles
//   const [hasMore, setHasMore] = useState(true); // Tracks if there are more articles to load

//   useEffect(() => {
//     if (articlesData) {
//       if (articlesData.length > 0) {
//         setArticles((prevArticles: any) => [...prevArticles, ...articlesData]);
//       } else {
//         setHasMore(false);
//       }
//     }
//   }, [articlesData]);

//   const fetchMoreData = () => {
//     setPageNumber((prevPageNumber: number) => {
//       const nextPage = prevPageNumber + 1;
//       return nextPage;
//     });
//   };
//   return (
//     <div className="p-4">
//       <InfiniteScroll
//         dataLength={articles?.length} // Current length of the articles list
//         next={fetchMoreData} // Function to load more data
//         hasMore={hasMore} // Boolean to indicate if there's more data to load
//         loader={
//           <div className="flex justify-center items-center py-4">
//             <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
//           </div>
//         } // Loading spinner or message
//         endMessage={
//           <p className="text-center py-4">
//             <b>You have gotten to the end of the articles.</b>
//           </p>
//         }
//       >
//         <>
//           {!isLoading && !error && articles?.length < 1 ? (
//             <EmptyPage />
//           ) : (
//             <div className="space-y-4">
//               <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                 {articles &&
//                   articles?.map(
//                     ({
//                       title,
//                       date,
//                       image,
//                       section,
//                       summary,
//                       isPromise,
//                       publicId,
//                       promiseDeadline,
//                       isPromiseFulfilled,
//                       isBookmarked,
//                       isCredible,
//                       dateIncidentStarted,
//                       dateIncidentResolved,
//                       isLiked,
//                     }: any) => {
//                       return (
//                         <div
//                           key={title}
//                           className="w-full sm:w-1/2 md:w-1/3 mt-10"
//                         >
//                           <Card
//                             section={section}
//                             articleTitle={title}
//                             summary={summary}
//                             date={date}
//                             promise={isPromise}
//                             imageUrl={image}
//                             deadline={promiseDeadline}
//                             id={publicId}
//                             isPromisedFulfilled={isPromiseFulfilled}
//                             isCredible={isCredible}
//                             isBookMarked={isBookmarked}
//                             isLiked={isLiked}
//                             isPublished
//                             dateIncidentStarted={dateIncidentStarted}
//                             dateIncidentResolved={dateIncidentResolved}
//                             link={`/latest-publications/${publicId}`}
//                           />
//                         </div>
//                       );
//                     }
//                   )}
//               </section>
//             </div>
//           )}
//         </>
//       </InfiniteScroll>

//       {isLoading && <p className="text-center py-4">Loading initial data...</p>}
//       {error && (
//         <p className="text-center py-4 text-red-500">Error: {error.message}</p>
//       )}
//     </div>
//   );
// };

// export default InfiniteScrollArticles;

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import EmptyPage from "./EmptyPage";

interface Article {
  title: string;
  date: string;
  image: string;
  section: string;
  summary: string;
  isPromise: boolean;
  publicId: string;
  promiseDeadline?: string;
  isPromiseFulfilled?: boolean;
  isBookmarked?: boolean;
  isCredible?: boolean;
  dateIncidentStarted?: string;
  dateIncidentResolved?: string;
  isLiked?: boolean;
}

type Props = {
  articlesData: Article[];
  setPageNumber: (prevPageNumber: any) => void;
  isLoading: boolean;
  error: Error | null;
};

const InfiniteScrollArticles = ({
  articlesData,
  setPageNumber,
  isLoading,
  error,
}: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (articlesData) {
      if (articlesData.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...articlesData]);
      } else {
        setHasMore(false);
      }
    }
  }, [articlesData]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPageNumber((prevPageNumber: any) => prevPageNumber + 1);
    }
  };

  return (
    <div className="p-4">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-4">
            <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
          </div>
        }
        endMessage={
          <p className="text-center py-4">
            <b>You have gotten to the end of the articles.</b>
          </p>
        }
      >
        {!isLoading && !error && articles.length < 1 ? (
          <EmptyPage />
        ) : (
          <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <div key={article.publicId} className="w-full">
                <Card
                  section={article.section}
                  articleTitle={article.title}
                  summary={article.summary}
                  date={article.date}
                  promise={article.isPromise}
                  imageUrl={article.image}
                  deadline={article.promiseDeadline}
                  id={article.publicId}
                  isPromisedFulfilled={article.isPromiseFulfilled}
                  isCredible={article.isCredible}
                  isBookMarked={article.isBookmarked}
                  isLiked={article.isLiked}
                  isPublished
                  dateIncidentStarted={article.dateIncidentStarted}
                  dateIncidentResolved={article.dateIncidentResolved}
                  link={`/latest-publications/${article.publicId}`}
                />
              </div>
            ))}
          </section>
        )}
      </InfiniteScroll>

      {isLoading && <p className="text-center py-4">Loading initial data...</p>}
      {error && (
        <p className="text-center py-4 text-red-500">Error: {error.message}</p>
      )}
    </div>
  );
};

export default InfiniteScrollArticles;
