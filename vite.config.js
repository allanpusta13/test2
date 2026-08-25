import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './resources/js/Components'),
      '@/Components': path.resolve(__dirname, './resources/js/Components'),
      '@/context': path.resolve(__dirname, './resources/js/Context'),
      '@/Context': path.resolve(__dirname, './resources/js/Context'),
      '@/lib': path.resolve(__dirname, './resources/js/lib'),
      '@/types': path.resolve(__dirname, './resources/js/types'),
      '@/data': path.resolve(__dirname, './resources/js/data'),
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
});


