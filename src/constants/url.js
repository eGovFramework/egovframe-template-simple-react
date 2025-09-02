const URL = {
  //COMMON
  MAIN: "/egovframe-template-simple-react", //메인페이지

  LOGIN: "/egovframe-template-simple-react/login", //로그인
  ERROR: "/egovframe-template-simple-react/error", //로그인

  //ABOUT
  ABOUT: "/egovframe-template-simple-react/about", //사이트소개
  ABOUT_SITE: "/egovframe-template-simple-react/about/site", // 사이트소개/소개
  ABOUT_HISTORY: "/egovframe-template-simple-react/about/history", // 사이트소개/연혁
  ABOUT_ORGANIZATION: "/egovframe-template-simple-react/about/organization", // 사이트소개/조직소개
  ABOUT_LOCATION: "/egovframe-template-simple-react/about/location", // 사이트소개/찾아오시는길

  //INTRO
  INTRO: "/egovframe-template-simple-react/intro", //정보마당
  INTRO_WORKS: "/egovframe-template-simple-react/intro/works", // 정보마당/주요사업소개
  INTRO_SERVICE: "/egovframe-template-simple-react/intro/service", // 정보마당/주요서비스소개

  //SUPPORT
  SUPPORT: "/egovframe-template-simple-react/support", // 고객지원
  SUPPORT_DOWNLOAD: "/egovframe-template-simple-react/support/download", // 고객지원/자료실
  SUPPORT_DOWNLOAD_DETAIL:
    "/egovframe-template-simple-react/support/download/detail", // 고객지원/자료실/상세
  SUPPORT_DOWNLOAD_CREATE:
    "/egovframe-template-simple-react/support/download/create", // 고객지원/자료실/등록
  SUPPORT_QNA: "/egovframe-template-simple-react/support/qna", // 고객지원/묻고답하기
  SUPPORT_QNA_DETAIL: "/egovframe-template-simple-react/support/qna/detail", // 고객지원/묻고답하기/상세
  SUPPORT_APPLY: "/egovframe-template-simple-react/support/apply", // 고객지원/서비스신청

  //INFORM
  INFORM: "/egovframe-template-simple-react/inform", // 알림마당
  INFORM_DAILY: "/egovframe-template-simple-react/inform/daily", // 알림마당/오늘의행사
  INFORM_DAILY_DETAIL: "/egovframe-template-simple-react/inform/daily/detail", // 알림마당/오늘의행사상세
  INFORM_WEEKLY: "/egovframe-template-simple-react/inform/weekly", // 알림마당/금주의행사
  INFORM_WEEKLY_DETAIL: "/egovframe-template-simple-react/inform/weekly/detail", // 알림마당/금주의행사상세
  INFORM_NOTICE: "/egovframe-template-simple-react/inform/notice", // 알림마당/공지사항
  INFORM_NOTICE_DETAIL: "/egovframe-template-simple-react/inform/notice/detail", // 알림마당/공지사항상세
  INFORM_NOTICE_CREATE: "/egovframe-template-simple-react/inform/notice/create", // 알림마당/공지사항등록
  INFORM_NOTICE_MODIFY: "/egovframe-template-simple-react/inform/notice/modify", // 알림마당/공지사항수정
  INFORM_NOTICE_REPLY: "/egovframe-template-simple-react/inform/notice/reply", // 알림마당/공지사항답글
  INFORM_GALLERY: "/egovframe-template-simple-react/inform/gallery", // 알림마당/사이트갤러리
  INFORM_GALLERY_DETAIL:
    "/egovframe-template-simple-react/inform/gallery/detail", // 알림마당/사이트갤러리상세
  INFORM_GALLERY_CREATE:
    "/egovframe-template-simple-react/inform/gallery/create", // 알림마당/사이트갤러리등록
  INFORM_GALLERY_MODIFY:
    "/egovframe-template-simple-react/inform/gallery/modify", // 알림마당/사이트갤러리수정
  INFORM_GALLERY_REPLY: "/egovframe-template-simple-react/inform/gallery/reply", // 알림마당/사이트갤러리답글

  //ADMIN
  ADMIN: "/egovframe-template-simple-react/admin", // 사이트관리
  ADMIN_SCHEDULE: "/egovframe-template-simple-react/admin/schedule", // 사이트관리/일정관리
  ADMIN_SCHEDULE_DETAIL:
    "/egovframe-template-simple-react/admin/schedule/detail", // 사이트관리/일정관리상세
  ADMIN_SCHEDULE_CREATE:
    "/egovframe-template-simple-react/admin/schedule/create", // 사이트관리/일정관리생성
  ADMIN_SCHEDULE_MODIFY:
    "/egovframe-template-simple-react/admin/schedule/modify", // 사이트관리/일정관리수정

  ADMIN_BOARD: "/egovframe-template-simple-react/admin/board", // 사이트관리/게시판생성관리 목록
  ADMIN_BOARD_DETAIL: "/egovframe-template-simple-react/admin/board/detail", // 사이트관리/게시판생성관리 상세
  ADMIN_BOARD_CREATE: "/egovframe-template-simple-react/admin/board/create", // 사이트관리/게시판생성관리 등록
  ADMIN_BOARD_MODIFY: "/egovframe-template-simple-react/admin/board/modify", // 사이트관리/게시판생성관리 상세/수정

  ADMIN_USAGE: "/egovframe-template-simple-react/admin/usage", // 사이트관리/게시판사용관리 목록
  ADMIN_USAGE_DETAIL: "/egovframe-template-simple-react/admin/usage/detail", // 사이트관리/게시판사용관리 상세
  ADMIN_USAGE_CREATE: "/egovframe-template-simple-react/admin/usage/create", // 사이트관리/게시판사용관리 등록
  ADMIN_USAGE_MODIFY: "/egovframe-template-simple-react/admin/usage/modify", // 사이트관리/게시판사용관리 상세/수정

  ADMIN_NOTICE: "/egovframe-template-simple-react/admin/notice/", // 사이트관리/공지사항관리 목록
  ADMIN_NOTICE_DETAIL: "/egovframe-template-simple-react/admin/notice/detail", // 사이트관리/공지사항관리 상세
  ADMIN_NOTICE_CREATE: "/egovframe-template-simple-react/admin/notice/create", // 사이트관리/공지사항관리 등록
  ADMIN_NOTICE_MODIFY: "/egovframe-template-simple-react/admin/notice/modify", // 사이트관리/공지사항관리 수정
  ADMIN_NOTICE_REPLY: "/egovframe-template-simple-react/admin/notice/reply", // 사이트관리/공지사항관리 답글 등록

  ADMIN_GALLERY: "/egovframe-template-simple-react/admin/gallery", // 사이트관리/사이트갤러리관리
  ADMIN_GALLERY_DETAIL: "/egovframe-template-simple-react/admin/gallery/detail", // 사이트관리/사이트갤러리관리 상세
  ADMIN_GALLERY_CREATE: "/egovframe-template-simple-react/admin/gallery/create", // 사이트관리/사이트갤러리관리 등록
  ADMIN_GALLERY_MODIFY: "/egovframe-template-simple-react/admin/gallery/modify", // 사이트관리/사이트갤러리관리 수정
  ADMIN_GALLERY_REPLY: "/egovframe-template-simple-react/admin/gallery/reply", // 사이트관리/사이트갤러리관리 답글 등록

  ADMIN_MANAGER: "/egovframe-template-simple-react/admin/manager/", // 사이트관리/사이트관리자 암호변경 기능

  ADMIN_MEMBERS: "/admin/members/", // 사이트관리/회원관리 목록기능
  ADMIN_MEMBERS_DETAIL: "/admin/members/detail", // 사이트관리/회원관리 상세
  ADMIN_MEMBERS_CREATE: "/admin/members/create", // 사이트관리/회원관리 등록
  ADMIN_MEMBERS_MODIFY: "/admin/members/modify", // 사이트관리/회원관리 상세/수정

  //MYPAGE
  MYPAGE_MODIFY: "/mypage/modify", // 고객지원/마이페이지/회원 수정
  MYPAGE_CREATE: "/mypage/create", // 고객지원/마이페이지/회원 등록
};

// eslint-disable-next-line react-refresh/only-export-components
export default URL;
