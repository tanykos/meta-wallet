import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/meta-wallet/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
