import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Allow access from all network interfaces
    port: 5173,       // Ensure the port is set correctly (or use your preferred port)
  },
});
