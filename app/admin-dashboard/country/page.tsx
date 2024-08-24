"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateCountry from "@/app/component/modals/CreateCountry";
// import CreateCountry from "@/app/component/modals/CreateCountry";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { RegionType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Country = () => {
  const [data, setData] = React.useState<any[]>([
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
  const [createCountry, setCreateCountry] = useState(false);

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
      header: "Country",
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

  const toggleModal = () => {
    setCreateCountry(!createCountry);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Country" onClick={toggleModal} />
      </div>
      <Table columns={columns} data={data} />

      <Modal show={createCountry} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateCountry toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Country;
