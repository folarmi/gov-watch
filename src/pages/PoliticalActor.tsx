/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreatePoliticalActor from "../component/modals/CreatePoliticalActor";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";

const PoliticalActors = () => {
  const { data: politicalActorsData, isLoading } = useGetData({
    url: `PoliticalActors/GetAllPoliticalActors?pageNumber=1&pageSize=10`,
    queryKey: ["GetAllPoliticalActorsTable"],
  });
  const [createPoliticalActor, setCreatePoliticalActor] = useState(false);

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
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("socialMediaLink", {
      header: "Social Media",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("otherInformation", {
      header: "Other Info",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const toggleModal = () => {
    setCreatePoliticalActor(!createPoliticalActor);
  };

  return (
    <DashboardLayout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton
                buttonText="Add Political Actor"
                onClick={toggleModal}
              />
            </div>
            <Table
              columns={columns}
              data={politicalActorsData?.politicalActorViewModel}
              isLoading={isLoading}
            />

            <Modal show={createPoliticalActor} toggleModal={toggleModal}>
              <div className="p-4">
                <CreatePoliticalActor toggleModal={toggleModal} />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { PoliticalActors };
