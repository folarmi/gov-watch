/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetData } from "../hooks/apiCalls";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardLayout from "../layouts/DashboardLayout";

const ManageUsers = () => {
  //   const { control } = useForm();

  const { data: usersData, isLoading: usersDataIsLoading } = useGetData({
    url: `Users/GetAllUser?page=1&pageSize=10`,
    queryKey: ["GetAllUsers"],
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
    columnHelper.display({
      id: "actions",
      cell: () => <img src="/defaultAvatar.svg" alt="default avatar" />,
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
  ];

  return (
    <DashboardLayout>
      {" "}
      <>
        {usersDataIsLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <Link
              to="/dashboard/manage-users/create
      "
              className="flex justify-end w-full mb-4"
            >
              <AdminButton buttonText="Add User(s)" />
            </Link>

            <Table columns={columns} data={usersData?.userViewModel} />
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { ManageUsers };

// {
//   "firstName": "string",
//   "lastName": "string",
//   "email": "user@example.com",
//   "password": "6G\"GTEJ,zhFpw2k]/.[EeCRPrc",
//   "confirmPassword": "string",
//   "bio": "string",
//   "phoneNumber": "string",
//   "socialMediaLink": "string",
//   "image": "string",
//   "otherInformation": "string",
//   "createdBy": "string",
//   "organizationName": "string",
//   "country": "string",
//   "isOrganization": true,
//   "isStaff": true,
//   "cancellationToken": {
//     "waitHandle": {
//       "handle": {},
//       "safeWaitHandle": {}
//     }
//   }
// }
