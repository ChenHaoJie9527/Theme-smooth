import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ThemeSmoothCore',
      fileName: (format) => `theme-smooth-${format}.js`    
    },
    rollupOptions: {
      external: ["tests", "vitest", "react", "react-dom"],
      output: {
        globals: {
          react: "React",
          'react-dom': "ReactDom"
        }
      }
    }
  },
  plugins: [dts({
    exclude: ['**/*.test.ts', '**/*.spec.ts']
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})