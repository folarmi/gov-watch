// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { useGetData } from "../hooks/apiCalls";
// import Table from "../component/Table";
// import Loader from "../component/Loader";
// import Modal from "../component/modals/Modal";

// type PaginatedTableProps<T> = {
//   endpoint: string; // API endpoint
//   queryKey: string; // Query key for react-query
//   columns: any[]; // Columns for the table
//   pageSize?: number; // Default page size
//   createModal?: React.ReactNode; // Modal for creating/editing items
//   deleteModal?: React.ReactNode; // Modal for deleting items
//   additionalParams?: Record<string, any>; // Additional query parameters
// };

// const PaginatedTable = <T,>({
//   endpoint,
//   queryKey,
//   columns,
//   pageSize = 10,
//   createModal,
//   deleteModal,
//   additionalParams = {},
// }: PaginatedTableProps<T>) => {
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize,
//   });
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<T | null>(null);

//   // Fetch data using the useGetData hook
//   const { data, isLoading } = useGetData({
//     url: `${endpoint}?pageNumber=${pagination.pageIndex + 1}&pageSize=${
//       pagination.pageSize
//     }&${new URLSearchParams(additionalParams).toString()}`,
//     queryKey: [queryKey, JSON.stringify(pagination), additionalParams],
//   });

//   // Toggle create/edit modal
//   const toggleCreateModal = () => {
//     setCreateModalOpen(!isCreateModalOpen);
//     if (isCreateModalOpen) setSelectedItem(null); // Reset selected item when closing modal
//   };

//   // Toggle delete modal
//   const toggleDeleteModal = () => {
//     setDeleteModalOpen(!isDeleteModalOpen);
//     if (isDeleteModalOpen) setSelectedItem(null); // Reset selected item when closing modal
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           {/* Table */}
//           <Table
//             columns={columns}
//             data={data?.items || []} // Use `items` from the API response
//             rowCount={data?.totalCount || 0}
//             pagination={pagination}
//             setPagination={setPagination}
//           />

//           {/* Create/Edit Modal */}
//           {createModal && (
//             <Modal show={isCreateModalOpen} toggleModal={toggleCreateModal}>
//               {React.cloneElement(createModal as React.ReactElement, {
//                 toggleModal: toggleCreateModal,
//                 selectedItem,
//               })}
//             </Modal>
//           )}

//           {/* Delete Modal */}
//           {deleteModal && (
//             <Modal show={isDeleteModalOpen} toggleModal={toggleDeleteModal}>
//               {React.cloneElement(deleteModal as React.ReactElement, {
//                 toggleModal: toggleDeleteModal,
//                 selectedItem,
//               })}
//             </Modal>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default PaginatedTable;
