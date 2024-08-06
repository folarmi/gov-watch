"use client";

import React from "react";
import { adminDashboardSideBarItems } from "../data";
import Image from "next/image";
import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import pending from "../../public/pending.svg";
import iconSeven from "../../public/iconSeven.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import withAdminAuth from "../hoc/withAdminAuth";
import { useGetData } from "../hooks/apiCalls";
import Loader from "../component/Loader";
// import SearchBar from "../component/SearchBar";

const AdminDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();

  const { data: userCountData, isLoading: userCountIsLoading } = useGetData({
    url: "/GetCountOfUsers",
    queryKey: ["GetCountOfUsers"],
  });

  const { data: countOfPublications, isLoading: countOfPublicationsIsLoading } =
    useGetData({
      url: "/GetCountOfPublications",
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

  return (
    <>
      {userCountIsLoading ||
      countOfPublicationsIsLoading ||
      countOfPublicationsForAdminIsLoading ? (
        <Loader />
      ) : (
        <section className="px-8 md:px-24">
          {/* <SearchBar onSearch={handleSearch} /> */}
          <InformationTab data={adminDashboard} />
          <div className="flex ">
            <section className="bg-green_100 text-white my-10  mr-8 pt-6 rounded-lg">
              <div className="flex items-center px-8 mb-6">
                <Image src={iconSeven} alt="item icon" />
                <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
                  Unapproved Publications
                </p>
              </div>

              <p className="text-base font-medium px-8 pb-8 cursor-pointer">
                Editing
              </p>
              <div className="flex items-center px-8 mb-6">
                <Image src={pending} alt="item icon" />
                <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
                  Pending Publications
                </p>
              </div>

              <p className="text-base font-medium px-8 pb-8 cursor-pointer">
                Admin
              </p>
              {adminDashboardSideBarItems.map(({ id, name, image, link }) => {
                return (
                  <Link
                    className={`flex items-center py-4 px-8 mb-6 ${
                      pathName.startsWith(link) ? "bg-green_300" : ""
                    }`}
                    href={link}
                    key={id}
                  >
                    <Image src={image} alt="item icon" className="" />
                    <p
                      // href={link}
                      className={`text-base font-medium whitespace-nowrap mx-5 cursor-pointer`}
                    >
                      {name}
                    </p>
                  </Link>
                );
              })}
            </section>
            <main className="w-full">{children}</main>
          </div>
          <CreatePublication />
        </section>
      )}
    </>
  );
};

export default withAdminAuth(AdminDashboardLayout);
