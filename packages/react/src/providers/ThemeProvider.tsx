import { Theme, ThemeManager, ThemeTransitionEffect } from "@theme-smooth/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  const [themeManager] = useState(
    () =>
      new ThemeManager({
        transitionEffect: "none",
        transitionDuration: 1000,
      })
  );
  const [theme, setTheme] = useState(themeManager.getTheme());

  useEffect(() => {
    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme);
    };

    themeManager.subscribe(handleThemeChange);
    return () => themeManager.unsubscribe(handleThemeChange);
  }, [themeManager]);

  const toggleTheme = useCallback(() => {
    themeManager.toggleTheme();
  }, [themeManager]);

  const setThemeDirectly = useCallback(
    (newTheme: Theme) => {
      themeManager.setTheme(newTheme);
    },
    [themeManager]
  );

  const setTransitionDuration = useCallback(
    (duration: number) => {
      themeManager.setTransitionDuration(duration);
    },
    [themeManager]
  );

  const setTransitionEffect = useCallback(
    (effect: ThemeTransitionEffect) => {
      themeManager.setTransitionEffect(effect);
    },
    [themeManager]
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme: setThemeDirectly,
      setTransitionDuration,
      setTransitionEffect,
    }),
    [
      theme,
      toggleTheme,
      setThemeDirectly,
      setTransitionDuration,
      setTransitionEffect,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
