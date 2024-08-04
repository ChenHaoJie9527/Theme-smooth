import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { ThemeTransitionEffect } from '@theme-smooth/core';

const ThemeControls: React.FC = () => {
  const { theme, toggleTheme, setTheme, setTransitionEffect, setTransitionDuration } = useTheme();

  return (
    <div>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('light')}>Light Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
      <select onChange={(e) => setTransitionEffect(e.target.value as ThemeTransitionEffect)}>
        <option value="none">No Transition</option>
        <option value="fade">Fade</option>
        <option value="slide">Slide</option>
        <option value="zoom">Zoom</option>
        <option value="rotate">Rotate</option>
      </select>
      <input 
        type="number" 
        placeholder="Transition Duration (ms)"
        onChange={(e) => setTransitionDuration(Number(e.target.value))}
      />
    </div>
  );
};

export default ThemeControls;