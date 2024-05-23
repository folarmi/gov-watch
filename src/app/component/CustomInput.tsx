import { useController, UseControllerProps } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
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
      <input
        className="h-14 rounded-2xl px-4 border-2 border-black bg-gray-50 text-sm"
        {...field}
        {...rest}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomInput;
