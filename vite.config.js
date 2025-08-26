import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Include JSX processing for JS and JSX files
    include: "**/*.{jsx,js}",
  })],
  
  base: "/",
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  test: {
    globals: true,
    include: ["src/**/*.test.js", "src/**/*.test.jsx"],
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    transformMode: {
      web: [/\.[jt]sx?$/],  // Transform all JS/JSX/TS/TSX files in web mode
    },
  },
  build: {
    chunkSizeWarningLimit: 100000000,
  },
  // Enable JSX syntax in .js files
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,  // Include all .js, .jsx, .ts, .tsx files
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
    },
  },
});