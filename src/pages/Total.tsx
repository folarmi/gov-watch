/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";

const TotalArticles = () => {
  const { data: totalPublicationsData, isLoading: totalPublicationsLoading } =
    useGetData({
      url: "Publications/GetAllPublications?fetchAllPublication=true&page=1&pageSize=10",
      queryKey: ["GetAllTotalPublications"],
    });

  return (
    <DashboardLayout>
      <p>page</p>
    </DashboardLayout>
  );
};

export { TotalArticles };
