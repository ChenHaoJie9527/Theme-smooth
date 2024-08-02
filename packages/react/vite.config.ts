import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ThemeSmoothReact',
      fileName: 'theme-smooth-react'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@theme-smooth/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@theme-smooth/core': 'ThemeSmoothCore'
        }
      }
    }
  }
})