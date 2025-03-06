import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  esbuild: {
    loader: 'jsx',
    include: /\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    include: ["src/**/*.test.{js,jsx}", "src/**/*.spec.{js,jsx}"],
    exclude: ["node_modules", "src/App.test.jsx", "src/App.test.js"],
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    deps: {
      inline: ['react', 'react-dom', 'react-router-dom']
    }
  },
  build: {
    chunkSizeWarningLimit: 100000000,
  },
});
