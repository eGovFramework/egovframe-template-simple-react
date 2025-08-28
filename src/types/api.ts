// API 요청/응답 관련 타입

import type { BaseApiResponse, PaginationInfo } from "./common";

/** HTTP 메서드 타입 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/** API 요청 기본 옵션 */
export interface ApiRequestOptions extends RequestInit {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

/** 목록 조회 공통 파라미터 */
export interface ListRequestParams {
  /** 페이지 번호 (1부터 시작) */
  pageIndex?: number;
  /** 페이지 크기 */
  pageSize?: number;
  /** 검색 조건 */
  searchCnd?: string;
  /** 검색어 */
  searchWrd?: string;
  /** 키워드 검색 */
  searchKeyword?: string;
  /** 정렬 컬럼 */
  sortColumn?: string;
  /** 정렬 방향 */
  sortDirection?: "ASC" | "DESC";
}

/** 목록 조회 응답 */
export interface ListResponse<T> extends BaseApiResponse {
  /** 목록 데이터 */
  resultList: T[];
  /** 페이징 정보 */
  paginationInfo: PaginationInfo;
  /** 전체 건수 */
  totalCount: number;
}

/** 단일 항목 조회 응답 */
export interface DetailResponse<T> extends BaseApiResponse {
  /** 상세 데이터 */
  result: T;
}

/** 생성/수정/삭제 응답 */
export interface CrudResponse extends BaseApiResponse {
  /** 처리된 항목 ID */
  resultId?: string;
  /** 영향받은 행 수 */
  affectedRows?: number;
}

/** 파일 업로드 요청 */
export interface FileUploadRequest {
  /** 업로드할 파일들 */
  files: FileList | File[];
  /** 파일 구분 코드 */
  fileTyCode?: string;
  /** 최대 파일 크기 (바이트) */
  maxFileSize?: number;
  /** 허용 확장자 */
  allowedExtensions?: string[];
}

/** 파일 업로드 응답 */
export interface FileUploadResponse extends BaseApiResponse {
  /** 첨부파일 ID */
  atchFileId: string;
  /** 업로드된 파일 정보 */
  uploadedFiles: Array<{
    fileSn: number;
    orignlFileNm: string;
    streFileNm: string;
    fileMg: number;
  }>;
}

/** 로그인 요청 */
export interface LoginRequest {
  /** 사용자 ID */
  id: string;
  /** 비밀번호 */
  password: string;
  /** 사용자 구분 */
  userSe?: string;
  /** 자동 로그인 여부 */
  autoLogin?: boolean;
}

/** 로그인 응답 */
export interface LoginResponse extends BaseApiResponse {
  result?: {
    /** JWT 토큰 */
    jToken: string;
    /** 사용자 정보 */
    loginVO: import("./common").LoginUser;
    /** 메뉴 권한 정보 */
    menuList?: import("./common").MenuInfo[];
  };
}

/** 소셜 로그인 요청 */
export interface SocialLoginRequest {
  /** 소셜 로그인 제공자 (NAVER, KAKAO) */
  provider: "NAVER" | "KAKAO";
  /** 인증 코드 */
  code: string;
  /** 상태 값 */
  state?: string;
}

/** 비밀번호 변경 요청 */
export interface PasswordChangeRequest {
  /** 현재 비밀번호 */
  currentPassword: string;
  /** 새 비밀번호 */
  newPassword: string;
  /** 새 비밀번호 확인 */
  confirmPassword: string;
}

/** 게시판 목록 조회 파라미터 */
export interface BoardListParams extends ListRequestParams {
  /** 게시판 ID */
  bbsId: string;
  /** 카테고리 ID */
  ctgryId?: string;
  /** 공지사항 포함 여부 */
  includeNotice?: boolean;
}

/** 게시글 등록/수정 요청 */
export interface BoardSaveRequest {
  /** 게시판 ID */
  bbsId: string;
  /** 제목 */
  nttSj: string;
  /** 내용 */
  nttCn: string;
  /** 첨부파일 ID */
  atchFileId?: string;
  /** 공지사항 여부 */
  noticeAt?: "Y" | "N";
  /** 공지 시작일 (공지사항인 경우) */
  ntceBgnde?: string;
  /** 공지 종료일 (공지사항인 경우) */
  ntceEndde?: string;
}

/** 회원 가입 요청 */
export interface MemberJoinRequest {
  /** 사용자 ID */
  mberId: string;
  /** 비밀번호 */
  password: string;
  /** 비밀번호 확인 */
  passwordCnfrm: string;
  /** 사용자명 */
  mberNm: string;
  /** 이메일 */
  mberEmailAdres?: string;
  /** 휴대폰 번호 */
  moblphonNo?: string;
  /** 우편번호 */
  zip?: string;
  /** 주소 */
  adres?: string;
  /** 상세주소 */
  detailAdres?: string;
}

/** 일정 등록/수정 요청 */
export interface ScheduleSaveRequest {
  /** 일정명 */
  schdulNm: string;
  /** 일정 내용 */
  schdulCn?: string;
  /** 시작일시 */
  schdulBgnde: string;
  /** 종료일시 */
  schdulEndde: string;
  /** 반복 구분 */
  reptitSeCode?: string;
  /** 부서 ID */
  deptId?: string;
}

/** 공통 코드 조회 파라미터 */
export interface CodeListParams {
  /** 코드 ID */
  codeId: string;
  /** 사용 여부로 필터링 */
  useAt?: "Y" | "N";
}

/** API 에러 타입 */
export interface ApiError extends Error {
  /** HTTP 상태 코드 */
  status?: number;
  /** 에러 코드 */
  code?: string;
  /** 에러 상세 정보 */
  details?: Record<string, unknown>;
  /** 원본 Response 객체 */
  response?: Response;
}

/** API 클라이언트 설정 */
export interface ApiClientConfig {
  /** Base URL */
  baseURL: string;
  /** 기본 헤더 */
  defaultHeaders?: Record<string, string>;
  /** 타임아웃 (밀리초) */
  timeout?: number;
  /** JWT 토큰 */
  token?: string;
  /** 인터셉터 설정 */
  interceptors?: {
    request?: (
      config: ApiRequestOptions
    ) => ApiRequestOptions | Promise<ApiRequestOptions>;
    response?: <T>(response: T) => T | Promise<T>;
    error?: (error: ApiError) => ApiError | Promise<ApiError>;
  };
}

/** 페이지 정보 (라우팅용) */
export interface PageInfo {
  /** 페이지 경로 */
  path: string;
  /** 페이지 제목 */
  title: string;
  /** 메타 설명 */
  description?: string;
  /** 메타 키워드 */
  keywords?: string[];
  /** 접근 권한 필요 여부 */
  requireAuth?: boolean;
  /** 필요 권한 목록 */
  requiredRoles?: string[];
}
