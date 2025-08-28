import type {
  AttachFile,
  DateString,
  DateTimeString,
  LoginUser,
  PaginationInfo,
} from "./common";

// 전자정부 프레임워크 TypeScript 타입 정의 통합 Export

// === 핵심 타입 ===
export * from "./api";
export * from "./common";

// === 자주 사용하는 타입들 Named Export ===
export type {
  AttachFile,
  Authority,
  Board,
  CommonCode,
  EgovComponentProps,
  EgovPagingProps,
  LoginUser,
  MenuInfo,
  Notice,
  // 공통 타입들
  PaginationInfo,
  Schedule,
  SelectOption,
} from "./common";

export type {
  ApiClientConfig,
  ApiError,
  ApiRequestOptions,
  BoardListParams,
  BoardSaveRequest,
  CodeListParams,
  CrudResponse,
  DetailResponse,
  FileUploadRequest,
  FileUploadResponse,
  // API 타입들
  HttpMethod,
  ListRequestParams,
  ListResponse,
  LoginRequest,
  LoginResponse,
  MemberJoinRequest,
  PageInfo,
  PasswordChangeRequest,
  ScheduleSaveRequest,
  SocialLoginRequest,
} from "./api";

export type {
  Brand,
  DateString,
  DateTimeString,
  HexColor,
  ID,
  Maybe,
  Nullable,
  // 유틸리티 타입들
  Optional,
  RequiredBy,
} from "./env.d";

// === 타입 가드 함수들 ===

/** API 응답 성공인지 확인 */
export function isSuccessResponse(response: { resultCode?: string }): boolean {
  return response.resultCode === "200" || response.resultCode === "success";
}

/** 유효한 페이징 정보인지 확인 */
export function isValidPagination(
  pagination: unknown
): pagination is PaginationInfo {
  if (!pagination || typeof pagination !== "object") {
    return false;
  }

  const p = pagination as Record<string, unknown>;

  return (
    typeof p.currentPageNo === "number" &&
    typeof p.pageSize === "number" &&
    typeof p.totalRecordCount === "number" &&
    typeof p.recordCountPerPage === "number" &&
    p.currentPageNo > 0 &&
    p.pageSize > 0 &&
    p.totalRecordCount >= 0 &&
    p.recordCountPerPage > 0
  );
}

/** 로그인 사용자 정보 유효한지 확인 */
export function isValidLoginUser(user: unknown): user is LoginUser {
  if (!user || typeof user !== "object") {
    return false;
  }

  const u = user as Record<string, unknown>;

  return (
    typeof u.id === "string" &&
    typeof u.name === "string" &&
    u.id.length > 0 &&
    u.name.length > 0
  );
}

/** 첨부파일 정보 유효한지 확인 */
export function isValidAttachFile(file: unknown): file is AttachFile {
  if (!file || typeof file !== "object") {
    return false;
  }

  const f = file as Record<string, unknown>;

  return (
    typeof f.atchFileId === "string" &&
    typeof f.fileSn === "number" &&
    typeof f.orignlFileNm === "string" &&
    typeof f.streFileNm === "string" &&
    f.atchFileId.length > 0 &&
    f.orignlFileNm.length > 0
  );
}

// === 유틸리티 함수 ===

/** 날짜 문자열이 유효한지 확인 (YYYY-MM-DD 형식) */
export function isValidDateString(date: string): date is DateString {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

/** 날짜시간 문자열이 유효한지 확인 (YYYY-MM-DD HH:mm:ss 형식) */
export function isValidDateTimeString(
  dateTime: string
): dateTime is DateTimeString {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!dateTimeRegex.test(dateTime)) return false;

  const dateObj = new Date(dateTime);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

/** 페이지 번호 계산 */
export function calculateTotalPages(
  totalRecords: number,
  recordsPerPage: number
): number {
  return Math.ceil(totalRecords / recordsPerPage);
}

/** 페이지 범위 계산 */
export function calculatePageRange(
  currentPage: number,
  totalPages: number,
  displayPages: number = 10
): {
  startPage: number;
  endPage: number;
} {
  const halfDisplay = Math.floor(displayPages / 2);
  let startPage = Math.max(1, currentPage - halfDisplay);
  const endPage = Math.min(totalPages, startPage + displayPages - 1);

  // 끝 페이지 기준으로 시작 페이지 재조정
  if (endPage - startPage + 1 < displayPages) {
    startPage = Math.max(1, endPage - displayPages + 1);
  }

  return { startPage, endPage };
}

// === 상수 정의 ===

/** 전자정부 프레임워크 공통 상수 */
export const EGOV_CONSTANTS = {
  /** API 응답 코드 */
  API_RESULT_CODES: {
    SUCCESS: 200, // 성공
    LOGIN_FAILED: 300, // 로그인 실패
    UNAUTHORIZED: 403, // 인가된 사용자가 아님
    SERVER_ERROR: 800, // 저장시 내부 오류
    VALIDATION_ERROR: 900, // 입력값 무결성 오류
  } as const,

  /** 사용자 구분 코드 */
  USER_SE_CODES: {
    GENERAL: "GNR", // 일반회원
    ENTERPRISE: "ENT", // 기업회원
    USER: "USR", // 일반사용자
    ADMIN: "ADM", // 관리자
  } as const,

  /** 사용 여부 코드 */
  USE_AT_CODES: {
    YES: "Y",
    NO: "N",
  } as const,

  /** 게시판 모드 코드 */
  BOARD_MODE_CODES: {
    CREATE: "create", // 등록 모드
    MODIFY: "modify", // 수정 모드
    READ: "read", // 읽기 모드
    REPLY: "reply", // 답글 모드
  } as const,

  /** 기본 페이징 설정 */
  DEFAULT_PAGINATION: {
    PAGE_SIZE: 10,
    RECORD_COUNT_PER_PAGE: 10,
    DISPLAY_PAGES: 10,
  } as const,

  /** 파일 업로드 제한 */
  FILE_UPLOAD_LIMITS: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_EXTENSIONS: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "hwp",
    ],
  } as const,
} as const;

/** 환경변수 타입 안전 접근 함수 */
export function getEnvVar(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (typeof value !== "string") {
    throw new Error(
      `Environment variable ${key} is not defined or not a string`
    );
  }
  return value;
}

/** 선택적 환경변수 타입 안전 접근 함수 */
export function getOptionalEnvVar(
  key: keyof ImportMetaEnv
): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" ? value : undefined;
}
