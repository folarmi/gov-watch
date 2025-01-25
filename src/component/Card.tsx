/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Text from "./Text";
import { calculateTimeDifference, scrollToTop, truncateText } from "../utils";
import { Link, Path } from "react-router-dom";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: string;
  deadline?: string;
  id: string;
  isArticleBookMarked?: any;
  isArticleLiked?: any;
  setIsArticleBookMarked?: any;
  onBookMarkClick?: any;
  onLikeClicked?: any;
  onCommentClicked?: any;
  isBookMarked?: boolean;
  link?: string | Partial<Path>;
  isPublished?: boolean;
  category?: string;
  selectedCard?: string;
  isCredible?: string;
}

const Card = ({
  section,
  articleTitle,
  summary,
  date,
  promise,
  id,
  link,
  deadline,
  isBookMarked,
  onBookMarkClick,
  isArticleBookMarked,
  onCommentClicked,
  isArticleLiked,
  onLikeClicked,
  setIsArticleBookMarked,
  isPublished,
  imageUrl,
  category,
  selectedCard,
  isCredible,
}: CardProps) => {
  const [timeDifference, setTimeDifference] = useState<string>("");

  useEffect(() => {
    if (deadline) {
      calculateTimeDifference(deadline, setTimeDifference);
      const interval = setInterval(() => {
        calculateTimeDifference(deadline, setTimeDifference);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deadline]);

  useEffect(() => {
    if (isBookMarked !== undefined) {
      setIsArticleBookMarked(isBookMarked);
    }
  }, [isBookMarked]);

  return (
    <div className="min-h-[550px] h-auto flex flex-col max-w-sm w-[300px]  bg-white dark:bg-black_100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-3 overflow-hidden">
      <img
        src={imageUrl}
        // src="/coatOfArms.svg"
        alt="article thumbnail"
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="flex-grow">
        <div className="p-5">
          <Text
            variant="bodyTwo"
            className="pb-1 uppercase text-xs tracking-wide text-primary dark:text-primary_light"
          >
            {section}
          </Text>

          {isCredible && (
            <span className="bg-green-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
              Credible
            </span>
          )}

          <h3 className="font-semibold text-lg text-black_100 dark:text-white my-2">
            {/* {truncateText(articleTitle, 6)} */}
            {articleTitle}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {truncateText(summary, 10)}
          </p>

          <div className="flex items-center justify-between mb-4">
            {promise && deadline && (
              <span
                className={`text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded ${
                  timeDifference.includes("past")
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {timeDifference}
              </span>
            )}
          </div>

          <p className="font-medium text-xs text-gray-500">{date}</p>

          {isPublished && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={
                    isArticleLiked ? "/heartOutline.svg" : "/heartOutline.svg"
                  }
                  alt="Like"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => onLikeClicked(id)}
                />
                <img
                  src="/comments.svg"
                  alt="Comments"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => onCommentClicked(id)}
                />
              </div>

              <div className="">
                <img
                  onClick={() => onBookMarkClick(id)}
                  src={
                    selectedCard === id && isArticleBookMarked
                      ? "/filledBookMark.svg"
                      : "/bookMark.svg"
                  }
                  alt="Bookmark"
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {category && (
            <div className="tag">
              <span className="bg-primary text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-4">
        <Link
          to={link || ""}
          onClick={scrollToTop}
          className="mb-4  flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary_dark focus:ring-4 focus:outline-none focus:ring-primary_light transition-colors"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
