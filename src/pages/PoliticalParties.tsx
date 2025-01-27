/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreatePoliticalParty from "../component/modals/CreatePoliticalParty";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";
import moment from "moment";
import ConfirmModuleDeletion from "../component/modals/ConfirmModuleDeletion";

const PoliticalParties = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [createPoliticalParty, setcreatePoliticalParty] = useState(false);
  const [selectedPoliticalParty, setSelectedPoliticalParty] = useState("");
  const [deletePoliticalParty, setDeletePoliticalParty] = useState(false);

  const { data: politicalPartiesData, isLoading } = useGetData({
    url: `PoliticalParties/GetAllPoliticalParties?pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllPoliticalPartiesTable", JSON.stringify(pagination)],
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
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("country", {
      header: "Country",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
    }),
    columnHelper.accessor("dateFounded", {
      header: "Date Founded",
      cell: (info) => (
        <span className="text-sm font-normal">
          {" "}
          {moment(info.getValue()).format("DD-MM-YYYY")}
        </span>
      ),
    }),
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("leaderName", {
      header: "Leader Name",
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
                setSelectedPoliticalParty(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                toggleDeleteModal();
                setSelectedPoliticalParty(rowData.publicId);
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
    setcreatePoliticalParty(!createPoliticalParty);
  };

  const toggleDeleteModal = () => {
    setDeletePoliticalParty(!deletePoliticalParty);
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
                buttonText="Add Political Party"
                onClick={toggleModal}
              />
            </div>
            <Table
              columns={columns}
              data={politicalPartiesData?.politicalPartyViewModel}
              isLoading={isLoading}
              rowCount={politicalPartiesData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createPoliticalParty} toggleModal={toggleModal}>
              <div className="p-4">
                <CreatePoliticalParty
                  toggleModal={toggleModal}
                  selectedPoliticalParty={selectedPoliticalParty}
                />
              </div>
            </Modal>

            <Modal show={deletePoliticalParty} toggleModal={toggleDeleteModal}>
              <div className="p-4">
                <ConfirmModuleDeletion
                  moduleName="Political party"
                  toggleModal={toggleDeleteModal}
                  endpoint="PoliticalParties/DeletePoliticalParty"
                  id={selectedPoliticalParty}
                  queryKey="GetAllPoliticalPartiesTable"
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { PoliticalParties };
