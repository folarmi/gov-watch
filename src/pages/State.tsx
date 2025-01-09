/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useGetData } from "../hooks/apiCalls";
// import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateState from "../component/modals/CreateState";
import DashboardLayout from "../layouts/DashboardLayout";

const State = () => {
  const [createStateModal, setCreateStateModal] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedState, setSelectedState] = useState("");

  const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: stateData, isLoading } = useGetData({
    url: `States/GetAllStates?country=${userCountry}&pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllStatesTable", JSON.stringify(pagination)],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
    // columnHelper.display({
    //   id: "checkbox",
    //   cell: ({ table }) => (
    //     <IndeterminateCheckbox
    //       checked={table.getIsAllRowsSelected()}
    //       indeterminate={table.getIsSomeRowsSelected()}
    //       onChange={table.getToggleAllRowsSelectedHandler()}
    //     />
    //   ),
    // }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img src={info.getValue()} className="rounded-full h-12 w-12" />
      ),
    }),
    columnHelper.accessor("name", {
      header: "State",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("capital", {
      header: "Capital",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("governor", {
      header: "Governor",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("population", {
      header: "Population",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("landMass", {
      header: "Land Mass",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("publicId", {
      header: "Action",
      cell: (info) => {
        const rowData = info.row.original;

        return (
          <div className="flex space-x-4">
            <button
              onClick={() => {
                toggleModal();
                setSelectedState(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
          </div>
        );
      },
    }),
  ];

  const toggleModal = () => {
    setSelectedState("");
    setCreateStateModal(!createStateModal);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-2">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add States" onClick={toggleModal} />
            </div>
            <Table
              columns={columns}
              data={stateData?.stateViewModel}
              rowCount={stateData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createStateModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateState
                  toggleModal={toggleModal}
                  selectedState={selectedState}
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { State };
