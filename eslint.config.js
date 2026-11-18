import js from "@eslint/js";
import globals from "globals";
import { fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// eslint-plugin-react 는 아직 ESLint 10 을 공식 지원하지 않으므로(ESLint 10 에서 제거된 context API 사용)
// @eslint/compat 의 fixupPluginRules 로 감싸서 사용한다. package.json 의 overrides 도 같은 이유다.
const reactPlugin = fixupPluginRules(react);

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2020, ...globals.node },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // react-hooks v4 의 recommended 와 같은 규칙만 사용한다. (v7 recommended 의 React Compiler 규칙은 제외)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // map 등에서 반환한 <>...</> 의 key 누락도 검사한다. (기본값은 축약형 Fragment 를 검사하지 않음)
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/jsx-no-target-blank": "error",
      "react/prop-types": ["off"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
