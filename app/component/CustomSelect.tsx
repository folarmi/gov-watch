// components/CustomSelect.tsx
import React from "react";
import Select, { Props as SelectProps } from "react-select";
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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  className,
  customOnChange,
  isMulti,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  // const handleChange = (
  //   newValue: SingleValue<Option> | MultiValue<Option> | null,
  //   _actionMeta: ActionMeta<Option>
  // ) => {
  //   // Check if the newValue is an array (MultiValue case)
  //   if (Array.isArray(newValue)) {
  //     const values = newValue.map((option) => option.value);
  //     field.onChange(values); // Pass an array of values
  //   } else {
  //     // For SingleValue or null, directly pass the value or null
  //     field.onChange(newValue ? newValue.value : null);
  //   }
  // };

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
        // onChange={handleChange}
        onChange={(val: any) => {
          customOnChange && customOnChange(val, name);
          isMulti
            ? // onchange for react-select multi options
              field.onChange(val.map((val: any) => val.value))
            : field.onChange(val.value);
        }}
        // value={field.value}
        value={options?.find((c: any) => c?.value === field?.value) || null}
        className=" rounded-2xl outline-none bg-gray-50 text-sm w-full "
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
