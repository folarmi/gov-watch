/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Loader from "../component/Loader";
import Table from "../component/Table";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import Modal from "../component/modals/Modal";
import { MarkMessageAsResolved } from "../component/modals/MarkMessageAsResolved";

const Messages = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const [selectedMessage, setSelectedMessage] = useState();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { data: contactUsData, isLoading } = useGetData({
    url: `ContactUsResponses/GetContactUs?isResolved=false&isDeleted=false&pageNumber=1&pageSize=10`,
    queryKey: ["GetContactUs", JSON.stringify(pagination)],
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("message", {
      header: "Message",
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
            {!info.getValue() && (
              <button
                onClick={() => {
                  toggleModal();
                  setSelectedMessage(rowData?.id);
                }}
                className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
              >
                Resolve
              </button>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <DashboardLayout>
      <>
        {" "}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-8">
            <Table
              columns={columns}
              data={contactUsData?.contactUsViewModel}
              rowCount={contactUsData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        )}
      </>

      <Modal show={showModal} toggleModal={toggleModal}>
        <div className="p-4">
          <MarkMessageAsResolved
            toggleModal={toggleModal}
            selectedMessage={selectedMessage}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export { Messages };
