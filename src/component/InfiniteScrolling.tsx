/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyPage from "./EmptyPage";
import clsx from "clsx";

type Props<T> = {
  data: T[];
  setPageNumber: (prevPageNumber: any) => void;
  isLoading: boolean;
  pageNumber: number;
  error: Error | null;
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  pageSize: number;
  colSize?: number;
};

const InfiniteScrolling = <T,>({
  data,
  setPageNumber,
  isLoading,
  error,
  pageNumber,
  renderItem,
  keyExtractor,
  pageSize,
  colSize = 3,
}: Props<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   if (!data || !Array.isArray(data)) {
  //     setHasMore(false);
  //     return;
  //   }

  //   if (data) {
  //     // Reset articles when pageNumber is 1 (new search)
  //     if (pageNumber === 1) {
  //       setItems(data);
  //       setHasMore(true); // Reset pagination state
  //     } else {
  //       // Append for infinite scroll
  //       setItems((prevItems) => [...prevItems, ...data]);
  //     }
  //     // Detect no more articles
  //     if (data?.length === 0 || data.length < pageSize || data === null) {
  //       setHasMore(false);
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    // Handle non-array or invalid data
    if (!Array.isArray(data)) {
      setHasMore(false);
      return;
    }

    // Handle empty data array
    if (data.length === 0) {
      if (pageNumber === 1) {
        setItems([]);
      }
      setHasMore(false);
      return;
    }

    // Normal data handling
    if (pageNumber === 1) {
      setItems(data);
      setHasMore(data.length >= pageSize);
    } else {
      setItems((prev) => [...prev, ...data]);
      setHasMore(data.length >= pageSize);
    }
  }, [data, pageNumber, pageSize]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPageNumber((prevPageNumber: any) => prevPageNumber + 1);
    }
  };

  return (
    <div className="p-4">
      <InfiniteScroll
        dataLength={items?.length}
        style={{
          overflow: "hidden",
        }}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-4">
            <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
          </div>
        }
        endMessage={
          <p className="text-center py-6 text-gray-600 font-semibold text-lg italic">
            You've reached the end 🎉
          </p>
        }
      >
        {!isLoading && !error && items.length < 1 ? (
          <EmptyPage />
        ) : (
          // <section
          //   className={`mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${colSize} xl:grid-cols-${colSize}`}
          // >
          //   {items?.map((item) => (
          //     <div key={keyExtractor(item)} className="w-full">
          //       {renderItem(item)}
          //     </div>
          //   ))}
          // </section>
          <section
            style={{ "--cols": colSize } as React.CSSProperties}
            className={clsx(
              "mt-10 grid gap-6",
              "grid-cols-1", // Default 1 column
              "sm:grid-cols-2", // 2 columns on small screens
              "lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]", // Dynamic on large
              "xl:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" // Dynamic on xlarge
            )}
          >
            {items?.map((item) => (
              <div key={keyExtractor(item)} className="w-full">
                {renderItem(item)}
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

export { InfiniteScrolling };
