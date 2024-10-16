import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
// import defaultAvatar from "../../../../public/defaultAvatar.svg";
import { InboxType } from "../types/generalTypes";
import Table from "../component/Table";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import DashboardLayout from "../layouts/DashboardLayout";

const AllInbox = () => {
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
      cell: () => <img src="/defaultAvatar.svg" alt="default avatar" />,
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
    // columnHelper.display({
    //   id: "checkbox",
    //   cell: (props) => (
    //     <Link
    //       to="/admin-dashboard/all-inbox/123"
    //       className="text-sm font-normal text-primary"
    //     >
    //       View Message
    //     </Link>
    //   ),
    // }),
  ];

  return (
    <DashboardLayout>
      <div className="mt-10">
        <Table columns={columns} data={data} />
      </div>
    </DashboardLayout>
  );
};

export { AllInbox };
