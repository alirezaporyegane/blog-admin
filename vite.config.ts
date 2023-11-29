import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      components: resolve(__dirname, 'src/components')
    }
  },
  server: {
    port: 8080
  },
  mode: process.env.NODE_ENV,
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0')
  }
})
