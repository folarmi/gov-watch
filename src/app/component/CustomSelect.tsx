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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  label,
  className,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label className="block text-sm pb-4 font-medium text-gray-700 dark:text-white">
          {label}
        </label>
      )}
      <Select
        {...field}
        options={options}
        {...rest}
        onChange={(selectedOption) => field.onChange(selectedOption)}
        value={field.value}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
