import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Forward API calls to your Flask backend while developing.
    // Run Flask on port 5001 (as it already does) and this will
    // let the React contact form submit to it without CORS issues.
    proxy: {
      '/api': 'http://127.0.0.1:5001'
    }
  }
})
