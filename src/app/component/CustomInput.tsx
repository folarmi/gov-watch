import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input {...rest} className={`border rounded-md px-3 py-2 ${className}`} />
  );
};

export default CustomInput;
