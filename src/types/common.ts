// 전자정부 프레임워크 핵심 타입

/** 페이징 관련 타입 */
export interface PaginationInfo {
  /** 현재 페이지 번호 */
  currentPageNo: number;
  /** 페이지당 레코드 수 */
  recordCountPerPage: number;
  /** 페이지 크기 (한 페이지에 보여줄 항목 수) */
  pageSize: number;
  /** 전체 레코드 수 */
  totalRecordCount: number;
  /** 전체 페이지 수 */
  totalPageCount: number;
  /** 페이지 목록에서 첫 번째 페이지 번호 */
  firstPageNoOnPageList: number;
  /** 페이지 목록에서 마지막 페이지 번호 */
  lastPageNoOnPageList: number;
  /** 첫 번째 레코드 인덱스 */
  firstRecordIndex: number;
  /** 마지막 레코드 인덱스 */
  lastRecordIndex: number;
  /** 마지막 페이지 번호 */
  lastPageNo: number;
  /** 첫 번째 페이지 번호 */
  firstPageNo: number;
}

/** 페이징 컴포넌트 Props */
export interface EgovPagingProps {
  pagination: PaginationInfo;
  moveToPage: (pageNo: number) => void;
  className?: string;
}

/** API 공통 응답 기본 구조 */
export interface BaseApiResponse {
  /** 응답 코드 (200: 성공, 300: 로그인 실패, 403: 인가된 사용자가 아님, 800: 저장시 내부 오류, 900: 입력값 무결성 오류) */
  resultCode: number;
  /** 응답 메시지 */
  resultMessage: string;
}

/** API 성공 응답 */
export interface ApiResponse<T = unknown> extends BaseApiResponse {
  /** 응답 데이터 */
  result?: T;
}

/** API 에러 응답 */
export interface ApiErrorResponse extends BaseApiResponse {
  /** 에러 상세 정보 */
  errorDetails?: Record<string, unknown>;
}

/** 사용자 구분 코드 타입 */
export type UserSeCode = 
  | "GNR"  // 일반회원
  | "ENT"  // 기업회원
  | "USR"  // 일반사용자
  | "ADM"; // 관리자

/** 로그인 사용자 정보 */
export interface LoginUser {
  /** 사용자 ID */
  id: string;
  /** 사용자명 */
  name: string;
  /** 이메일 주소 */
  email?: string;
  /** 사용자 구분 코드 */
  userSe?: UserSeCode;
  /** 소속 조직 ID */
  orgnztId?: string;
  /** 권한 그룹 목록 */
  authorList?: Authority[];
}

/** 권한 정보 */
export interface Authority {
  /** 권한 코드 */
  authorCode: string;
  /** 권한명 */
  authorNm: string;
  /** 권한 설명 */
  authorDc?: string;
}

/** 게시판 기본 정보 */
export interface Board {
  /** 게시글 ID */
  nttId: string;
  /** 게시글 제목 */
  nttSj: string;
  /** 게시글 내용 */
  nttCn: string;
  /** 작성자명 */
  ntcrNm: string;
  /** 작성자 ID */
  ntcrId?: string;
  /** 최초 등록일시 */
  frstRegistPnttm: string;
  /** 최종 수정일시 */
  lastUpdtPnttm?: string;
  /** 조회수 */
  rdcnt: number;
  /** 사용 여부 (Y/N) */
  useAt: "Y" | "N";
  /** 게시판 ID */
  bbsId?: string;
  /** 답변 여부 */
  replyAt?: "Y" | "N";
  /** 답변 깊이 */
  replyLc?: number;
}

/** 공지사항 정보 */
export interface Notice extends Board {
  /** 공지 시작일 */
  ntceBgnde?: string;
  /** 공지 종료일 */
  ntceEndde?: string;
  /** 공지 우선순위 */
  ntceOrdr?: number;
}

/** 첨부파일 정보 */
export interface AttachFile {
  /** 첨부파일 ID */
  atchFileId: string;
  /** 파일 순번 */
  fileSn: number;
  /** 원본 파일명 */
  orignlFileNm: string;
  /** 저장 파일명 */
  streFileNm: string;
  /** 파일 저장 경로 */
  fileStreCours: string;
  /** 파일 크기 (바이트) */
  fileMg: number;
  /** 파일 확장자 */
  fileExtsn: string;
  /** 파일 다운로드 URL */
  downloadUrl?: string;
}

/** 공통 코드 정보 */
export interface CommonCode {
  /** 코드 ID */
  codeId: string;
  /** 코드 값 */
  code: string;
  /** 코드명 */
  codeNm: string;
  /** 코드 설명 */
  codeDc?: string;
  /** 사용 여부 */
  useAt: "Y" | "N";
  /** 정렬 순서 */
  sortOrdr?: number;
}

/** 메뉴 정보 */
export interface MenuInfo {
  /** 메뉴 ID */
  menuId: string;
  /** 메뉴명 */
  menuNm: string;
  /** 상위 메뉴 ID */
  upperMenuId?: string;
  /** 메뉴 URL */
  menuUrl?: string;
  /** 메뉴 레벨 */
  menuLvel: number;
  /** 메뉴 순서 */
  sortOrdr: number;
  /** 사용 여부 */
  useAt: "Y" | "N";
  /** 하위 메뉴 목록 */
  children?: MenuInfo[];
}

/** 선택 옵션 (Select, Radio, Checkbox용) */
export interface SelectOption<T = string> {
  /** 옵션 값 */
  value: T;
  /** 옵션 표시명 */
  label: string;
  /** 선택 여부 */
  selected?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 데이터 */
  data?: Record<string, unknown>;
}

/** 일정 관리 정보 */
export interface Schedule {
  /** 일정 ID */
  schdulId: string;
  /** 일정명 */
  schdulNm: string;
  /** 일정 내용 */
  schdulCn?: string;
  /** 일정 시작일시 */
  schdulBgnde: string;
  /** 일정 종료일시 */
  schdulEndde: string;
  /** 반복 구분 */
  reptitSeCode?: string;
  /** 부서 ID */
  deptId?: string;
  /** 등록자 ID */
  registUserId?: string;
}

/** 전자정부 컴포넌트 공통 Props */
export interface EgovComponentProps {
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 접근성을 위한 ID */
  id?: string;
  /** 접근성 라벨 */
  "aria-label"?: string;
  /** 테스트용 식별자 */
  "data-testid"?: string;
}

/** 날짜 형식의 문자열 (예: 'YYYY-MM-DD') */
export type DateString = string;

/** 날짜 및 시간 형식의 문자열 (예: 'YYYY-MM-DD HH:mm:ss') */
export type DateTimeString = string;
