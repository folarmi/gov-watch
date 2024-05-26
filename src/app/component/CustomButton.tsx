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
    "bg-primary text-white text-base font-medium py-4 px-10 rounded-2xl";

  if (variant === "secondary") {
    buttonStyle =
      "bg-white text-black font-medium py-4 px-10 rounded border border-primary rounded-2xl";
  }

  return (
    <button {...props} className={buttonStyle}>
      {children}
    </button>
  );
};

export default CustomButton;
