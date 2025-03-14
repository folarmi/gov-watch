/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import Loader from "../component/Loader";
import Table from "../component/Table";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import CustomSelect from "../component/CustomSelect";
import { useForm } from "react-hook-form";
import { leaderboardFilter } from "../utils";

const ContributorLeaderboard = () => {
  const { control } = useForm();
  const [selectedFilter, setSelectedFilter] = useState("monthly");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });

  const { data: contributorLeaderBoardData, isLoading } = useGetData({
    url: `/LeaderBoards/GetContributorLeaderBoard?period=${selectedFilter}&pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllContributorLeaderBoardData", selectedFilter],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img src={info.getValue()} className="rounded-full h-12 w-12" />
      ),
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("score", {
      header: "Score",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("totalLikesCount", {
      header: "Total Likes Count",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("totalCommentsCount", {
      header: "Total Comments Count",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("totalPublicationsCount", {
      header: "Total Publications Count",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("totalViewsCount", {
      header: "Total Views Count",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("rank", {
      header: "Rank",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-4">
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
            data={contributorLeaderBoardData?.contributorLeaderBoardViewModel}
            rowCount={contributorLeaderBoardData?.totalCount || 0}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export { ContributorLeaderboard };
