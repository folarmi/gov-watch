"use client";

import Table from "@/app/component/Table";
import { UserType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import defaultAvatar from "../../../../public/defaultAvatar.svg";
import Image from "next/image";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";

const ManageUsers = () => {
  const [data, setData] = React.useState<UserType[]>([
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: true,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: false,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: true,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: false,
      lastLogin: "March 14,2024 13:59 PM",
    },
  ]);

  const columnHelper = createColumnHelper<UserType>();
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
    columnHelper.display({
      id: "actions",
      cell: () => <Image src={defaultAvatar} alt="default avatar" />,
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("post", {
      header: "Post",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg ${
            info.getValue() === true
              ? "bg-green_300 text-green_100"
              : "bg-red-300 text-red-700"
          }`}
        >
          {info.getValue() === true ? "Active" : "Inactive"}
        </span>
      ),
    }),
    columnHelper.accessor("lastLogin", {
      header: "Last Login",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ManageUsers;
