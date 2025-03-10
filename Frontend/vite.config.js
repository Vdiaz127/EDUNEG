import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // URL del backend
        changeOrigin: true, // Necesario para que el proxy funcione correctamente
        secure: false, // Opcional, para evitar problemas con HTTPS en desarrollo
      },
    },
  },
  envDir: '../', // Ruta al directorio de variables de entorno
});