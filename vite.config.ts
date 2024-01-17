import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    plugins: [
        checker({
            typescript: true,
        }),
    ],
})
