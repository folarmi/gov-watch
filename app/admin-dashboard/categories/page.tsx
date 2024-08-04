"use client";

import CustomButton from "@/app/component/CustomButton";
import IndeterminateCheckbox from "@/app/component/InterdeterminateCheckbox";
import Table from "@/app/component/Table";
import AdminButton from "@/app/component/forms/AdminButton";
import CreateCategory from "@/app/component/modals/CreateCategory";
import Modal from "@/app/component/modals/Modal";
import { useGetData } from "@/app/hooks/apiCalls";
import { CategoriesType } from "@/app/types/generalTypes";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const Categories = () => {
  const {
    data: categoriesData,
    isLoading,
    error,
  } = useGetData({
    url: "/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  console.log(categoriesData);
  const [data, setData] = React.useState<CategoriesType[]>([
    {
      categories: "Ministries",
      about: "Lorem ipsum dolor sit amet consectetur.  ",
      post: 50,
    },
    {
      categories: "Agencies",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Departments",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
    {
      categories: "Political Actors",
      about: "Lorem ipsum dolor sit amet consectetur.",
      post: 50,
    },
  ]);

  const columnHelper = createColumnHelper<CategoriesType>();
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
    columnHelper.accessor("categories", {
      header: "Categories",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("about", {
      header: "About",
      cell: (info) => (
        <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("post", {
      header: "Post",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
  ];

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const toggleModal = () => {
    setCreateCategoryModal(!createCategoryModal);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end w-full mb-4">
        <AdminButton buttonText="Add Category" onClick={toggleModal} />
      </div>
      <Table columns={columns} data={data} />

      <Modal show={createCategoryModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateCategory toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
