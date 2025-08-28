import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // TypeScript, JavaScript 모두 지원
      include: "**/*.{jsx,js,tsx,ts}",
    })
  ],
  
  base: "/",
  server: {
    port: 3000,
    host: true, // 외부 접근 허용
    strictPort: true,
  },
  
  // 경로 별칭 설정 (tsconfig.json과 동기화)
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/types": resolve(__dirname, "src/types"),
      "@/components": resolve(__dirname, "src/components"),
      "@/pages": resolve(__dirname, "src/pages"),
      "@/utils": resolve(__dirname, "src/utils"),
      "@/api": resolve(__dirname, "src/api"),
      "@/hooks": resolve(__dirname, "src/hooks"),
      "@/constants": resolve(__dirname, "src/constants"),
    },
  },
  
  // 테스트 설정
  test: {
    globals: true,
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    transformMode: {
      web: [/\.[jt]sx?$/], // JS/JSX/TS/TSX 모두 web 모드 변환
    },
  },
  
  // 빌드 설정
  build: {
    chunkSizeWarningLimit: 1000, // 청크 크기 경고 임계값
    rollupOptions: {
      output: {
        // 청크 분할 최적화
        manualChunks: {
          // React 관련 라이브러리
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 전자정부 프레임워크 공통 컴포넌트
          'egov-components': [
            './src/components/EgovHeader.jsx',
            './src/components/EgovFooter.jsx',
            './src/components/EgovPaging.jsx',
          ],
          // 유틸리티 라이브러리
          'utils': ['qs', 'web-vitals'],
        }
      }
    },
    // 소스맵 생성 (개발용)
    sourcemap: true,
    // TypeScript 선언 파일 생성 비활성화 (Vite에서는 불필요)
    emptyOutDir: true,
  },
  
  // TypeScript와 JavaScript 파일 처리 최적화
  esbuild: {
    loader: "jsx",
    include: /\.[jt]sx?$/,
    exclude: [],
  },
  
  // 의존성 최적화
  optimizeDeps: {
    include: [
      'react',
      'react-dom', 
      'react-router-dom',
      'qs',
      'web-vitals'
    ],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx", 
        ".ts": "tsx",
        ".tsx": "tsx",
      },
    },
  },
  
  // 환경 변수 타입 지원
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
