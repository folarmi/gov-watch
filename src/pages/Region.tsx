/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
// import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateRegion from "../component/modals/CreateRegion";
import DashboardLayout from "../layouts/DashboardLayout";
// import { useAppSelector } from "../lib/hook";
// import { RootState } from "../lib/store";

const Region = () => {
  const [createRegion, setCreateRegion] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: regionData, isLoading } = useGetData({
    url: `Regions/GetAllRegions?page=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetAllRegionsTable", JSON.stringify(pagination)],
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
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreateRegion(!createRegion);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add Region" onClick={toggleModal} />
            </div>

            <div className="w-1/2">
              <Table
                columns={columns}
                data={regionData?.regionViewModel}
                rowCount={regionData?.totalCount || 0}
                pagination={pagination}
                setPagination={setPagination}
              />
            </div>

            <Modal show={createRegion} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateRegion toggleModal={toggleModal} />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { Region };
