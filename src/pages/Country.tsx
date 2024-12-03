/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
// import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateCountry from "../component/modals/CreateCountry";
import DashboardLayout from "../layouts/DashboardLayout";
import ConfirmModuleDeletion from "../component/modals/ConfirmModuleDeletion";

const Country = () => {
  const [createCountry, setCreateCountry] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [deleteModule, setDeleteModule] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: `/Countries/GetCountriesForAdmin?page=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetCountriesTable", JSON.stringify(pagination)],
  });

  const toggleModal = () => {
    setSelectedCountry("");
    setCreateCountry(!createCountry);
  };

  const toggleDeleteModal = () => {
    setDeleteModule(!deleteModule);
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img src={info.getValue()} className="rounded-full h-16 w-16" />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Country Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("capital", {
      header: "Capital",
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
    columnHelper.accessor("gdp", {
      header: "GDP",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader name",
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
                setSelectedCountry(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
            {/* <button
              onClick={() => {
                toggleDeleteModal();
                setSelectedCountry(rowData.publicId);
              }}
              className="px-2 py-1 text-sm bg-red-500 cursor-pointer text-white rounded"
            >
              Delete
            </button> */}
          </div>
        );
      },
    }),
  ];

  return (
    <DashboardLayout>
      {countryDataIsLoading ? (
        <Loader />
      ) : (
        <div className="mt-10">
          <div className="flex justify-end w-full mb-4">
            <AdminButton buttonText="Add Country" onClick={toggleModal} />
          </div>
          <Table
            columns={columns}
            data={countryData?.countryViewModel}
            isLoading={countryDataIsLoading}
            rowCount={countryData?.totalCount || 0}
            pagination={pagination}
            setPagination={setPagination}
          />

          <Modal show={createCountry} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateCountry
                toggleModal={toggleModal}
                selectedCountry={selectedCountry}
              />
            </div>
          </Modal>

          <Modal show={deleteModule} toggleModal={toggleDeleteModal}>
            <div className="p-4">
              <ConfirmModuleDeletion
                moduleName="Country"
                toggleModal={toggleDeleteModal}
                endpoint="Countries/DeleteCountry"
                countryId={selectedCountry}
              />
            </div>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export { Country };
