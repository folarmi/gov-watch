type CheckBoxProps = {
  iflabel?: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  labelStyles?: string;
  name: string;
};

const CustomCheckBox = ({
  iflabel,
  checked,
  onChange,
  labelText,
  labelStyles,
  name,
}: CheckBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        id={name}
        type="checkbox"
        name={name}
        // value=""
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className={`relative cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center ${
          checked ? "bg-primary" : "bg-white border-[0.67px] border-gray-400"
        }`}
      >
        <svg
          className={`w-2 h-[6.5px] text-white ${checked ? "block" : "hidden"}`}
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5L4 7.5L9 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      {iflabel && (
        <label
          htmlFor={name}
          className={`ms-2 whitespace-nowrap ${labelStyles}`}
        >
          {labelText}
        </label>
      )}
    </div>
  );
};

export default CustomCheckBox;
