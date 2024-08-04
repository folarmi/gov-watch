"use client";

import Table from "@/app/component/Table";
import { InboxType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import defaultAvatar from "../../../../public/defaultAvatar.svg";
import Image from "next/image";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Link from "next/link";

const AllInbox = () => {
  const [data, setData] = React.useState<InboxType[]>([
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

  const columnHelper = createColumnHelper<InboxType>();
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
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: "checkbox",
      cell: (props) => (
        <Link
          href="/admin-dashboard/all-inbox/123"
          className="text-sm font-normal text-primary"
        >
          View Message
        </Link>
      ),
    }),
  ];

  return (
    <div className="mt-10">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default AllInbox;
