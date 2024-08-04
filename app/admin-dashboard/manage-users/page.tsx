"use client";

import Table from "@/app/component/Table";
import { UserType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import defaultAvatar from "../../../public/defaultAvatar.svg";
import Image from "next/image";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import filterIcon from "../../../public/filterIcon.svg";
import trashCan from "../../../public/trash.svg";
import CustomSelect from "@/app/component/CustomSelect";
import { useForm } from "react-hook-form";
import AdminButton from "@/app/component/forms/AdminButton";
import Link from "next/link";

const ManageUsers = () => {
  const { control } = useForm();
  // const {
  //   data: categoriesData,
  //   isLoading,
  //   error,
  // } = useData({
  //   url: "/GetAllCategories",
  //   queryKey: ["GetAllCategories"],
  // });

  const [data, setData] = React.useState<UserType[]>([
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: true,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: false,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: true,
      lastLogin: "March 14,2024 13:59 PM",
    },
    {
      username: "Jane Doe",
      email: "JaneDoeworld@gmail.com",
      role: "Contributor",
      post: 50,
      status: false,
      lastLogin: "March 14,2024 13:59 PM",
    },
  ]);

  const columnHelper = createColumnHelper<UserType>();
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
      cell: () => <Image src={defaultAvatar} alt="default avatar" />,
    }),
    columnHelper.accessor("username", {
      header: "Username",
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
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("post", {
      header: "Post",
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
    columnHelper.accessor("lastLogin", {
      header: "Last Login",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const options = [
    { value: "admin", label: "Make Admin" },
    { value: "user", label: "Make User" },
    { value: "editor", label: "Make Editor" },
    { value: "contributor", label: "Make Contributor" },
    { value: "edit", label: "Edit" },
  ];

  return (
    <div className="mt-10">
      <Link
        href="/admin-dashboard/manage-users/create
      "
        className="flex justify-end w-full mb-4"
      >
        <AdminButton buttonText="Add User(s)" />
      </Link>
      {/* <section className="flex items-center mb-4 justify-between">
        <div className="flex py-5 items-center border border-gray-300 rounded-lg overflow-hidden w-80 h-8">
          <div className="px-3 cursor-pointer">
            <Image src={filterIcon} alt="filter icon" width={30} height={30} />
          </div>
          <input type="text" className="flex-1 px-2 focus:outline-none" />
        </div>

        <div className="flex items-center">
          <CustomSelect
            name="mySelect"
            options={options}
            label="Actions"
            control={control}
          />

          <div className="flex items-center ml-4 cursor-pointer">
            <Image src={trashCan} alt="trash can" className="" />
            <p>Delete</p>
          </div>
        </div>
      </section> */}
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ManageUsers;
