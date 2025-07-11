/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import DashboardLayout from "../layouts/DashboardLayout";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import Modal from "../component/modals/Modal";
import Users from "../component/modals/Users";
import { keepPreviousData } from "@tanstack/react-query";
import { getUserInitialsFirstAndLast } from "../types/generalTypes";

const ManageUsers = () => {
  const [verticalMore, setVerticalMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: usersData, isLoading: usersDataIsLoading } = useGetData({
    url: `Users/GetAllUser?page=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }`,
    queryKey: ["GetAllUsers", JSON.stringify(pagination)],
    placeholderData: keepPreviousData,
  });

  const columnHelper = createColumnHelper<any>();
  const columns = [
    // Display Column
    columnHelper.display({
      id: `checkbox-${Math.random().toString(36).substr(2, 9)}`,
      cell: ({ table, row }) => (
        <IndeterminateCheckbox
          id={`checkbox-${row.index}`}
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
    }),

    columnHelper.accessor("image", {
      header: "User Image",
      cell: (info) => {
        const firstName = info.row.original?.firstName;
        const lastName = info.row.original?.lastName;
        return (
          <>
            {!info.getValue() ? (
              <div
                className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold uppercase"
                role="img"
                aria-label="User initials"
              >
                {getUserInitialsFirstAndLast(firstName, lastName)}
              </div>
            ) : (
              <img
                src={info.getValue()}
                className="h-20 w-20 rounded-full"
                alt="user-avatar"
                loading="lazy"
              />
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "Phone Number",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg ${
            info.getValue() === true
              ? "bg-green_300 text-green_100"
              : "bg-red-300 text-red-700"
          }`}
        >
          {info.getValue() === true ? "Active" : "Inactive"}
        </span>
      ),
    }),
    columnHelper.display({
      id: "checkbox",
      cell: () => <MoreVertical onClick={toggleModal} />,
    }),
  ];

  const toggleModal = () => {
    setVerticalMore(!verticalMore);
  };

  return (
    <DashboardLayout>
      {" "}
      <>
        {usersDataIsLoading ? (
          <Loader />
        ) : (
          <div className="lg:mt-10">
            <Link
              to="/dashboard/manage-users/create
      "
              className="flex justify-end w-full mb-4"
            >
              <AdminButton buttonText="Add User(s)" />
            </Link>

            <Table
              columns={columns}
              data={usersData?.userViewModel}
              isLoading={usersDataIsLoading}
              rowCount={usersData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        )}
      </>
      <Modal show={verticalMore} toggleModal={toggleModal}>
        <div className="p-4">
          <Users toggleModal={toggleModal} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export { ManageUsers };
