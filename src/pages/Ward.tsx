/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateWard from "../component/modals/CreateWard";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";

const Ward = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedWard, setSelectedWard] = useState("");

  const { data: wardData, isLoading: wardDataIsLoading } = useGetData({
    url: `Wards/GetAllWards?pageNumber=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetAllWardsTable", JSON.stringify(pagination)],
  });
  const columnHelper = createColumnHelper<any>();
  const [createWardModal, setCreateWardModal] = useState(false);

  const toggleModal = () => {
    setSelectedWard("");
    setCreateWardModal(!createWardModal);
  };

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
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img src={info.getValue()} className="rounded-full h-16 w-16" />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("state", {
      header: "State",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("lga", {
      header: "LGA",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("chairman", {
      header: "Chairman",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("politicalPartyOfChairman", {
      header: "Political Party",
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
                setSelectedWard(rowData);
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

  return (
    <DashboardLayout>
      <>
        {wardDataIsLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add Ward" onClick={toggleModal} />
            </div>
            <Table
              columns={columns}
              data={wardData?.wardViewModel}
              isLoading={wardDataIsLoading}
              rowCount={wardData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createWardModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateWard
                  toggleModal={toggleModal}
                  selectedWard={selectedWard}
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { Ward };
