import Image from "next/image";
import React from "react";
import bookMark from "../../public/bookMark.svg";
import heartOutline from "../../public/heartOutline.svg";
import coatOfArms from "../../../public/coatOfArms.svg";
import comments from "../../public/comments.svg";
import Text from "./Text";
import { truncateText } from "../utils";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: any;
}

const Card = ({
  section,
  articleTitle,
  summary,
  date,
  promise,
  imageUrl,
}: CardProps) => {
  return (
    <div className="max-w-72 bg-white dark:bg-black_100 border border-gray-200 rounded-lg shadow dark:border-black-100 mb-6">
      <div className="p-5">
        <Image src={imageUrl} alt="dummy image" />
        <Text
          variant="bodyTwo"
          className="pb-2 tracking-tight text-black_200 dark:text-white"
        >
          {section}
        </Text>

        <p className="font-medium text-black_100 dark:text-white w-[200]">
          {truncateText(articleTitle, 4)}
        </p>

        <p className="pb-2 font-normal text-black_100 dark:text-white w-[200]">
          {truncateText(summary, 7)}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-medium text-[13px">{date}</p>
          {promise && (
            <span className="bg-primary_DM dark:bg-primary_DM text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded  dark:text-gray-300">
              Promise
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Image src={heartOutline} alt="heartOutline" className="mr-2" />
            <Image src={comments} alt="comments" />
          </div>
          <Image src={bookMark} alt="bookMark" />
        </div>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary mt-5"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Card;
