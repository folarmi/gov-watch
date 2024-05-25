"use client";

import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Table from "@/app/component/Table";
import { CategoriesType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const Categories = () => {
  const [data, setData] = React.useState<CategoriesType[]>([
    {
      categories: "Ministries",
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      post: 50,
    },
    {
      categories: "Agencies",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Departments",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Political Actors",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
  ]);

  const columnHelper = createColumnHelper<CategoriesType>();
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
    columnHelper.accessor("categories", {
      header: "Categories",
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
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Categories;
