// eslint.config.js - 완벽한 TypeScript 지원 설정
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import js from "@eslint/js";

export default tseslint.config(
  {
    // 제외할 파일들
    ignores: [
      "dist/",
      "build/",
      "coverage/",
      "node_modules/",
      "*.tsbuildinfo",
      ".tsbuildinfo",
      "eslint.config.js", // 설정 파일 자체는 제외
      "vite.config.js", // Vite 설정 파일 제외
      "vitest.setup.js", // 테스트 설정 파일 제외
    ],
  },

  // === 기본 JavaScript 설정 ===
  js.configs.recommended,

  // === Node.js 환경 설정 파일들 ===
  {
    files: ["vite.config.js", "vitest.setup.js", "eslint.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      // 설정 파일에서는 console.log 허용
      "no-console": "off",
    },
  },

  // === React/JavaScript 파일들 ===
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    rules: {
      // React 규칙들
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // 특화 규칙
      "react/prop-types": "off", // TypeScript에서 타입 검사하므로 비활성화
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 개발 편의성 위한 규칙 완화
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "no-console": [
        "warn",
        { allow: ["warn", "error", "info", "log", "group", "groupEnd", "groupCollapsed"] },
      ],
    },
  },

  // === TypeScript 파일들에 대한 기본 설정 ===
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx}"],
  })),

  // === TypeScript 파일들에 대한 상세 설정 ===
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    rules: {
      // TypeScript 전용 규칙들
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // any 타입 사용에 대한 완화된 규칙
      "@typescript-eslint/no-explicit-any": [
        "warn",
        {
          fixToUnknown: true,
          ignoreRestArgs: true,
        },
      ],

      // React + TypeScript 규칙들
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript 추가 규칙들
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-import-type-side-effects": "warn",
    },
  },

  // === 타입 정의 파일들에 대한 특별 설정 ===
  {
    files: ["src/types/**/*.{ts,d.ts}"],
    rules: {
      // 타입 정의 파일에서는 any 사용 허용 (외부 라이브러리 타입 정의 등)
      "@typescript-eslint/no-explicit-any": "off",
      // 타입 정의에서 사용하지 않는 변수는 허용
      "@typescript-eslint/no-unused-vars": "off",
      // 타입만 정의하는 파일에서는 import type 강제하지 않음
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },

  // === 테스트 파일들 ===
  {
    files: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        vi: "readonly",
        vitest: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      // 테스트 파일에서는 규칙 완화
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  }
);
