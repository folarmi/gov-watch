/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateCategory from "../component/modals/CreateCategory";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";

const Categories = () => {
  const { data: categoriesData, isLoading } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
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
      header: "Category Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("categoryImage", {
      header: "Image",
      cell: (info) => (
        // <p className="text-sm font-normal w-[272px] ">{info.getValue()}</p>
        <p className="text-sm font-normal w-[272px] ">Test Image</p>
        // <Image
        //   src={info.getValue()}
        //   alt="category-image"
        //   width={500}
        //   height={500}
        // />
      ),
    }),
  ];

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const toggleModal = () => {
    setCreateCategoryModal(!createCategoryModal);
  };

  return (
    <DashboardLayout>
      {" "}
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="flex justify-end w-full mb-4">
              <AdminButton buttonText="Add Category" onClick={toggleModal} />
            </div>
            <Table columns={columns} data={categoriesData?.categoryViewModel} />

            <Modal show={createCategoryModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateCategory toggleModal={toggleModal} />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { Categories };
