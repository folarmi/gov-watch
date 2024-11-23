import React from "react";
import { UserType } from "../lib/features/auth/authSlice";

type UserRoleTagProps = {
  role: UserType;
};

const UserRoleTag: React.FC<UserRoleTagProps> = ({ role }) => {
  const roleStyles: { [key: string]: string } = {
    Editor: "bg-blue-100 text-blue-800",
    Admin: "bg-red-100 text-red-800",
    Contributor: "bg-yellow-100 text-yellow-800",
    User: "bg-green-100 text-green-800",
    Staff: "bg-purple-100 text-purple-800",
    Organization: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-lg mr-3 ${
        roleStyles[role] || "bg-gray-100 text-gray-800"
      }`}
    >
      {role}
    </span>
  );
};

export default UserRoleTag;
