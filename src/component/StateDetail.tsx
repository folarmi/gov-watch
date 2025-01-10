import Text from "./Text";

type TextAndValueProp = {
  title: string;
  value: string | number;
};

const TextAndValue = ({ title, value }: TextAndValueProp) => {
  return (
    <div className="flex justify-between mb-5">
      <Text className="text-primary" variant="subheading">
        {title}
      </Text>
      <p className="text-base md:text-lg font-normal">{value}</p>
    </div>
  );
};

export default TextAndValue;
