/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import withAuth from "../hoc/withAuth";
import CreatePublication from "../component/CreatePublication";
import { Header } from "../component/Header";
import { dashboardSideBarItems } from "../data";
import { userTypeObject } from "../utils";
import { X } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const filteredItems = dashboardSideBarItems.filter(({ userRole }) =>
    userRole.includes(userType)
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Header />

      {/* Hamburger Button for Mobile */}
      <div className="flex items-center justify-between md:hidden p-4">
        <button onClick={toggleSidebar} className="text-green-700">
          {/* Simple Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {/* Mobile sidebar: fixed, slide in/out */}
        <aside
          className={`
            fixed top-0 left-0 z-50 w-64 h-full bg-green-700 text-white p-4 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0 md:h-auto md:min-h-screen md:w-64
          `}
        >
          <div className="flex flex-col space-y-4">
            <X className="lg:hidden ml-auto" onClick={toggleSidebar} />
            {filteredItems.map(({ category, items }) => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-semibold uppercase">{category}</h3>
                {items.map(({ id, name, image: Icon, link }) => (
                  <Link
                    key={id}
                    className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-all duration-200 ${
                      pathName.startsWith(link)
                        ? "bg-green-500"
                        : "hover:bg-green-600"
                    }`}
                    to={link}
                    onClick={() => setIsSidebarOpen(false)} // close sidebar when link clicked
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {userType !== userTypeObject.organization && <CreatePublication />}
    </>
  );
};

export default withAuth(DashboardLayout);
