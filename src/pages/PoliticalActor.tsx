/* eslint-disable @typescript-eslint/no-explicit-any */

import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useGetData } from "../hooks/apiCalls";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreatePoliticalActor from "../component/modals/CreatePoliticalActor";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../component/Loader";
import moment from "moment";
import ConfirmModuleDeletion from "../component/modals/ConfirmModuleDeletion";

const PoliticalActors = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [createPoliticalActor, setCreatePoliticalActor] = useState(false);
  const [selectedPoliticalActor, setSelectedPoliticalActor] = useState("");
  const [deletePoliticalActor, setDeletePoliticalActor] = useState(false);

  const { data: politicalActorsData, isLoading } = useGetData({
    url: `PoliticalActors/GetAllPoliticalActors?pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllPoliticalActorsTable", JSON.stringify(pagination)],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
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
    columnHelper.accessor("bio", {
      header: "Bio",
      cell: (info) => <p className="text-sm font-normal">{info.getValue()}</p>,
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
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: (info) => (
        <span className="text-sm font-normal">
          {moment(info.getValue()).format("DD-MM-YYYY")}
        </span>
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
                setSelectedPoliticalActor(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                toggleDeleteModal();
                setSelectedPoliticalActor(rowData.publicId);
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
    setCreatePoliticalActor(!createPoliticalActor);
  };

  const toggleDeleteModal = () => {
    setDeletePoliticalActor(!deletePoliticalActor);
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
              rowCount={politicalActorsData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createPoliticalActor} toggleModal={toggleModal}>
              <div className="p-4">
                <CreatePoliticalActor
                  toggleModal={toggleModal}
                  selectedPoliticalActor={selectedPoliticalActor}
                />
              </div>
            </Modal>

            <Modal show={deletePoliticalActor} toggleModal={toggleDeleteModal}>
              <div className="p-4">
                <ConfirmModuleDeletion
                  moduleName="Political Actor"
                  toggleModal={toggleDeleteModal}
                  endpoint="PoliticalActors/DeletePoliticalActor"
                  id={selectedPoliticalActor}
                  queryKey="GetAllPoliticalActorsTable"
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { PoliticalActors };
