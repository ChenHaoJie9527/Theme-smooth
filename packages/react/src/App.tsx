import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import "./App.css";

export default function App() {
  const { theme, setTheme, toggleTheme, setTransitionDuration, getTheme } =
    useTheme();
  const [currentTheme, setCurrentTheme] = useState(getTheme());

  useEffect(() => {
    const updateTheme = () => {
      const theme = getTheme()
      setCurrentTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    };
    // 初始化主题
    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [getTheme]);

  return (
    <div className={`App ${currentTheme}`}>
      <h1>Theme Manager Demo</h1>
      <h2>currentTheme: {theme}</h2>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("light")}>Set Light Theme</button>
      <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
      <div>
        <label htmlFor="transitionDuration">Transition Duration (ms): </label>
        <input
          id="transitionDuration"
          type="number"
          defaultValue={300}
          onChange={(e) => setTransitionDuration(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
