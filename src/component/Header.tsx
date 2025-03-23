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
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
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

  // const { data: notificationData } = useGetData({
  //   url: `https://govwatch.runasp.net/api/v1/Notifications/GetNotifications?id=${userId}`,
  //   queryKey: ["GetAllNotifications", userId],
  // });

  return (
    <>
      <nav className="sticky z-50 top-0 bg-gray-200 h-24 md:h-32 px-8 md:px-0 flex items-center justify-between md:justify-around">
        <div
          onClick={() => {
            handleResetState();
            navigate("/");
          }}
          className=""
        >
          <img src="/logo.svg" alt="Company logo" className="w-14 md:w-20" />
        </div>

        <>
          {SidebarList.filter(({ name }) => name).map(({ name, id, url }) => {
            return (
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
            );
          })}

          {!isAuthenticated && (
            <Link className="hidden md:flex" to="/sign-in">
              <CustomButton>Sign In</CustomButton>
            </Link>
          )}

          {isAuthenticated && (
            <div className="hidden md:flex items-center">
              {/* <NotificationIcon
                count={notificationData?.notificationResponseViewModel.length}
              /> */}
              <NotificationIcon count={9} />
              <UserRoleTag role={userType} />
              <AvatarDropdown />
            </div>
          )}
        </>

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
          {SidebarList.map(({ id, name, url }) => {
            return (
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
            );
          })}

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
  );
};

export { Header };
