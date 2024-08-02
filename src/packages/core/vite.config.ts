import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['src/**/*.{test,space}.{js,mjd,cjs,ts,mts,cts,jsx,tsx}']
    }
})