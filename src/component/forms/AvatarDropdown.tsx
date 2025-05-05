import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { Link } from "react-router-dom";
import { directUserToPageOnLogin, getUserInitials } from "../../utils";

const AvatarDropdown = () => {
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const avatarDropDown = [
    {
      id: 1,
      name: "Dashboard",
      link: directUserToPageOnLogin(userType),
    },
    {
      id: 2,
      name: "Settings",
      link: "/dashboard/settings",
    },
    // {
    //   id: 3,
    //   name: "Earnings",
    //   link: "/dashboard/settings",
    // },
  ];

  const { logout } = useAuth();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <div
        onClick={toggleDropDown}
        className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-primary rounded-full dark:bg-gray-600 cursor-pointer text-white"
      >
        {getUserInitials(userObject, userType)}
      </div>

      {showDropdown && (
        <div
          id="userDropdown"
          className="absolute right-10 z-10 mt-2 bg-primary text-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-white">
            <div>{userObject?.fullName}</div>
            <div className="font-medium truncate">{userObject?.email}</div>
            {/* <div>{userObject?.userRole}</div> */}
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            {avatarDropDown?.map(({ id, name, link }) => {
              return (
                <Link
                  to={link}
                  key={id}
                  className="block px-4 py-2 hover:bg-green_300 text-white"
                >
                  {/* hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white */}
                  {name}
                </Link>
              );
            })}
          </ul>
          <div className="py-1">
            <Link
              onClick={logout}
              to="/"
              className="block px-4 py-2 text-sm  hover:bg-green_300 text-white "
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
