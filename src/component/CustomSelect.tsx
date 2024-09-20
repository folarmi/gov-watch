/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CustomSelect.tsx
import React from "react";
import Select, { PropsValue, Props as SelectProps } from "react-select";
import { useController } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps extends SelectProps<Option> {
  name: string;
  options: Option[];
  label?: string;
  control: any;
  className?: any;
  customOnChange?: any;
  isMulti?: boolean;
  // defaultValue?: string | undefined;
  defaultValue?: PropsValue<Option> | undefined;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  className,
  customOnChange,
  // defaultValue,
  isMulti,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <Select
        {...field}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          input: (baseStyles) => ({
            ...baseStyles,
            height: "38px",
          }),
        }}
        options={options}
        {...rest}
        onChange={(val: any) => {
          customOnChange && customOnChange(val, name);
          isMulti
            ? // onchange for react-select multi options
              field.onChange(val.map((val: any) => val.value))
            : field.onChange(val.value);
        }}
        // value={options?.find((c: any) => c?.value === field?.value) || null}
        value={
          isMulti
            ? (options &&
                options?.filter((c: any) =>
                  field?.value?.includes(c?.value)
                )) ||
              []
            : (options &&
                options?.find((c: any) => c?.value === field?.value)) ||
              null
        }
        className=" rounded-2xl outline-none bg-gray-50 text-sm w-full"
        // defaultValue={defaultValue}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
