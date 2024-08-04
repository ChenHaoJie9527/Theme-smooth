import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import ThemeControls from './controls';
import 'theme-smooth/dist/style.css';  // 导入 core 包的样式

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Theme Smooth Demo</h1>
        <ThemeControls />
      </div>
    </ThemeProvider>
  );
}

export default App;