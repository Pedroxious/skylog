import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    root: 'src',
    base: './',
    plugins: [tailwindcss()],
    build: {
        outDir: '..',
        emptyOutDir: false,
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                manualChunks: {
                    charts: ['chart.js', 'apexcharts'],
                    maps: ['leaflet']
                }
            }
        }
    },
    server: {
        port: 5173,
        open: true,
        fs: {
            allow: ['..', '../..']
        }
    }
});
