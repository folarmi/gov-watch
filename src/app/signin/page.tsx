"use client";
import React from "react";
import { useState } from "react";

const SignIn = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const toggleDiv = () => {
    setShowFilterDropdown(!showFilterDropdown);
    // console.log("showDiv state:", showDiv); // Debugging to check if state toggles correctly
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={toggleDiv}
      >
        Toggle Div
      </button>
      <div
        className={`absolute bg-white shadow-md p-4 rounded-lg transition-opacity ${
          showFilterDropdown
            ? "opacity-100 duration-500"
            : "opacity-0 duration-1000 pointer-events-none"
        }`}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        This is the div that appears when the icon is clicked.
      </div>
    </div>
  );
};

export default SignIn;
