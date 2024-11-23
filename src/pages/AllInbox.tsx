/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
// import defaultAvatar from "../../../../public/defaultAvatar.svg";
import Table from "../component/Table";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import DashboardLayout from "../layouts/DashboardLayout";
import { useGetData } from "../hooks/apiCalls";

const AllInbox = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: contactUsResponses, isLoading } = useGetData({
    url: `ContactUsResponses/GetContactUs?pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllContactUsResponses", JSON.stringify(pagination)],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
    columnHelper.display({
      id: "checkbox",
      cell: ({ row }) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
    }),
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("message", {
      header: "Message",
      cell: (info) => (
        <span className="text-sm font-normal whitespace-normal">
          {/* {info.getValue().slice(0, 10)} */}
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("isResolved", {
      header: "Status",
      cell: (info) => (
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg ${
            info.getValue() === true
              ? "bg-green_300 text-green_100"
              : "bg-red-300 text-red-700"
          }`}
        >
          {info.getValue() === true ? "Resolved" : "Unresolved"}
        </span>
      ),
    }),
  ];

  return (
    <DashboardLayout>
      <div className="mt-10">
        <Table
          columns={columns}
          data={contactUsResponses?.contactUsViewModel}
          isLoading={isLoading}
          rowCount={contactUsResponses?.totalCount || 0}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </DashboardLayout>
  );
};

export { AllInbox };
