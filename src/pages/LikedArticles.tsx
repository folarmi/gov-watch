import Display from "../component/Display";
import { useGetDataById } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const LikedArticles = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: likedArticlesData, isLoading: likedArticlesIsLoading } =
    useGetDataById({
      url: `PublicationLikers/GetAllPublicationsLikedByUserId?userId=${userId}&pageNumber=1&pageSize=100`,
      queryKey: ["GetAllPublicationsLikedByUserId"],
      enabled: !!userId,
    });
  return (
    <DashboardLayout>
      <Display
        loadingState={likedArticlesIsLoading}
        moduleData={likedArticlesData}
      />
    </DashboardLayout>
  );
};

export { LikedArticles };
