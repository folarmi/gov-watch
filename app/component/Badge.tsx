import React from "react";

interface BadgeProps {
  text: string;
  textColor: string;
  bgColor: string;
}
const Badge = ({ text, textColor, bgColor }: BadgeProps) => {
  return (
    <div>
      <span
        className={`text-[${textColor}] bg-[${bgColor}] text-[10px] font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300`}
      >
        {text}
      </span>
    </div>
  );
};

export default Badge;
