/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CustomTextarea.tsx
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name,
  control,
  rules,
  label,
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

  return (
    <div className="flex flex-col gap-2 mb-3 w-full">
      <label htmlFor={label} className="text-sm font-semibold">
        {label}
      </label>
      <textarea
        className="h-36 rounded-lg px-4 pt-4 border border-gray-300 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        {...field}
        {...rest}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomTextArea;
