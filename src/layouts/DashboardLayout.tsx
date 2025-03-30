/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import withAuth from "../hoc/withAuth";
import CreatePublication from "../component/CreatePublication";
import { Header } from "../component/Header";
import { dashboardSideBarItems } from "../data";
import { userTypeObject } from "../utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const filteredItems = dashboardSideBarItems.filter(({ userRole }) =>
    userRole.includes(userType)
  );

  return (
    <>
      {" "}
      <Header />
      <div className="flex space-x-6">
        <aside className="min-h-screen bg-green-700 text-white w-64 p-4 h-screen sticky top-0 overflow-y-auto">
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
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1">{children}</main>
      </div>
      {userType !== userTypeObject.organization && <CreatePublication />}
    </>
  );
};

export default withAuth(DashboardLayout);
