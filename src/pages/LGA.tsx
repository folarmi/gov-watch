/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateLGA from "../component/modals/CreateLGA";
import Loader from "../component/Loader";
import DashboardLayout from "../layouts/DashboardLayout";

const LGA = () => {
  const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: lgaData, isLoading } = useGetData({
    url: `/Lgas/GetAllLgas?country=${userCountry}&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllLgas"],
  });

  const [createLGAModal, setCreateLGAModal] = useState(false);

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
    // columnHelper.accessor("image", {
    //   header: "Image",
    //   cell: (info) => <span className="text-sm font-normal">ggg</span>,
    // }),
    columnHelper.accessor("name", {
      header: "LGA",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("capital", {
      header: "Capital",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("chairman", {
      header: "Governor",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreateLGAModal(!createLGAModal);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add LGA" onClick={toggleModal} />
            </div>
            <Table
              columns={columns}
              data={lgaData?.lgaViewModel}
              isLoading={isLoading}
            />

            <Modal show={createLGAModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateLGA toggleModal={toggleModal} />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { LGA };
