import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ThemeSmoothCore',
      fileName: 'theme-smooth-core'
    },
    rollupOptions: {
      external: ["tests", "vitest"],
      output: {
        globals: {}
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