/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Text from "./Text";
import { calculateTimeDifference, truncateText } from "../utils";
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
  setIsArticleBookMarked?: any;
  onBookMarkClick?: any;
  isBookMarked?: boolean;
  link?: string | Partial<Path>;
  isPublished?: boolean;
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
  setIsArticleBookMarked,
  isPublished,
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
    <div className="max-w-sm w-[300px] bg-white dark:bg-black_100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-3 overflow-hidden">
      <img
        // src={imageUrl}
        src="/coatOfArms.svg"
        alt="article thumbnail"
        className="w-full h-48 object-fit transition-transform duration-300 hover:scale-105"
      />
      <div className="p-5">
        <Text
          variant="bodyTwo"
          className="pb-1 uppercase text-xs tracking-wide text-primary dark:text-primary_light"
        >
          {section}
        </Text>

        <h3 className="font-semibold text-lg text-black_100 dark:text-white mb-2">
          {truncateText(articleTitle, 6)}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {truncateText(summary, 10)}
        </p>

        <div className="flex items-center justify-between mb-4">
          {promise && deadline && (
            <span
              className={`text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded ${
                timeDifference.includes("past") ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {timeDifference}
            </span>
          )}
        </div>

        <p className="font-medium text-xs text-gray-500">{date}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/heartOutline.svg" alt="Like" className="w-5 h-5" />
            <img src="/comments.svg" alt="Comments" className="w-5 h-5" />
          </div>

          {isPublished && (
            <div className="">
              <img
                onClick={() => onBookMarkClick(id)}
                src={
                  isArticleBookMarked ? "/filledBookMark.svg" : "/bookMark.svg"
                }
                alt="Bookmark"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          )}
        </div>

        <Link
          to={link || ""}
          className="mt-5 inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary_dark focus:ring-4 focus:outline-none focus:ring-primary_light transition-colors"
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
