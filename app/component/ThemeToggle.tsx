"use client";
import React from "react";
import { useTheme } from "next-themes";

const ThemeToogle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="transition-all duration-100 text-white dark:text-gray-800 px-12 py-2 text-3xl rounded-lg fixed bottom-0 left-0 cursor-pointer"
    >
      🌙
    </button>
  );
};

export default ThemeToogle;
