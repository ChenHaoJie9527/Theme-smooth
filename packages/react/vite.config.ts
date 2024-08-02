import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ThemeSwitcherReact',
      fileName: 'theme-switcher-react'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@theme-switcher/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@theme-switcher/core': 'ThemeSwitcherCore'
        }
      }
    }
  },
})