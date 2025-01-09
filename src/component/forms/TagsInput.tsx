/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

type TagsInputProps = {
  onChange: (tags: string[]) => void;
  tags: any;
  setTags: any;
  defaultValues: any;
};

const TagsInput: React.FC<TagsInputProps> = ({
  onChange,
  tags,
  setTags,
  defaultValues,
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValues);

  // Handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press event to create tags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Prevent form submission or default behavior
      setTags((prevTags: any) => {
        const newTags = [...prevTags, inputValue.trim()];
        onChange(newTags); // Notify parent component about the new tags
        return newTags;
      });
      setInputValue(""); // Clear the input field
    }
  };

  // Handle removing a tag
  const removeTag = (indexToRemove: number) => {
    setTags((prevTags: any) => {
      const newTags = prevTags.filter(
        (_: any, index: any) => index !== indexToRemove
      );
      onChange(newTags);
      return newTags;
    });
  };

  return (
    <div className="tag-input-container mt-4">
      <label htmlFor="Article Tags" className="text-sm font-medium">
        Article Tags
      </label>
      <input
        type="text"
        value={inputValue}
        defaultValue={tags}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        className="h-12 rounded-lg px-4 border-2 border-black bg-gray-50 text-sm w-full"
      />
      <div className="flex gap-x-2 cursor-pointer">
        {tags?.map((tag: any, index: any) => (
          <div key={index} className="tag">
            <span className="bg-primary text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {tag}
            </span>
            <button type="button" onClick={() => removeTag(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
