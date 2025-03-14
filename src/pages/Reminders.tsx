/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import Loader from "../component/Loader";
import Table from "../component/Table";
import DashboardLayout from "../layouts/DashboardLayout";
import { useGetData } from "../hooks/apiCalls";
import { useState } from "react";
import { capitalize } from "../utils";
import moment from "moment";

const Reminders = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });

  const { data: reminderData, isLoading } = useGetData({
    url: `Reminders/GetReminders?isDeleted=false&pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllReminders"],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("publicationTitle", {
      header: "Title",
      cell: (info) => (
        <span className="text-sm font-normal">
          {capitalize(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("dueDate", {
      header: "DueDate",
      cell: (info) => (
        <span className="text-sm font-normal">
          {moment(info.getValue()).format("DD-MM-YYYY")}
        </span>
      ),
    }),
  ];

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-2">
            <Table
              columns={columns}
              data={reminderData?.reminderViewModel}
              rowCount={reminderData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { Reminders };
