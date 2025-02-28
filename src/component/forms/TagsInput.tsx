import React, { useState } from "react";

type TagsInputProps = {
  onChange?: (tags: string[]) => void;
  defaultTags?: string[];
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press event to create tags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        // onChange(newTags); // Notify parent only when a tag is added
      }
      setInputValue("");
    }
  };

  // Handle removing a tag
  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    // onChange(newTags); // Notify parent only when a tag is removed
  };

  return (
    <div className="tag-input-container mt-4">
      <label htmlFor="article-tags" className="text-sm font-medium">
        Article Tags
      </label>
      <input
        type="text"
        id="article-tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        className="h-12 rounded-lg px-4 border-2 border-black bg-gray-50 text-sm w-full"
        aria-describedby="tag-instructions"
      />
      <div id="tag-instructions" className="text-sm text-gray-500 mt-1">
        Press Enter to add a tag.
      </div>

      {/* Display Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.isArray(tags) &&
          tags?.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 focus:outline-none"
                aria-label={`Remove tag: ${tag}`}
              >
                &times;
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TagsInput;
