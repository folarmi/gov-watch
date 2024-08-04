// components/Button.tsx
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  loading,
  className,
  ...props
}) => {
  let buttonStyle =
    "bg-primary w-full text-white text-base font-medium py-4 px-10 rounded-2xl ";

  if (variant === "secondary") {
    buttonStyle =
      "bg-white text-black font-medium py-4 px-10 border border-primary rounded-2xl";
  }

  if (loading) {
    buttonStyle += " opacity-50 cursor-not-allowed";
  }

  return (
    <button
      {...props}
      className={`${buttonStyle}${className}`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
