import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        open: true, // opens default browser on server start
        port: 5050 // specifies which port to run on
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
