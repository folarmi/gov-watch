import Image from "next/image";
import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  type: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  type,
  ...rest
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-2 mb-3 w-full">
      <label htmlFor={label} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative w-full">
        <input
          className="h-14 rounded-2xl px-4 pr-10 border-2 border-black bg-gray-50 text-sm w-full"
          {...field}
          type={type === "password" && isPasswordVisible ? "text" : type}
          {...rest}
        />
        {type === "password" && (
          <div  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}>
            <Image
              src={isPasswordVisible ? "eye.svg" : "eyeOff.svg"}
              alt="toggle visibility" width={20} height={20} />
          </div>
        )}
      </div>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomInput;
