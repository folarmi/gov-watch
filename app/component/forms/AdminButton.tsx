import React from "react";

type AdminButtonProp = {
  onClick?: any;
  buttonText: string;
};

const AdminButton = ({ onClick, buttonText }: AdminButtonProp) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {buttonText}
    </button>
  );
};

export default AdminButton;
