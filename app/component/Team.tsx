import Image from "next/image";
import React from "react";

interface TeamProps {
  img: string;
  name: string;
  role: string;
}

const Team: React.FC<TeamProps> = ({ img, name, role }) => {
  return (
    <div className="bg-white flex gap-4 border border-black rounded-2xl w-max">
      <Image
        className="ml-4 my-4 rounded-xl"
        height={150}
        width={150}
        // style={{
        //   width: "auto",
        //   height: "auto",
        // }}
        src={img}
        alt={name}
      />
      <div className="py-4 pr-4">
        <h1 className="font-bold text-2xl mb-1 whitespace-nowrap">{name}</h1>
        <p>{role}</p>
      </div>
    </div>
  );
};

export default Team;
