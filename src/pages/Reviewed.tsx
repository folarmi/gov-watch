/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../component/Card";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";

const Reviewed = () => {
  const {
    data: reviewedPublicationsData,
    isLoading: reviewedPublicationsLoading,
  } = useGetData({
    url: "Publications/GetAllPublications?fetchAllReviewedPublication=true&page=1&pageSize=10",
    queryKey: ["GetAllPendingPublications"],
  });
  return (
    <DashboardLayout>
      <div>
        {reviewedPublicationsLoading ? (
          <Loader />
        ) : (
          <div>
            {reviewedPublicationsData?.map(
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
                  <div key={id} className="w-full sm:w-1/2 md:w-1/3">
                    <Card
                      section={section}
                      articleTitle={title}
                      summary={summary}
                      date={date}
                      promise={isPromise}
                      imageUrl={image}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reviewed;
