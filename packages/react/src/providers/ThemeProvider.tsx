import { Theme, ThemeManager, ThemeTransitionEffect } from "@theme-smooth/core";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setTransitionDuration: (duration: number) => void;
  setTransitionEffect: (effect: ThemeTransitionEffect) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [themeManager] = useState(() => new ThemeManager({
    transitionEffect: 'circle',
    transitionDuration: 1000
  }));
  const [theme, setTheme] = useState(themeManager.getTheme());

  useEffect(() => {
    const handleThemeChange = () => setTheme(themeManager.getTheme());
    window.addEventListener("theme-change", handleThemeChange);

    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, [themeManager]);

  const value = {
    theme,
    toggleTheme: () => themeManager.toggleTheme(),
    setTheme: (newTheme: Theme) => themeManager.setTheme(newTheme),
    setTransitionDuration: (duration: number) =>
      themeManager.setTransitionDuration(duration),
    setTransitionEffect: (effect: ThemeTransitionEffect) =>
      themeManager.setTransitionEffect(effect),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
