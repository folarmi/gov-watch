/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  type?: string;
  readOnly?: boolean;
  className?: string;
  onlyNumbers?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  type = "text",
  className,
  readOnly,
  onlyNumbers = false,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = onlyNumbers
      ? value === ""
        ? ""
        : Number(value)
      : value;
    field.onChange(parsedValue);
  };

  return (
    <div className={`flex flex-col gap-2 mb-3 w-full ${className}`}>
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <div className="w-full relative">
        <input
          className={`h-12 rounded-lg px-4 border-2 text-sm w-full 
            ${
              readOnly || rest.disabled
                ? "bg-gray-200 border-gray-400 cursor-not-allowed"
                : "bg-gray-50 border-black"
            }
          `}
          {...field}
          {...rest}
          value={field.value || (type === "date" ? null : "")}
          onChange={handleChange}
          type={onlyNumbers ? "number" : showPassword ? type : "password"}
          inputMode={onlyNumbers ? "numeric" : "text"}
          pattern={onlyNumbers ? "[0-9]*" : undefined}
          disabled={readOnly}
        />
        {type === "password" && !onlyNumbers && (
          <div
            className="absolute left-[90%] top-3 cursor-pointer"
            onClick={togglePassword}
          >
            <img
              src={showPassword ? "/eyeOpened.svg" : "/eyesClosed.svg"}
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
