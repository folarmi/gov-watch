/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CustomSelect.tsx
import React from "react";
import Select, { PropsValue, Props as SelectProps } from "react-select";
import { useController, UseControllerProps } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps extends SelectProps<Option> {
  name: string;
  options: Option[];
  label?: string;
  control: any;
  rules?: UseControllerProps["rules"];
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
  rules,
  className,
  customOnChange,
  // defaultValue,
  isMulti,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={`z-30 mb-4 w-full  ${className}`}>
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
          // control: (base, state) => ({
          //   ...base,
          //   height: "38px",
          //   outline: "none", // Equivalent to focus:outline-none
          //   boxShadow: state.isFocused ? "0 0 0 2px #16a34a" : "none", // focus:ring-2 focus:ring-green-600
          //   borderColor: state.isFocused ? "#16a34a" : base.borderColor,
          //   "&:hover": {
          //     borderColor: state.isFocused ? "#16a34a" : base.borderColor,
          //   },
          // }),
          menu: (base) => ({
            ...base,
            zIndex: 9999, // Ensure it's on top of most elements
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999, // Necessary when using menuPortalTarget
          }),
        }}
        menuPortalTarget={document.body} // Render menu to body
        menuPosition="absolute" // or 'fixed' if you prefer
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
