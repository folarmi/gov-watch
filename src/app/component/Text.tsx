// components/Text.tsx
import React from "react";

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  variant?:
    | "heading"
    | "subheading"
    | "body"
    | "bodyTwo"
    | "bodyThree"
    | "caption";
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  variant = "body",
  className,
  children,
}) => {
  let textSize = "text-base";
  let textFont = "";

  switch (variant) {
    case "heading":
      textSize = "text-[19px] md:text-[40px] font-bold dark:text-white ";
      break;
    case "subheading":
      textSize = "text-lg font-semibold dark:text-white";
      break;
    case "body":
      textSize = "text-xs md:text-base font-normal dark:text-white";
      break;
    case "bodyTwo":
      textSize = "text-base font-bold dark:text-white";
      break;
    case "bodyThree":
      textSize = "text-xl font-normal dark:text-white";
      break;
    case "caption":
      textSize = "text-sm font-light dark:text-white";
      break;
    default:
      textSize = "text-base font-normal";
  }

  return <p className={`${textSize} ${textFont} ${className}`}>{children}</p>;
};

export default Text;
