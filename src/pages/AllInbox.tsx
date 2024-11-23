/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import React, { useState } from "react";
// import defaultAvatar from "../../../../public/defaultAvatar.svg";
import { InboxType } from "../types/generalTypes";
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
  const [data] = React.useState<InboxType[]>([
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      subject: "I WANT TO UNDERSTAND",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      subject: "I WANT TO UNDERSTAND",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      subject: "I WANT TO UNDERSTAND",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      subject: "I WANT TO UNDERSTAND",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      subject: "I WANT TO UNDERSTAND",
    },
  ]);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
    columnHelper.display({
      id: "checkbox",
      cell: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
    }),
    columnHelper.accessor("socialMediaLink", {
      header: "Social Media",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("otherInformation", {
      header: "Other Info",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: (info) => (
        <span className="text-sm font-normal">
          {/* {moment(info.getValue()).format("YYYY-MM-DD")} */}
        </span>
      ),
    }),
  ];

  return (
    <DashboardLayout>
      <div className="mt-10">
        <Table
          columns={columns}
          data={data}
          isLoading={isLoading}
          rowCount={data}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </DashboardLayout>
  );
};

export { AllInbox };
