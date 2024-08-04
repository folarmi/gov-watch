// components/SectionLayout.js
import React from "react";
import { contributorSideBarItems } from "../data";
import Image from "next/image";

const ContributorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <section className="bg-green_100 text-white px-8 my-10 mr-8 pt-6 rounded-lg">
        {contributorSideBarItems.map(({ id, name, image }) => {
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
  );
};

export default ContributorLayout;
