/* eslint-disable @typescript-eslint/no-explicit-any */

import AdminButton from "../component/forms/AdminButton";
import Loader from "../component/Loader";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import { useEffect, useState } from "react";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import Modal from "../component/modals/Modal";
import { CreateNotification } from "../component/modals/CreateNotification";
// import { sampleData } from "../data";
import InfiniteScroll from "react-infinite-scroll-component";
import { userTypeObject } from "../utils";
import EmptyPage from "../component/EmptyPage";
import { useQueryClient } from "@tanstack/react-query";

const Notifications = () => {
  const pageSize = 30;
  const queryClient = useQueryClient();
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Start with page 1

  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const { data: notificationsData, isLoading } = useGetData({
    url: `Notifications/GetNotifications?id=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetNotifications"],
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // Increment pageNumber
    }
  };

  useEffect(() => {
    // if (!notificationsData || !Array.isArray(notificationsData)) {
    //   setHasMore(false);
    //   return;
    // }
    if (!notificationsData?.notificationViewModel) {
      setHasMore(false);
      return;
    }

    if (notificationsData?.notificationViewModel) {
      const newItems = notificationsData?.notificationViewModel;
      if (pageNumber === 1 && notificationsData?.totalCount === 0) {
        setItems([]);
        setHasMore(false);
        return;
      }

      if (pageNumber === 1) {
        setItems(newItems);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }

      setHasMore(newItems?.length >= pageSize);
    }
  }, [notificationsData, pageNumber]);

  const markNotificationAsReadMutation = useCustomMutation({
    endpoint: `Notifications/UpdateNotificationReadStatus`,
    successMessage: (data: any) => data?.remark,
    method: "put",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetNotifications"],
        exact: false,
      });
    },
  });

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-2">
          <div className="flex justify-end w-full my-4 gap-x-4">
            {items.length > 0 && (
              <AdminButton
                isLoading={markNotificationAsReadMutation.isPending}
                onClick={() =>
                  markNotificationAsReadMutation.mutate({
                    userId,
                    isRead: true,
                  })
                }
                buttonText="Mark All as Read"
              />
            )}

            {(userType === userTypeObject.admin ||
              userType === userTypeObject.editor) && (
              <AdminButton
                buttonText="Create Notification"
                onClick={toggleModal}
              />
            )}
          </div>
          <InfiniteScroll
            dataLength={items?.length} // Total number of items loaded
            style={{ overflow: "hidden" }}
            next={fetchMoreData} // Function to load more data
            hasMore={hasMore} // Whether there's more data to load
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
              </div>
            }
            endMessage={
              items.length > 0 && (
                <p className="text-center py-6 text-gray-600 font-semibold text-lg italic">
                  You've reached the end 🎉
                </p>
              )
            }
          >
            {!isLoading && items.length < 1 ? (
              <EmptyPage />
            ) : (
              <>
                {" "}
                {items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`px-4 py-3 border-b border-gray-100 last:border-none hover:bg-gray-50/80 transition-all duration-200 cursor-pointer group ${
                      item?.isNew ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                          {item?.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </InfiniteScroll>

          <Modal show={showModal} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateNotification toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export { Notifications };
