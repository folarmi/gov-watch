import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";

const Leaderboard = () => {
  const { data: leaderBoardData, isLoading } = useGetData({
    url: `/LeaderBoards/GetPublicationLeaderBoard?period=all_time&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllLeaderBoardData"],
  });

  console.log(leaderBoardData);

  return (
    <OuterPage>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p>Leaderboard</p>
        </div>
      )}
    </OuterPage>
  );
};

export { Leaderboard };
