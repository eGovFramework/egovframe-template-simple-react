import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // config 평가 시점에는 .env 파일이 자동 로드되지 않으므로 loadEnv 로 명시적으로 읽는다.
  // (셸 환경변수 + .env[.mode] 파일을 모두 병합해 반환한다)
  // https://vite.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [
    react({
      include: "**/*.{jsx,js}",
    }),
  ],

  base: "/",
  server: {
    port: 3000,
    // 개발 서버에서도 배포(nginx)와 동일하게 /api prefix 를 백엔드로 프록시한다.
    // 대상 호스트는 VITE_APP_API_PROXY_TARGET 로 바꿀 수 있고, 미지정 시 로컬 백엔드를 사용한다.
    // /api/board -> {target}/board 형태로 prefix 를 제거해 전달한다.
    proxy: {
      "/api": {
        target: env.VITE_APP_API_PROXY_TARGET || "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
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
    sourcemap: false,
  },
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,
    exclude: [],
    drop: mode === "production" ? ["console", "debugger"] : [],
    pure: mode === "production" ? ["console.log", "console.info", "console.debug", "console.trace"] : [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
    },
  },
  };
});
