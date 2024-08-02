import React from "react";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} Theme
    </button>
  );
}
