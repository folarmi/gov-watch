/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Loader from "../component/Loader";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import {
  getPublicationTypeByUserId,
  shouldFetchPublications,
  userTypeObject,
} from "../utils";

const TotalArticles = () => {
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const { data: totalPublicationsData, isLoading: totalPublicationsLoading } =
    useGetData({
      url:
        userType === userTypeObject.contributor
          ? `${getPublicationTypeByUserId}${userId}&fetchAllPublication=true&page=1&pageSize=10`
          : "Publications/GetAllPublications?fetchAllPublication=true&page=1&pageSize=10",
      queryKey: ["GetAllTotalPublications", userType],
      enabled: shouldFetchPublications,
    });

  return (
    <>
      {totalPublicationsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout>
          <div className="flex flex-wrap justify-between">
            {totalPublicationsData?.map(
              ({
                title,
                date,
                image,
                section,
                summary,
                isPromise,
                id,
                publicId,
                isCredible,
              }: any) => {
                return (
                  <Link
                    to={`/dashboard/published/${id || publicId}`}
                    key={id}
                    className="w-full sm:w-1/2 md:w-1/3 mt-10"
                  >
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      isCredible={isCredible}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                      id={id}
                      link={`/dashboard/published/${id || publicId}`}
                      // imageUrl={coatOfArms}
                    />
                  </Link>
                );
              }
            )}
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export { TotalArticles };
