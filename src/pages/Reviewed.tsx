import Display from "../component/Display";
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
      <Display
        loadingState={reviewedPublicationsLoading}
        moduleData={reviewedPublicationsData}
      />
    </DashboardLayout>
  );
};

export default Reviewed;
