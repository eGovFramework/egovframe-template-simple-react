/// <reference types="vite/client" />

// === Vite 환경변수 타입 정의 ===
interface ImportMetaEnv {
  /** 애플리케이션 제목 */
  readonly VITE_APP_TITLE?: string;
  /** 전자정부 백엔드 서버 URL */
  readonly VITE_APP_EGOV_CONTEXT_URL: string;
  /** 네이버 로그인 클라이언트 ID */
  readonly VITE_APP_NAVER_CLIENTID?: string;
  /** 네이버 로그인 콜백 URL */
  readonly VITE_APP_NAVER_CALLBACKURL?: string;
  /** 카카오 로그인 클라이언트 ID */
  readonly VITE_APP_KAKAO_CLIENTID?: string;
  /** 카카오 로그인 콜백 URL */
  readonly VITE_APP_KAKAO_CALLBACKURL?: string;
  /** 로그인 상태값 */
  readonly VITE_APP_STATE?: string;
  /** 환경 구분 (development | production | test) */
  readonly NODE_ENV: "development" | "production" | "test";
  /** 개발 모드 여부 */
  readonly DEV: boolean;
  /** 프로덕션 모드 여부 */
  readonly PROD: boolean;
  /** SSR 모드 여부 */
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// === 전역 타입 확장 ===
declare global {
  /** 개발 환경 플래그 */
  const __DEV__: boolean;
}

// === 유틸리티 타입들 ===

/** 선택적 속성 가진 타입 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 특정 속성 필수로 만드는 타입 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** null or undefined 허용하는 타입 */
export type Nullable<T> = T | null;

/** undefined 허용하는 타입 */
export type Maybe<T> = T | undefined;

/** 브랜드 타입 */
export type Brand<T, U extends string> = T & { readonly __brand: U };

/** 날짜 문자열 (YYYY-MM-DD) */
export type DateString = Brand<string, "DateString">;

/** 날짜시간 문자열 (YYYY-MM-DD HH:mm:ss) */
export type DateTimeString = Brand<string, "DateTimeString">;

/** ID 타입 (문자열 기반) */
export type ID = Brand<string, "ID">;

/** Hex 색상 코드 */
export type HexColor = Brand<string, "HexColor">;

// === 리액트 관련 타입 확장 ===

declare module "react" {
  /** 컴포넌트 Props의 기본 인터페이스 */
  interface HTMLAttributes<T> {
    /** 테스트용 식별자 */
    "data-testid"?: string;
  }

  /** 폼 요소의 기본 인터페이스 */
  interface FormHTMLAttributes<T> {
    /** 폼 전송 방지 */
    "data-no-submit"?: boolean;
  }
}

// === 모듈 선언 ===

/** CSS 모듈 타입 정의 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/** SCSS 모듈 타입 정의 */
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/** 이미지 파일 타입 정의 */
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

/** Web Vitals 라이브러리 타입 확장 */
declare module "web-vitals" {
  export interface Metric {
    name: string;
    value: number;
    delta: number;
    id: string;
    entries: PerformanceEntry[];
  }

  export function getCLS(onPerfEntry?: (metric: Metric) => void): void;
  export function getFID(onPerfEntry?: (metric: Metric) => void): void;
  export function getFCP(onPerfEntry?: (metric: Metric) => void): void;
  export function getLCP(onPerfEntry?: (metric: Metric) => void): void;
  export function getTTFB(onPerfEntry?: (metric: Metric) => void): void;
}

export {};
