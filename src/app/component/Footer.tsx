import React from "react";

import logo from "../../../public/logo.svg";
import copyright from "../../../public/copyright.svg";
import Image from "next/image";
import { FooterList } from "../data";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="px-24 border-t border-grey_100 pt-9">
      <Image src={logo} alt="Company logo" />

      <div className=" flex items-center justify-center gap-x-12">
        {FooterList.map(({ name, id, url }) => {
          return (
            <div key={id}>
              <Link
                className={`text-base font-bold text-black_300 pb-2`}
                href={url}
              >
                {name}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-14 mb-9">
        <Image src={copyright} alt="copyright" />
        <p className="font-medium text-lg text-black_200">2024 GovWatch</p>
      </div>
    </div>
  );
};

export default Footer;
