import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true,
    proxy: {
      '/images': {
        target: process.env.BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on("proxyReq", (req) => {
            req.setHeader("Origin", process.env.FRONTEND_PROXY_URL ?? "");
          });
        }
      },
      '/auth': {
        target: process.env.BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on("proxyReq", (req) => {
            req.setHeader("Origin", process.env.FRONTEND_PROXY_URL ?? "");
          });
        }
      }
    }
  },
})
