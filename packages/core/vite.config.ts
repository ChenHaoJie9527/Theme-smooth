import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ThemeSmoothCore',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,   
    },
    rollupOptions: {
      external: ["tests", "vitest", "react", "react-dom"],
      output: {
        globals: {
          react: "React",
          'react-dom': "ReactDom"
        },
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'style.css') {
            return 'theme-smooth.css'
          }
          return chunkInfo.name
        },
      }
    },
    cssCodeSplit: false,
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