// import Text from "./Text";
// import { truncateText } from "../utils";

// interface CardProps {
//   section: string;
//   articleTitle: string;
//   summary: string;
//   date: string;
//   promise: boolean;
//   imageUrl: string;
// }

// const Card = ({
//   section,
//   articleTitle,
//   summary,
//   date,
//   promise,
//   imageUrl,
// }: CardProps) => {
//   return (
//     <div className="max-w-72 bg-white dark:bg-black_100 border border-gray-200 rounded-lg shadow dark:border-black-100 mb-6 cursor-pointer">
//       <div className="p-5">
//         <img src={imageUrl} alt="dummy image" width={600} height={600} />
//         <Text
//           variant="bodyTwo"
//           className="pb-2 tracking-tight text-black_200 dark:text-white"
//         >
//           {section}
//         </Text>

//         <p className="font-medium text-black_100 dark:text-white w-[200]">
//           {truncateText(articleTitle, 4)}
//         </p>

//         <p className="pb-2 font-normal text-black_100 dark:text-white w-[200]">
//           {truncateText(summary, 7)}
//         </p>

//         <div className="flex items-center justify-between">
//           <p className="font-medium text-[13px">{date}</p>
//           {promise && (
//             <span className="bg-primary_DM dark:bg-primary_DM text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded  dark:text-gray-300">
//               Promise
//             </span>
//           )}
//         </div>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center">
//             <img src="/heartOutline.svg" alt="heartOutline" className="mr-2" />
//             <img src="/comments.svg" alt="comments" />
//           </div>
//           <img src="/bookMark.svg" alt="bookMark" />
//         </div>

//         <a
//           href="#"
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary mt-5"
//         >
//           Read more
//           <svg
//             className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 5h12m0 0L9 1m4 4L9 9"
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Card;

// import Text from "./Text";
// import { truncateText } from "../utils";
// import { useState, useEffect } from "react";
// import dayjs from "dayjs";

// interface CardProps {
//   section: string;
//   articleTitle: string;
//   summary: string;
//   date: string;
//   promise: boolean;
//   imageUrl: string;
//   deadline?: string;
// }

// const Card = ({
//   section,
//   articleTitle,
//   summary,
//   date,
//   promise,
//   imageUrl,
//   deadline,
// }: CardProps) => {
//   const [timeDifference, setTimeDifference] = useState("");
//   const [isPastDeadline, setIsPastDeadline] = useState(false);

//   useEffect(() => {
//     const calculateTimeDifference = () => {
//       const currentDate = dayjs();
//       const deadlineDate = dayjs(deadline);
//       const diff = deadlineDate.diff(currentDate, "day");

//       if (diff > 0) {
//         setTimeDifference(`${diff} day(s) remaining`);
//         setIsPastDeadline(false);
//       } else {
//         setTimeDifference(`${Math.abs(diff)} day(s) overdue`);
//         setIsPastDeadline(true);
//       }
//     };

//     calculateTimeDifference();
//     const interval = setInterval(calculateTimeDifference, 1000 * 60 * 60 * 24); // Updates every day

//     return () => clearInterval(interval);
//   }, [deadline]);

//   return (
//     <div className="max-w-72 bg-white dark:bg-black_100 border border-gray-200 rounded-lg shadow dark:border-black-100 mb-6 cursor-pointer">
//       <div className="p-5">
//         <img src={imageUrl} alt="dummy image" width={600} height={600} />
//         <Text
//           variant="bodyTwo"
//           className="pb-2 tracking-tight text-black_200 dark:text-white"
//         >
//           {section}
//         </Text>

//         <p className="font-medium text-black_100 dark:text-white w-[200]">
//           {truncateText(articleTitle, 4)}
//         </p>

//         <p className="pb-2 font-normal text-black_100 dark:text-white w-[200]">
//           {truncateText(summary, 7)}
//         </p>

//         <div className="flex items-center justify-between">
//           <p className="font-medium text-[13px]">{date}</p>
//           {promise && (
//             <span className="bg-primary_DM dark:bg-primary_DM text-white text-xs font-bold me-2 px-2.5 py-0.5 rounded dark:text-gray-300">
//               Promise
//             </span>
//           )}
//         </div>

//         {promise && (
//           <p
//             className={`font-medium mt-2 text-sm ${
//               isPastDeadline ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {timeDifference}
//           </p>
//         )}

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center">
//             <img src="/heartOutline.svg" alt="heartOutline" className="mr-2" />
//             <img src="/comments.svg" alt="comments" />
//           </div>
//           <img src="/bookMark.svg" alt="bookMark" />
//         </div>

//         <a
//           href="#"
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary mt-5"
//         >
//           Read more
//           <svg
//             className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 5h12m0 0L9 1m4 4L9 9"
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React, { useEffect, useState } from "react";
import Text from "./Text";
import { truncateText } from "../utils";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: string;
  deadline?: string; // Add the deadline prop
}

const Card = ({
  section,
  articleTitle,
  summary,
  date,
  promise,
  imageUrl,
  deadline,
}: CardProps) => {
  const [timeDifference, setTimeDifference] = useState<string>("");

  // Function to calculate the time difference
  const calculateTimeDifference = () => {
    if (!deadline) return;

    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    const difference = deadlineDate.getTime() - currentDate.getTime();

    const isPastDeadline = difference < 0;

    // Convert the difference to absolute value for formatting
    const diff = Math.abs(difference);

    // Calculate days, hours, and minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Set time difference string and indicate whether it's past the deadline
    if (isPastDeadline) {
      setTimeDifference(
        `${days}d ${hours}h ${minutes}m ${seconds}s past the deadline`
      );
    } else {
      setTimeDifference(
        `${days}d ${hours}h ${minutes}m ${seconds}s to the deadline`
      );
    }
  };

  // Use useEffect to continuously update the time difference
  useEffect(() => {
    if (deadline) {
      calculateTimeDifference(); // Initial calculation

      const interval = setInterval(() => {
        calculateTimeDifference();
        // }, 60000); // Update every 1 minute
      }, 1000); // Update every second for accurate countdown

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [deadline]);

  return (
    <div className="max-w-72 bg-white dark:bg-black_100 border border-gray-200 rounded-lg shadow dark:border-black-100 mb-6 cursor-pointer">
      <div className="p-5">
        <img src={imageUrl} alt="dummy image" width={600} height={600} />
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
          <p className="font-medium text-[13px]">{date}</p>
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

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <img src="/heartOutline.svg" alt="heartOutline" className="mr-2" />
            <img src="/comments.svg" alt="comments" />
          </div>
          <img src="/bookMark.svg" alt="bookMark" />
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
