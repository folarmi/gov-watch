import React from "react";
import Text from "./Text";

type TextAndValueProp = {
  title: string;
  value: string;
};

const TextAndValue = ({ title, value }: TextAndValueProp) => {
  return (
    <div className="flex justify-between mb-5">
      <Text variant="subheading">{title}</Text>
      <p className="text-lg font-normal">{value}</p>
    </div>
  );
};

export default TextAndValue;
