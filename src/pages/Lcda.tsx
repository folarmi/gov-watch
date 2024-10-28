/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateLCDA from "../component/modals/CreateLCDA";
import Loader from "../component/Loader";
import DashboardLayout from "../layouts/DashboardLayout";

const LCDA = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: lcdaData, isLoading: lcdaDataIsLoading } = useGetData({
    url: `Lcdas/GetAllLcdas?pageNumber==${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetAllLcdas", JSON.stringify(pagination)],
  });

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
      header: "State",
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
    columnHelper.accessor("governor", {
      header: "Governor",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const [createLCDAModal, setCreateLCDAModal] = useState(false);

  const toggleModal = () => {
    setCreateLCDAModal(!createLCDAModal);
  };

  return (
    <DashboardLayout>
      <>
        {lcdaDataIsLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add LCDA" onClick={toggleModal} />
            </div>
            <Table
              columns={columns}
              data={lcdaData?.lcdaViewModel}
              isLoading={lcdaDataIsLoading}
              rowCount={lcdaData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createLCDAModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateLCDA toggleModal={toggleModal} />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { LCDA };
