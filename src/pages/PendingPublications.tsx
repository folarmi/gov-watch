/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../component/Loader";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import Card from "../component/Card";
import DashboardLayout from "../layouts/DashboardLayout";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import {
  getPublicationTypeByUserId,
  shouldFetchPublications,
  userTypeObject,
} from "../utils";
import { useState } from "react";

const PendingPublications = () => {
  const [isArticleBookMarked, setIsArticleBookMarked] =
    useState<boolean>(false);
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
  } = useGetData({
    url:
      userType === userTypeObject.contributor
        ? `${getPublicationTypeByUserId}${userId}&fetchAllSubmittedPublication=true&page=1&pageSize=10`
        : "Publications/GetAllPublications?fetchAllSubmittedPublication=true&page=1&pageSize=100",
    queryKey: ["GetAllPendingPublications", userType],
    enabled: shouldFetchPublications,
  });

  const createBookmarkMutation = useCustomMutation({
    endpoint: "UserBookmarks/CreateUserBookmark",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      // window.location.reload();
    },
  });

  const toggleBookMarkStatus = async (id: string) => {
    console.log(id);
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

  return (
    <DashboardLayout>
      <div className="">
        {pendingPublicationsLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-between">
            {pendingPublicationsData?.map(
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
                isBookMarked = false,
              }: any) => {
                return (
                  <Card
                    section={section}
                    articleTitle={title}
                    summary={summary}
                    date={date}
                    promise={isPromise}
                    imageUrl={image}
                    deadline={promiseDeadline}
                    link={`/dashboard/pending/${id || publicId}`}
                    isArticleBookMarked={isArticleBookMarked}
                    id={id || publicId}
                    // setIsArticleBookMarked={setIsArticleBookMarked}
                    onBookMarkClick={(id: string) => toggleBookMarkStatus(id)}
                    // isBookMarked={() => setIsArticleBookMarked(isBookMarked)}
                    isBookMarked={isBookMarked}
                    // imageUrl={coatOfArms}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export { PendingPublications };
