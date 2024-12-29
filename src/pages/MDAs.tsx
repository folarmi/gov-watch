/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
// import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateMDA from "../component/modals/CreateMDA";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";

const MDA = () => {
  const [createMDA, setCreateMDA] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [selectedMDA, setSelectedMDA] = useState("");

  const { data: mdaData, isLoading } = useGetData({
    url: `/Mdas/GetAllMdas?pageNumber=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetAllMdasTable", JSON.stringify(pagination)],
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
    // columnHelper.accessor("image", {
    //   header: "Image",
    //   cell: (info) => <span className="text-sm font-normal">hgfhfhf</span>,
    // }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("website", {
      header: "Website",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue() || "N/A"}</span>
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
                setSelectedMDA(rowData);
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
    setSelectedMDA("");
    setCreateMDA(!createMDA);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add MDA" onClick={toggleModal} />
            </div>
            <Table
              columns={columns}
              data={mdaData?.mdaViewModel}
              isLoading={isLoading}
              // rowCount={mdaData?.totalCount || 0}
              rowCount={mdaData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createMDA} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateMDA
                  toggleModal={toggleModal}
                  selectedMDA={selectedMDA}
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { MDA };
