# theme-smooth-core

theme-smooth-core是一个开箱即用，已经预设CSS，提供核心方法的主题包

## 安装

使用npm:

```bash
npm install @theme-smooth-core
```

或者使用yarn:

```bash
pnpm add @theme-smooth-core
```

## styles

### base.css

使用css变量预设主题样式

```css
:root {
    --text-color-light: #000000;
    --bg-color-light: #ffffff;
    --text-color-dark: #ffffff;
    --bg-color-dark: #282c34;
  }
  
  [data-theme="light"] {
    color: var(--text-color-light);
    background-color: var(--bg-color-light);
  }
  
  [data-theme="dark"] {
    color: var(--text-color-dark);
    background-color: var(--bg-color-dark);
  }
  
  body {
    margin: 0;
    padding: 0;
    transition: color var(--transition-duration, 300ms),
                background-color var(--transition-duration, 300ms);
  }
```

### transition.css

使用view-transition特性实现过渡效果

```css

@supports (view-transition-name: none) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--transition-duration, 300ms);
  }

  .theme-transition-reverse::view-transition-old(root) {
    animation-name: slide-out-reverse;
  }

  .theme-transition-reverse::view-transition-new(root) {
    animation-name: slide-in-reverse;
  }

  ::view-transition-old(root) {
    animation: slide-out var(--transition-duration, 300ms) both;
  }

  ::view-transition-new(root) {
    animation: slide-in var(--transition-duration, 300ms) both;
  }

  @keyframes slide-out {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  @keyframes slide-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slide-out-reverse {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }

  @keyframes slide-in-reverse {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  [data-transition-effect="circle"]::view-transition-old(root),
  [data-transition-effect="circle"]::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  [data-transition-effect="circle"]::view-transition-new(root) {
    animation: var(--transition-duration, 500ms) ease-in-out both circle-in;
  }
  @keyframes circle-in {
    from { clip-path: circle(0% at center); }
    to { clip-path: circle(100% at center); }
  }

}

body {
  overflow-x: hidden;
}

```

## 使用

### options

```ts
export type ThemeTransitionEffect = 'none' | 'view-transition' | 'circle';
export type Theme = 'light' | 'dark';

export interface ThemeManagerOptions {
    initialTheme?: Theme;
    transitionEffect?: ThemeTransitionEffect;
    transitionDuration?: number;
}
```

#### react

1. 简单使用

   ```tsx
   import { Theme, ThemeManager, ThemeTransitionEffect } from "@theme-smooth/core";
   import {useState, useEffect} from "react"
   
   function App() {
       const themeManager = new ThemeManager({
       	transitionEffect: 'circle',
       	transitionDuration: 1000,
   	})
       const [theme, setTheme] = useState(themeManager.getTheme());
       useEffect(() => {
       	const handleThemeChange = () => setTheme(themeManager.getTheme());
       	window.addEventListener("theme-change", handleThemeChange);
       	return () => window.removeEventListener("theme-change", handleThemeChange);
     	}, [themeManager]);
       return <div>
       	<p>current theme: {theme}</p>
           <button onClick={() => themeManager.setTheme('light')}>Light Theme</button>
           <button onClick={() => themeManager.setTheme('dark')}>Dark Theme</button>
           <buttom onClick={() => {
               themeManager.toggleTheme()
            }}>toggle theme</buttom>
           <input 
           	type="number" 
           	placeholder="Transition Duration (ms)"
           	onChange={(e) => themeManager.setTransitionDuration(Number(e.target.value))}
         	/>
       </div>
   }
   
   ```

2. 封装`Provier`

   ```tsx
   // ThemeContext.Provider 
   
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
   
   ```

   ```tsx
   // App.tsx
   <ThemeProvider>
      <div className="App">
        <h1>Theme Smooth Demo</h1>
        <ThemeControls />
       </div>
   </ThemeProvider>
   ```

   ```tsx
   // ThemeControls
   import React from 'react';
   import { useTheme } from '../providers/ThemeProvider';
   
   const ThemeControls: React.FC = () => {
     const { theme, toggleTheme, setTheme, setTransitionDuration } = useTheme();
   
     return (
       <div>
         <h2>Current Theme: {theme}</h2>
         <button onClick={toggleTheme}>Toggle Theme</button>
         <button onClick={() => setTheme('light')}>Light Theme</button>
         <button onClick={() => setTheme('dark')}>Dark Theme</button>
         
         <input 
           type="number" 
           placeholder="Transition Duration (ms)"
           onChange={(e) => setTransitionDuration(Number(e.target.value))}
         />
       </div>
     );
   };
   
   export default ThemeControls;
   ```

#### vue

1. 在main.js 中引入 css 样式表

   ```js
   // main.js
   import { createApp } from 'vue'
   import './style.css'
   import App from './App.vue'
   import '@theme-smooth/core/style.css';  // 导入 core 包的样式
   
   createApp(App).mount('#app')
   
   ```

2. App.vue使用

   ```vue
   <template>
     <div>
       <h2>Current Theme</h2>
       <button @click="toggleChange">Toggle Theme</button>
       <button
         @click="
           () => {
             themeManager.setTheme('light');
           }
         "
       >
         Light Theme
       </button>
       <button
         @click="
           () => {
             themeManager.setTheme('dark');
           }
         "
       >
         Dark Theme
       </button>
   
       <input type="number" placeholder="Transition Duration (ms)" />
     </div>
   </template>
   
   <script setup lang="ts">
   import { ThemeManager } from "@theme-smooth/core";
   const themeManager = new ThemeManager({
     transitionEffect: "circle",
     transitionDuration: 500,
   });
   
   const toggleChange = async () => {
     await themeManager.toggleTheme();
   };
   </script>
   ```

## 贡献

我们欢迎社区贡献!请查看我们的 [贡献指南](CONTRIBUTING.md) 了解更多信息。

## 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解更多详情。