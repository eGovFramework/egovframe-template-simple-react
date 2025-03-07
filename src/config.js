// Configuration for different environments
export const SERVER_URL = process.env.NODE_ENV === 'test' ? 'http://localhost:8080' : 'http://localhost:8080';

export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // default = 공지사항 게시판 아이디
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // 공지사항 게시판 아이디
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB"; // 갤러리 게시판 아이디
