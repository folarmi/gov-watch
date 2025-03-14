/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Text from "./Text";
import {
  calculateIncidentDuration,
  calculateTimeDifference,
  scrollToTop,
  truncateText,
} from "../utils";
import { Link, Path } from "react-router-dom";
import { useCustomMutation } from "../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { Bell, Heart } from "lucide-react";
import Modal from "./modals/Modal";
import { CreateReminder } from "./modals/CreateReminder";

interface CardProps {
  section: string;
  articleTitle: string;
  summary: string;
  date: string;
  promise: boolean;
  imageUrl: string;
  deadline?: string;
  id: string;
  isBookMarked?: boolean;
  isLiked?: boolean;
  link?: string | Partial<Path>;
  isPublished?: boolean;
  category?: string;
  isCredible?: boolean;
  isPromisedFulfilled?: boolean;
  dateIncidentStarted?: string;
  dateIncidentResolved?: string;
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
  isPublished,
  imageUrl,
  category,
  isCredible,
  isPromisedFulfilled,
  isLiked,
  isBookMarked,
  dateIncidentStarted,
  dateIncidentResolved,
}: CardProps) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const [timeDifference, setTimeDifference] = useState<string>("");
  const [incidentTimeDiff, setIncidentTimeDiff] = useState<string>("");
  const [isPublicationLiked, setIsPublicationLiked] = useState(isLiked);
  const [isArticleBookMarked, setIsArticleBookMarked] = useState<
    boolean | undefined
  >(isBookMarked);
  const [createReminder, setCreateReminder] = useState(false);

  const toggleCreateReminder = () => {
    if (!isAuthenticated) {
      toast("Please sign in to create a reminder");
      return;
    }
    setCreateReminder(!createReminder);
  };

  const createBookmarkMutation = useCustomMutation({
    endpoint: "UserBookmarks/CreateUserBookmark",
    // successMessage: (data: any) => data?.remark,
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetlatestPublications"],
        exact: false,
      });
    },
  });

  const likeBookmarkMutation = useCustomMutation({
    endpoint: "PublicationLikers/LikePublication",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetlatestPublications"],
        exact: false,
      });
    },
  });

  const toggleBookMarkStatus = async () => {
    if (!isAuthenticated) {
      toast("Please sign in to bookmark an article");
      return;
    }

    const formData = {
      userPublicId: userId,
      publicationPublicId: id,
    };

    setIsArticleBookMarked((prev) => !prev);

    try {
      await createBookmarkMutation.mutateAsync(formData);
    } catch (error) {
      setIsArticleBookMarked((prev) => !prev);
    }
  };

  const toggleLikedStatus = async () => {
    if (!isAuthenticated) {
      toast("Please sign in to like an article");
      return;
    }

    const formData = {
      userPublicId: userId,
      publicationPublicId: id,
      isLike: true,
    };

    setIsPublicationLiked((prev) => !prev);

    try {
      await likeBookmarkMutation.mutateAsync(formData);
    } catch (error) {
      setIsPublicationLiked((prev) => !prev);
    }
  };

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
    // Calculate the duration immediately
    const durationString = calculateIncidentDuration(
      dateIncidentStarted,
      dateIncidentResolved
    );
    setIncidentTimeDiff(durationString);

    // If the incident is ongoing (no resolvedDate), set up an interval to update the duration every second
    if (!dateIncidentResolved) {
      const interval = setInterval(() => {
        const updatedDuration = calculateIncidentDuration(
          dateIncidentStarted,
          dateIncidentResolved
        );
        setIncidentTimeDiff(updatedDuration);
      }, 1000);

      // Clean up the interval when the component unmounts or the resolvedDate changes
      return () => clearInterval(interval);
    }
  }, [dateIncidentStarted, dateIncidentResolved]);

  return (
    <div className="min-h-[650px] w-[300px] h-auto bg-white dark:bg-black_100 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-3 flex flex-col">
      {/* Article Image */}
      <img
        src={imageUrl}
        alt="article thumbnail"
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="p-5 flex-grow">
        {/* Section Label */}
        <Text
          variant="bodyTwo"
          className="pb-1 uppercase text-xs text-primary dark:text-primary_light"
        >
          {section}
        </Text>

        {/* Interaction Icons */}
        {isPublished && (
          // <div className="flex items-center justify-between mt-4">
          <div className="flex items-center justify-between pb-4 mt-auto">
            <div className="flex items-center space-x-2">
              <Heart
                onClick={() => toggleLikedStatus()}
                className={`w-5 h-5 ${
                  isPublicationLiked
                    ? "fill-primary text-primary cursor-pointer"
                    : "text-gray-500"
                }`}
              />

              <img
                src="/comments.svg"
                alt="Comments"
                className="w-5 h-5 cursor-pointer"
                // onClick={() => onCommentClicked?.(id)}
              />
            </div>

            <div className="flex items-center">
              <Bell
                onClick={() => toggleCreateReminder()}
                className="w-6 h-6 mr-1 text-gray-600 cursor-pointer hover:text-primary"
              />
              <img
                src={
                  isArticleBookMarked ? "/filledBookMark.svg" : "/bookMark.svg"
                }
                alt="Bookmark"
                className="w-5 h-5 cursor-pointer"
                onClick={() => toggleBookMarkStatus()}
              />
            </div>
          </div>
        )}

        {/* Credibility Status */}
        <div className="flex items-center justify-between">
          <span
            className={`text-white text-xs font-medium px-2.5 py-0.5 rounded-sm ${
              isCredible ? "bg-green-500 dark:bg-green-900" : "bg-red-500"
            }`}
          >
            {isCredible ? "Credible" : "Not Credible"}
          </span>

          {/* Article Date */}
          <p className="font-medium text-xs text-gray-500">{date}</p>
        </div>

        {/* Article Title */}
        <h3 className="font-semibold text-lg text-black_100 dark:text-white my-2">
          {articleTitle}
        </h3>

        {/* Article Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {truncateText(summary, 10)}
        </p>

        {/* Promise Status */}
        {promise && !isPromisedFulfilled && (
          <div className="flex items-center justify-between mb-4">
            {deadline && (
              <span
                className={`text-white text-xs font-bold px-2.5 py-0.5 rounded ${
                  timeDifference.includes("past")
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {timeDifference}
              </span>
            )}
          </div>
        )}

        {/* Incident Status */}
        {dateIncidentStarted !== null && dateIncidentResolved === null && (
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-white text-xs font-bold px-2.5 py-0.5 rounded ${
                incidentTimeDiff.includes("past")
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {incidentTimeDiff}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          {/* Fulfilled Promise */}
          {isPromisedFulfilled && (
            <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-sm">
              Promise Fulfilled
            </span>
          )}

          {/* Resolved Incident */}
          {dateIncidentResolved &&
            new Date(dateIncidentResolved) >= new Date() && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-sm">
                Incident Resolved
              </span>
            )}

          {/* Category Tag */}
          {category && (
            <span className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Read More Button */}
      <div className="mx-4 mb-8">
        <Link
          to={link || ""}
          onClick={scrollToTop}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary_dark"
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>

      <Modal show={createReminder} toggleModal={toggleCreateReminder}>
        <div className="p-4">
          <CreateReminder
            toggleModal={toggleCreateReminder}
            publicationPublicId={id}
            publicationTitle={articleTitle}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Card;
