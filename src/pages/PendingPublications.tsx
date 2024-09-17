/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import Card from "../component/Card";
import DashboardLayout from "../layouts/DashboardLayout";

const PendingPublications = () => {
  const {
    data: pendingPublicationsData,
    isLoading: pendingPublicationsLoading,
  } = useGetData({
    url: "Publications/GetAllPublications?fetchAllSubmittedPublication=true&page=1&pageSize=100",
    queryKey: ["GetAllPendingPublications"],
  });
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
              }: any) => {
                return (
                  <Link
                    to={`/dashboard/pending/${id}`}
                    key={id}
                    className="w-full sm:w-1/2 md:w-1/3 mt-10"
                  >
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                      // imageUrl={coatOfArms}
                    />
                  </Link>
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
