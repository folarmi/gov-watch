/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import CustomSelect from "../component/CustomSelect";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { leaderboardFilter } from "../utils";
import Table from "../component/Table";
import { useState } from "react";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";

const Leaderboard = () => {
  const { control } = useForm();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const [selectedFilter, setSelectedFilter] = useState("daily");

  const { data: leaderBoardData, isLoading } = useGetData({
    url: `/LeaderBoards/GetPublicationLeaderBoard?period=${selectedFilter}&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllLeaderBoardData", selectedFilter],
  });

  const columnHelper = createColumnHelper<any>();

  const TextCell = ({
    value,
    maxLength,
    className = "",
  }: {
    value: any;
    maxLength?: number;
    className?: string;
  }) => {
    const displayValue =
      maxLength && typeof value === "string" && value.length > maxLength
        ? `${value.slice(0, maxLength)}…`
        : value ?? "N/A";

    return (
      <span className={`text-sm font-normal ${className}`} title={value}>
        {displayValue}
      </span>
    );
  };

  const columns = [
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="User profile"
          className="rounded-full h-12 w-12 object-cover border border-gray-200 shadow-sm"
        />
      ),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => (
        <TextCell
          value={info.getValue()}
          maxLength={50}
          className="font-medium text-black"
        />
      ),
    }),
    columnHelper.accessor("snippet", {
      header: "Snippet",
      cell: (info) => (
        <TextCell
          value={info.getValue()}
          maxLength={100}
          className="text-gray-600"
        />
      ),
    }),
    columnHelper.accessor("score", {
      header: "Score",
      cell: (info) => (
        <TextCell value={info.getValue()} className="text-green-500" />
      ),
    }),
    // columnHelper.accessor("likesCount", {
    //   header: "Total Likes Count",
    //   cell: (info) => <TextCell value={info.getValue()} />,
    // }),
    // columnHelper.accessor("commentsCount", {
    //   header: "Total Comments Count",
    //   cell: (info) => <TextCell value={info.getValue()} />,
    // }),
    // columnHelper.accessor("totalViewsCount", {
    //   header: "Total Views Count",
    //   cell: (info) => <TextCell value={info.getValue()} />,
    // }),
    columnHelper.accessor("rank", {
      header: "Rank",
      cell: (info) => (
        <TextCell value={info.getValue()} className="font-bold" />
      ),
    }),
  ];

  return (
    <OuterPage>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-4 mx-auto w-3/4 mb-16">
          <form className="w-1/4 mr-8 mb-4 flex">
            <CustomSelect
              name="country"
              options={leaderboardFilter}
              isLoading={false}
              label="Filter By"
              control={control}
              placeholder="Select Filter"
              customOnChange={(name: any) => setSelectedFilter(name?.value)}
            />
          </form>

          <Table
            columns={columns}
            data={leaderBoardData?.publicationLeaderBoardViewModel}
            rowCount={leaderBoardData?.totalCount || 0}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      )}
    </OuterPage>
  );
};

export { Leaderboard };
