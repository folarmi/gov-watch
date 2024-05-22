"use client";
import React from "react";
import { useTheme } from "next-themes";

const ThemeToogle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  // const currentTheme = theme === "system" ? systemTheme : theme;
  const currentTheme = theme === "light" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="bg-gray-800 dark:bg-black_100 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-lg rounded-lg fixed bottom-0 left-0"
    >
      Toggle Mode
    </button>
  );
};

export default ThemeToogle;
