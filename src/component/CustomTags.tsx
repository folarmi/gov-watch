/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useController } from "react-hook-form";
import Select, { Props as SelectProps } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

type Option = {
  value: string;
  label: string;
};

export const colourOptions: any = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

interface CustomSelectProps extends SelectProps<Option> {
  name: string;
  options: Option[];
  label?: string;
  control: any;
  className?: any;
  customOnChange?: any;
  isMulti?: boolean;
}

const CustomTags: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  className,
  customOnChange,
  isMulti,
  ...rest
}) => {
  const { field } = useController({ name, control });
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <Select
        {...field}
        // components={{
        //   IndicatorSeparator: () => null,
        // }}
        styles={{
          input: (baseStyles) => ({
            ...baseStyles,
            height: "38px",
          }),
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        options={options}
        {...rest}
        className=" rounded-2xl outline-none bg-gray-50 text-sm w-full "
      />
    </div>
  );
};

export default CustomTags;
