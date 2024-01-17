import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    build: {
        outDir: 'dist'
    },
    publicDir: './static',
    server: {
        port: 3000,
      },
      plugins: [
        checker({
          typescript: true,
        }),
      ],
      
})
