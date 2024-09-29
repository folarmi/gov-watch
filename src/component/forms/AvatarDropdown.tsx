import { useState } from "react";
import emptyPage from "../../assets/emptyPage.svg";
import { useAuth } from "../../context/AuthContext";
import { avatarDropDown } from "../../data";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { Link } from "react-router-dom";

const AvatarDropdown = () => {
  const { logout } = useAuth();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <img
        id="avatarButton"
        // type="button"
        // data-dropdown-toggle="userDropdown"
        // data-dropdown-placement="bottom-start"
        onClick={toggleDropDown}
        className="w-10 h-10 rounded-full cursor-pointer"
        src={emptyPage}
        alt="User dropdown"
      />

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
