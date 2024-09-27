/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { createColumnHelper } from "@tanstack/react-table";
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
  const { data: countryData, isLoading: countryDataIsLoading } = useGetData({
    url: `/Countries/GetCountries`,
    queryKey: ["GetCountriesTable"],
  });

  const [createCountry, setCreateCountry] = useState(false);

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
    // columnHelper.accessor("currency", {
    //   header: "Currency",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("bio", {
    //   header: "Bio",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("population", {
    //   header: "Population",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
    // columnHelper.accessor("gdp", {
    //   header: "GDP",
    //   cell: (info) => (
    //     <span className="text-sm font-normal">{info.getValue()}</span>
    //   ),
    // }),
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
