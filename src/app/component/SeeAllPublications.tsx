import Image from "next/image";
import React from "react";
import arrow from "../../../public/arrow.svg";

const SeeAllPublications = () => {
  return (
    <div className="mb-6 flex items-center justify-end">
      <p className="text-lg font-bold pr-3">See More Publications</p>
      <Image src={arrow} alt="arrow" />
    </div>
  );
};

export default SeeAllPublications;
