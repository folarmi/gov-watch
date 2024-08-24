"use client";

import AdminButton from "@/app/component/forms/AdminButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Loader from "@/app/component/Loader";
import CreateRegion from "@/app/component/modals/CreateRegion";
import Modal from "@/app/component/modals/Modal";
import Table from "@/app/component/Table";
import { useGetData } from "@/app/hooks/apiCalls";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Region = () => {
  const { data: regionData, isLoading } = useGetData({
    url: "Regions/GetAllRegions",
    queryKey: ["GetAllRegions"],
  });
  const [createRegion, setCreateRegion] = useState(false);

  const columnHelper = createColumnHelper<any>();
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
    columnHelper.accessor("name", {
      header: "Region Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreateRegion(!createRegion);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <div className="flex justify-end w-full mb-4">
            <AdminButton buttonText="Add Region" onClick={toggleModal} />
          </div>

          <div className="w-1/2">
            <Table columns={columns} data={regionData?.regionViewModel} />
          </div>

          <Modal show={createRegion} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateRegion toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Region;
