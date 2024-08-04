"use client";

import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Table from "@/app/component/Table";
import { StateType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const State = () => {
  const [data, setData] = React.useState<StateType[]>([
    {
      state: "Abia",
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      post: 50,
    },
    {
      state: "Adamawa",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      state: "Akwa Ibom",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      state: "Calabar",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
  ]);

  const columnHelper = createColumnHelper<StateType>();
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
    columnHelper.accessor("state", {
      header: "State",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("about", {
      header: "About",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("post", {
      header: "Post",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  return (
    <div className="mt-10">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default State;
