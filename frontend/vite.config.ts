import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import legalPrerender from './legalPrerender.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), legalPrerender()],
  server: {
    allowedHosts: true,
    proxy: {
        "/api": {
            target: "http://backend:4000",
            changeOrigin: true
        },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
