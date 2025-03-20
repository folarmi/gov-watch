import React from "react";

type AvatarProps = {
  name: string; // Full name of the user
  imageUrl?: string; // Optional image URL
  size?: "sm" | "md" | "lg"; // Size of the avatar
};

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = "md" }) => {
  // Get initials from the name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Determine size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-32 h-32 text-lg",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold ${
        sizeClasses[size]
      } ${imageUrl ? "overflow-hidden" : ""}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export { Avatar };
