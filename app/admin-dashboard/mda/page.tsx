"use client";

import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Table from "@/app/component/Table";
import { MDAType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const MDA = () => {
  const [data, setData] = React.useState<MDAType[]>([
    {
      mdaCode: "37001",
      ministries: "Federal Ministry Of Industry,Trade And Investments",
      departments: "Federal Ministry Of Industry,Trade And Investments",
      agencies: "Phs, Yola",
    },
    {
      mdaCode: "37001",
      ministries: "Federal Ministry Of Industry,Trade And Investments",
      departments: "Federal Ministry Of Industry,Trade And Investments",
      agencies: "Phs, Yola",
    },
    {
      mdaCode: "37001",
      ministries: "Federal Ministry Of Industry,Trade And Investments",
      departments: "Federal Ministry Of Industry,Trade And Investments",
      agencies: "Phs, Yola",
    },
  ]);

  const columnHelper = createColumnHelper<MDAType>();
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
    columnHelper.accessor("mdaCode", {
      header: "MDA Code",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("ministries", {
      header: "Ministries",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("departments", {
      header: "Department",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("agencies", {
      header: "Agencies",
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

export default MDA;
