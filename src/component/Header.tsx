import { useState } from "react";

import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { SidebarItemProp } from "../types/generalTypes";
// import { useAppSelector } from "../lib/hook";
// import { RootState } from "../lib/store";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { directUserToPageOnLogin } from "../utils";
import AvatarDropdown from "./forms/AvatarDropdown";
import UserRoleTag from "./UserRoleTag";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const pathName = location.pathname;

  // const { theme } = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

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
      url: directUserToPageOnLogin(userType),
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

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-200 h-24 md:h-32 px-8 md:px-0 flex items-center justify-between md:justify-around">
        <Link to="/" className="">
          <img src="/logo.svg" alt="Company logo" className="w-14 md:w-20" />
        </Link>

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
          className="fixed top-0 right-0 w-64 h-full bg-white md:hidden pl-8 z-[150]"
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
