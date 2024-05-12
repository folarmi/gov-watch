// components/Text.tsx
import React from "react";

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  variant?: "heading" | "subheading" | "body" | "bodyTwo" | "caption";
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
      textSize = "text-[40px] font-bold";
      break;
    case "subheading":
      textSize = "text-lg font-semibold";
      break;
    case "body":
      textSize = "text-base font-normal";
      break;
    case "bodyTwo":
      textSize = "text-base font-bold";
      break;
    case "caption":
      textSize = "text-sm font-light";
      break;
    default:
      textSize = "text-base font-normal";
  }

  return <p className={`${textSize} ${textFont} ${className}`}>{children}</p>;
};

export default Text;
