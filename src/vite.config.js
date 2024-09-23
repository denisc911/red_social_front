import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Establecer la base a './' en caso de problemas con las rutas
  server: {
    port: 3000,
  },
});
