import { useState } from "react";

import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { SidebarItemProp } from "../types/generalTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
// import { directUserToPageOnLogin } from "../utils";
import AvatarDropdown from "./forms/AvatarDropdown";
import UserRoleTag from "./UserRoleTag";
import NotificationIcon from "./NotificationIcon";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import Loader from "./Loader";
// import { sampleData } from "../data";

interface HeaderProps {
  resetState?: () => void; // Properly type resetState as a function
}

const Header = ({ resetState }: HeaderProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;

  // const { theme } = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { userType, userId } = useAppSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Default resetState function
  const defaultResetState = () => {
    navigate("/"); // Optional: Add a log for debugging
  };

  // Use the passed resetState or the default one
  const handleResetState = resetState || defaultResetState;

  const SidebarList: SidebarItemProp[] = [
    {
      id: 1,
      name: `Latest ${isAuthenticated ? "Publications" : "Articles"} `,
      url: "/",
    },
    {
      id: 3,
      name: "About us",
      url: "/about-us",
    },

    {
      id: 2,
      name: "Contact us",
      url: "/contact-us",
    },
    {
      id: 4,
      name: `${isAuthenticated ? "Dashboard" : ""}`,
      url: "/dashboard/analytics",
    },

    {
      id: 7,
      name: `Leaderboard`,
      url: "/leaderboard",
    },
    {
      id: 6,
      name: `Pricing`,
      url: "/pricing",
    },
    {
      id: 5,
      name: `${isAuthenticated ? "" : "Sign up"}`,
      url: "/sign-up",
    },
  ];

  const { data: notificationData, isLoading: notificationDataIsLoading } =
    useGetData({
      url: `Notifications/GetNotifications?id=${userId}pageNumber=1&pageSize=5`,
      queryKey: ["GetNotifications"],
      enabled: !!userId,
    });

  const markNotificationAsReadMutation = useCustomMutation({
    endpoint: `Notifications/UpdateNotificationReadStatus'`,
    successMessage: (data: any) => data?.remark,
    method: "put",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  return (
    <>
      {/* Show Loading State if Notifications Are Loading */}
      {notificationDataIsLoading ? (
        <Loader />
      ) : (
        <>
          {/* Navigation Bar */}
          <nav className="sticky z-50 top-0 bg-gray-200 h-24 md:h-32 px-8 md:px-0 flex items-center justify-between md:justify-around">
            <div
              onClick={() => {
                handleResetState();
                navigate("/");
              }}
              className=""
            >
              <img
                src="/logo.svg"
                alt="Company logo"
                className="w-14 md:w-20"
              />
            </div>

            <>
              {/* Sidebar Items */}
              {SidebarList.filter(({ name }) => name).map(
                ({ name, id, url }) => (
                  <div className="hidden md:flex" key={id}>
                    <Link
                      className={`text-base font-medium pb-2 ${
                        pathName === url ? "border-b-2 border-green_100" : ""
                      }`}
                      to={url}
                    >
                      {name}
                    </Link>
                  </div>
                )
              )}

              {/* Authentication Buttons */}
              {!isAuthenticated && (
                <Link className="hidden md:flex" to="/sign-in">
                  <CustomButton>Sign In</CustomButton>
                </Link>
              )}

              {/* Notifications and User Section */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center">
                  <div
                    className="cursor-pointer relative"
                    onClick={() => {
                      toggleModal();
                      markNotificationAsReadMutation.mutate({
                        userId,
                        isRead: true,
                      });
                    }}
                  >
                    <NotificationIcon count={notificationData?.totalCount} />

                    {/* Notification Modal */}
                    {showModal && (
                      <div className="absolute bg-white rounded-xl top-12 left-1/2 transform -translate-x-1/2 z-50 shadow-lg w-80 max-h-96 overflow-y-auto border border-gray-200">
                        {/* Header */}
                        <div className="px-4 py-2 border-b bg-gray-100">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Notifications
                          </h3>
                        </div>

                        {/* Notifications List */}
                        {notificationData?.notificationResponseViewModel
                          ?.length > 0 ? (
                          <>
                            {/* {notificationData?.notificationResponseViewModel.map( */}
                            {notificationData?.notificationResponseViewModel?.map(
                              (item: any, index: number) => (
                                <div
                                  key={index}
                                  className="px-4 py-3 border-b last:border-none hover:bg-gray-50 transition cursor-pointer"
                                >
                                  <p className="text-sm text-gray-700">
                                    {item?.comment}
                                  </p>
                                  {item?.timestamp && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {item?.timestamp}
                                    </p>
                                  )}
                                </div>
                              )
                            )}

                            {/* See More Button */}
                            <div className="flex justify-center">
                              <Link
                                to="/dashboard/notifications"
                                className="p-2 text-center border-t bg-gray-50"
                              >
                                <button
                                  onClick={() =>
                                    console.log("See more clicked")
                                  }
                                  className="text-blue-500 hover:underline text-sm font-medium"
                                >
                                  See More
                                </button>
                              </Link>
                            </div>
                          </>
                        ) : (
                          // Empty State
                          <div className="p-4 text-sm text-gray-500 text-center">
                            No new notifications
                          </div>
                        )}
                      </div>
                    )}
                    <div className=""></div>
                  </div>

                  {/* User Role and Avatar */}
                  <UserRoleTag role={userType} />
                  <AvatarDropdown />
                </div>
              )}
            </>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              {isAuthenticated && <AvatarDropdown />}

              <img
                onClick={toggleSideBar}
                className=""
                src="/harmburger.svg"
                alt="harmburger menu"
              />
            </div>
          </nav>

          {/* Mobile Sidebar */}
          {isSideBarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={toggleSideBar}
            ></div>
          )}

          {isSideBarOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: isSideBarOpen ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-white md:hidden pl-8 z-[200]"
            >
              <div className="flex justify-end mt-4">
                <img
                  className="mb-10 mr-4"
                  onClick={toggleSideBar}
                  src="/closeIcon.svg"
                  alt="close icon"
                />
              </div>
              {SidebarList.map(({ id, name, url }) => (
                <div onClick={toggleSideBar} className="pb-5" key={id}>
                  <Link
                    className={`font-medium text-[15px] ${
                      pathName === url ? "text-green_100" : ""
                    }`}
                    to={url}
                  >
                    {name}
                  </Link>
                </div>
              ))}

              {!isAuthenticated && (
                <div onClick={toggleSideBar} className="pb-5">
                  <Link className={`font-medium text-[15px] `} to="/sign-in">
                    Sign in
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export { Header };
