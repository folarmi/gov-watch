import { useGetDataById } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Display from "../component/Display";

const BookMarks = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: bookMarksData, isLoading: bookMarksDataIsLoading } =
    useGetDataById({
      url: `UserBookmarks/GetAllUserBookmarksByUserId?userId=${userId}&pageNumber=1&pageSize=100`,
      queryKey: ["GetAllUserBookmarksByUserId"],
      enabled: !!userId,
    });

  return (
    <DashboardLayout>
      <Display
        loadingState={bookMarksDataIsLoading}
        moduleData={bookMarksData}
      />
    </DashboardLayout>
  );
};

export { BookMarks };
