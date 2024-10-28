/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateCountry from "../component/modals/CreateCountry";
import DashboardLayout from "../layouts/DashboardLayout";

const Country = () => {
  const [createCountry, setCreateCountry] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: `/Countries/GetCountries?page=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetCountriesTable", JSON.stringify(pagination)],
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
    //   cell: (info) => (
    //     // <span className="text-sm font-normal">{info.getValue()}</span>
    //     <span className="text-sm font-normal">ljkdfngkjdfjfd</span>
    //   ),
    // }),
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
    columnHelper.accessor("leaderName", {
      header: "Leader name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreateCountry(!createCountry);
  };

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
              <CreateCountry toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export { Country };
