// API 호출의 base URL.
// 빈 문자열(기본값)이면 동일 출처(same-origin) 상대경로로 호출되어
// 배포 환경에서는 앞단 nginx 가 /api 경로를 백엔드로 리버스 프록시한다.
// 별도 호스트로 직접 호출해야 할 때만 VITE_APP_API_BASE_URL 로 절대 URL 을 지정한다.
//   예) VITE_APP_API_BASE_URL=http://localhost:8080
// 미지정 시 "/api" prefix 를 사용해 nginx location /api/ 프록시 규칙과 맞춘다.
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL ?? "/api";

export const SERVER_URL = API_BASE_URL;

export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // default = 공지사항 게시판 아이디
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // 공지사항 게시판 아이디
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB"; // 갤러리 게시판 아이디