"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import CreateState from "@/app/component/modals/CreateState";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { StateType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

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
  const [createStateModal, setCreateStateModal] = useState(false);
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

  const toggleModal = () => {
    setCreateStateModal(!createStateModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add State" onClick={toggleModal} />
      </div>
      <Table columns={columns} data={data} />

      <Modal show={createStateModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateState toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default State;
