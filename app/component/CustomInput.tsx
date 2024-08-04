"use client";

import Image from "next/image";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import eyesClosed from "../../public/eyesClosed.svg";
import eyeOpened from "../../public/eyeOpened.svg";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  type?: string;
  readOnly?: boolean;
  classname?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  type = "text",
  className,
  readOnly,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [showPassword, setShowPassword] = useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-2 mb-3 w-full ${className}`}>
      <label htmlFor={label} className="text-sm font-semibold">
        {label}
      </label>
      <div className="w-full relative">
        <input
          className="h-12 rounded-lg px-4 border-2 border-black bg-gray-50 text-sm w-full"
          {...field}
          {...rest}
          value={field.value || ""}
          type={showPassword ? "text" : "password"}
          style={{
            backgroundColor: readOnly ? "hsl(0, 0%, 90%)" : "",
          }}
        />
        {type === "password" && (
          <div
            className="absolute left-[90%] top-5 cursor-pointer"
            onClick={togglePassword}
          >
            <Image
              src={showPassword ? eyeOpened : eyesClosed}
              alt="eyeOpened"
            />
          </div>
        )}
      </div>

      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};

export default CustomInput;
