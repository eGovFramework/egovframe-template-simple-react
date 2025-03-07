import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // JSX 처리를 위한 추가 설정
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
      web: [/\.[jt]sx?$/],  // 모든 JS/JSX/TS/TSX 파일을 web 모드로 변환
    },
  },
  build: {
    chunkSizeWarningLimit: 100000000,
  },
  // .js 파일에서 JSX 구문을 지원하도록 설정
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,  // .js, .jsx, .ts, .tsx 모두 포함
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
