"use client";

import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Table from "@/app/component/Table";
import { RegionType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const Region = () => {
  const [data, setData] = React.useState<RegionType[]>([
    {
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      regions: "North Central (NC)",
    },
    {
      about: "Lorem ipsum dolor sit amet consectetur.",
      regions: "North East (NE)",
    },
    {
      about: "Lorem ipsum dolor sit amet consectetur.",
      regions: "North West (NW)",
    },
    {
      about: "Lorem ipsum dolor sit amet consectetur.",
      regions: "North Central (NC)",
    },
  ]);

  const columnHelper = createColumnHelper<RegionType>();
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
    columnHelper.accessor("regions", {
      header: "Regions",
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
  ];

  return (
    <div className="mt-10">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Region;
