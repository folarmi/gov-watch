/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import IndeterminateCheckbox from "../component/InterdeterminateCheckbox";
import Loader from "../component/Loader";
import AdminButton from "../component/forms/AdminButton";
import Table from "../component/Table";
import Modal from "../component/modals/Modal";
import CreateCategory from "../component/modals/CreateCategory";
import { useGetData } from "../hooks/apiCalls";
import DashboardLayout from "../layouts/DashboardLayout";
import moment from "moment";
import ConfirmModuleDeletion from "../component/modals/ConfirmModuleDeletion";

const Categories = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data: categoriesData, isLoading } = useGetData({
    url: `Categories/GetAllCategories?page=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllCategoriesTable", JSON.stringify(pagination)],
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteCategory, setDeleteCategory] = useState(false);

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
    columnHelper.accessor("image", {
      header: "Image",
      cell: (info) => (
        <img src={info.getValue()} className="rounded-full h-16 w-16" />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Category Name",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("dateFounded", {
      header: "Date Founded",
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
                setSelectedCategory(rowData);
              }}
              className="px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                toggleDeleteModal();
                setSelectedCategory(rowData.id);
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

  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const toggleModal = () => {
    setSelectedCategory("");
    setCreateCategoryModal(!createCategoryModal);
  };

  const toggleDeleteModal = () => {
    setDeleteCategory(!deleteCategory);
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
            <Table
              columns={columns}
              data={categoriesData?.categoryViewModel}
              rowCount={categoriesData?.totalCount || 0}
              pagination={pagination}
              setPagination={setPagination}
            />

            <Modal show={createCategoryModal} toggleModal={toggleModal}>
              <div className="p-4">
                <CreateCategory
                  toggleModal={toggleModal}
                  selectedCategory={selectedCategory}
                />
              </div>
            </Modal>

            <Modal show={deleteCategory} toggleModal={toggleDeleteModal}>
              <div className="p-4">
                <ConfirmModuleDeletion
                  moduleName="Category"
                  toggleModal={toggleDeleteModal}
                  endpoint="Categories/DeleteCategory"
                  id={selectedCategory}
                  queryKey="GetAllCategoriesTable"
                />
              </div>
            </Modal>
          </div>
        )}
      </>
    </DashboardLayout>
  );
};

export { Categories };
