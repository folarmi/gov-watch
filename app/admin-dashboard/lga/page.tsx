"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateLGA from "@/app/component/modals/CreateLGA";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { LGAType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const LGA = () => {
  const [createLGAModal, setCreateLGAModal] = useState(false);
  const [data, setData] = React.useState<LGAType[]>([
    {
      lga: "Aba North",
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      post: 50,
    },
    {
      lga: "Aba South",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      lga: "Arochukwu",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      lga: "Bogoro",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
  ]);

  const columnHelper = createColumnHelper<LGAType>();
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
    columnHelper.accessor("lga", {
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

  const toggleModal = () => {
    setCreateLGAModal(!createLGAModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add LGA" onClick={toggleModal} />
      </div>
      <Table columns={columns} data={data} />

      <Modal show={createLGAModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateLGA toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LGA;
