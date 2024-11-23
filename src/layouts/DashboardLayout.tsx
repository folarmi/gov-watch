/* eslint-disable react-refresh/only-export-components */
"use client";

import React from "react";
// import InformationTab from "../../component/InformationTab";
// import CreatePublication from "../../component/CreatePublication";
import withAuth from "../hoc/withAuth";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import Loader from "../component/Loader";
import { Link, useLocation } from "react-router-dom";
import { dashboardSideBarItems } from "../data";
import { useGetData } from "../hooks/apiCalls";
import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import { Header } from "../component/Header";
import { userTypeObject } from "../utils";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const location = useLocation();
  const pathName = location.pathname;
  const { userType } = useAppSelector((state: RootState) => state.auth);

  const { data: userCountData, isLoading: userCountIsLoading } = useGetData({
    url: "Users/GetCountOfUsers",
    queryKey: ["GetCountOfUsers"],
  });

  const { data: countOfPublications, isLoading: countOfPublicationsIsLoading } =
    useGetData({
      url: "Publications/GetCountOfPublications",
      queryKey: ["GetCountOfPublications"],
    });

  const {
    data: countOfPublicationsForAdmin,
    isLoading: countOfPublicationsForAdminIsLoading,
  } = useGetData({
    url: "/GetCountOfPublicationsForAdmin",
    queryKey: ["GetCountOfPublicationsForAdmin"],
  });

  const adminDashboard = [
    {
      id: 1,
      name: "Top Engaged Post",
      number: 700,
      path: "/admin-dashboard/top-engaged-posts",
    },
    {
      id: 2,
      name: "Total Publications",
      number: countOfPublications?.totalCount ?? 0,
      path: "/admin-dashboard/total-publications",
    },
    {
      id: 3,
      name: "Submitted Publication",
      number: countOfPublicationsForAdmin?.totalCount ?? 0,
      path: "/admin-dashboard/submitted-publications",
    },
    {
      id: 4,
      name: "Pending Publication",
      number: 5,
      path: "/admin-dashboard/pending-publications",
    },
    {
      id: 5,
      name: "Bookmarks",
      number: 56,
      path: "/admin-dashboard/bookmarks",
    },
    {
      id: 6,
      name: "Total Users",
      number: userCountData?.totalCount ?? 0,
      path: "/admin-dashboard/manage-users",
    },
  ];

  // Filters dashboard items to show only required items to users
  const filteredItems = dashboardSideBarItems.filter(({ userRole }) =>
    userRole.includes(userType)
  );

  return (
    <>
      {userCountIsLoading ||
      countOfPublicationsIsLoading ||
      countOfPublicationsForAdminIsLoading ? (
        <Loader />
      ) : (
        <section className=" px-8 md:px-24">
          <Header />

          {userType !== userTypeObject.user &&
            userType !== userTypeObject.organization && (
              <InformationTab data={adminDashboard} />
            )}
          <div className="flex">
            {/* Sidebar */}
            <section className="bg-green_100 text-white my-10 mr-8 rounded-lg max-h-screen overflow-y-scroll w-[400px]">
              {filteredItems.map(({ category, items }, index) => (
                <div
                  key={category}
                  className={` mb-2 py-4 ${
                    index % 2 === 0 ? "" : ""
                  } rounded-lg`}
                >
                  <h3 className="text-lg font-semibold pb-2 px-8">
                    {category}
                  </h3>
                  {items.map(({ id, name, image: Icon, link }) => (
                    <Link
                      key={id}
                      className={`flex items-center px-8 py-2 mb-2 hover:bg-green-400 transition-colors duration-200 whitespace-nowrap ${
                        pathName.startsWith(link)
                          ? "bg-green_300 rounded-md"
                          : ""
                      }`}
                      to={link}
                    >
                      {/* <img src={image} alt="item icon" /> */}
                      <Icon className="w-6 h-6" />
                      <p className="text-base font-medium mx-5 cursor-pointer">
                        {name}
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
            </section>

            {/* Main Content */}
            <main className="w-full">{children}</main>
          </div>
          {userType !== userTypeObject.organization && <CreatePublication />}
        </section>
      )}
    </>
  );
};

export default withAuth(DashboardLayout);
