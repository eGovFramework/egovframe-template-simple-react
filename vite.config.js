import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      include: "**/*.{jsx,js}",
    }),
  ],

  base: "/",
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      // 테스트 환경에서 /assets/... 절대경로를 실제 public 디렉토리 경로로 변환
      // (Vitest 4의 Module Runner가 드라이브 레터 없는 file:/// URL을 거부하는 문제 해결)
      ...(mode === "test"
        ? [
            {
              find: /^\/assets\/(.+)$/,
              replacement: path.resolve(__dirname, "public/assets").replace(/\\/g, "/") + "/$1",
            },
          ]
        : []),
    ],
  },
  test: {
    globals: true,
    include: ["src/**/*.test.js", "src/**/*.test.jsx"],
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
  },
  build: {
    chunkSizeWarningLimit: 100000000,
  },
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,
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
}));
