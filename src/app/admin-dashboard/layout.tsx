// components/SectionLayout.js
import React from "react";
import { adminDashboard, adminDashboardSideBarItems } from "../data";
import Image from "next/image";
import InformationTab from "../component/InformationTab";
import CreatePublication from "../component/CreatePublication";
import pending from "../../../public/pending.svg";
import iconSeven from "../../../public/iconSeven.svg";

const AdminDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="px-8 md:px-24">
      <InformationTab data={adminDashboard} />
      <div className="flex ">
        <section className="bg-green_100 text-white px-8 my-10 mr-8 pt-6 rounded-lg">
          <div className="flex items-center pb-11">
            <Image src={iconSeven} alt="item icon" />
            <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
              Unapproved Publications
            </p>
          </div>

          <p className="text-base font-medium pb-8 cursor-pointer">Editing</p>
          <div className="flex items-center pb-11">
            <Image src={pending} alt="item icon" />
            <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
              Pending Publications
            </p>
          </div>

          <p className="text-base font-medium pb-8 cursor-pointer">Admin</p>
          {adminDashboardSideBarItems.map(({ id, name, image }) => {
            return (
              <div className="flex items-center pb-11" key={id}>
                <Image src={image} alt="item icon" className="" />
                <p className="text-base font-medium whitespace-nowrap mx-5 cursor-pointer">
                  {name}
                </p>
              </div>
            );
          })}
        </section>
        <main className="w-auto">{children}</main>
      </div>
      <CreatePublication />
    </section>
  );
};

export default AdminDashboardLayout;
