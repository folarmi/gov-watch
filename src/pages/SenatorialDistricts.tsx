/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
// import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModuleDeletion from "../component/modals/ConfirmModuleDeletion";
import { CreateSenatorialDistrict } from "../component/modals/CreateSenatorialDistrict";

const SenatorialDistricts = () => {
  const [createSenatorialDistrict, setCreateSenatorialDistrict] =
    useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const [selectedSenatorialDistrict, setSelectedSenatorialDistrict] =
    useState("");
  const [deleteSenatorialDistrict, setDeleteSenatorialDistrict] =
    useState(false);

  //   const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const { data: senatorialDistrictData, isLoading } = useGetData({
    url: `SenatorialDistricts/GetAllSenatorialDistricts?pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllSenatorialDistrictTable", JSON.stringify(pagination)],
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
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("senator", {
      header: "Senator",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("state", {
      header: "State",
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
    columnHelper.accessor("website", {
      header: "Website",
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
                setSelectedSenatorialDistrict(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                toggleDeleteModal();
                setSelectedSenatorialDistrict(rowData.publicId);
              }}
              className="px-2 py-1 text-sm bg-red-500 cursor-pointer text-white rounded"
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];

  const toggleModal = () => {
    setSelectedSenatorialDistrict("");
    setCreateSenatorialDistrict(!createSenatorialDistrict);
  };

  const toggleDeleteModal = () => {
    setDeleteSenatorialDistrict(!deleteSenatorialDistrict);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-2">
            <div className="flex justify-end w-full mb-4">
              <AdminButton
                buttonText="Add Senatorial District"
                onClick={toggleModal}
              />
            </div>
            <Table
              columns={columns}
              data={senatorialDistrictData?.senatorialDistrictViewModel}
              rowCount={senatorialDistrictData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createSenatorialDistrict} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateSenatorialDistrict
                  toggleModal={toggleModal}
                  selectedSenatorialDistrict={selectedSenatorialDistrict}
                />
              </div>
            </Modal>

            <Modal
              show={deleteSenatorialDistrict}
              toggleModal={toggleDeleteModal}
            >
              <div className="p-4">
                <ConfirmModuleDeletion
                  moduleName="Senatorial District"
                  toggleModal={toggleDeleteModal}
                  endpoint="SenatorialDistricts/DeleteSenatorialDistrict"
                  id={selectedSenatorialDistrict}
                  queryKey="GetAllSenatorialDistrictTable"
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { SenatorialDistricts };
