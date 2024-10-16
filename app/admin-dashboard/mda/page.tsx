"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateMDA from "@/app/component/modals/CreateMDA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { MDAType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

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
  const [createMDA, setCreateMDA] = useState(false);

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

  const toggleModal = () => {
    setCreateMDA(!createMDA);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add MDA" onClick={toggleModal} />
      </div>
      <Table columns={columns} data={data} />

      <Modal show={createMDA} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateMDA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default MDA;
