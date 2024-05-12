// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  let buttonStyle =
    "bg-primary text-white text-base font-medium py-5 px-12 rounded-[20px]";

  if (variant === "secondary") {
    buttonStyle =
      "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded";
  }

  return (
    <button {...props} className={buttonStyle}>
      {children}
    </button>
  );
};

export default CustomButton;
