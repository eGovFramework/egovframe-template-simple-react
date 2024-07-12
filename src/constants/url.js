
const URL = {
    //COMMON
    MAIN                        : "/", //메인페이지   
    
    LOGIN                       : "/login", //로그인
    ERROR                       : "/error", //로그인
    
    //ABOUT
    ABOUT                       : "/about", //사이트소개   
    ABOUT_SITE                  : "/about/site", // 사이트소개/소개
    ABOUT_HISTORY               : "/about/history", // 사이트소개/연혁
    ABOUT_ORGANIZATION          : "/about/organization", // 사이트소개/조직소개
    ABOUT_LOCATION              : "/about/location", // 사이트소개/찾아오시는길
    
    //INTRO
    INTRO                       : "/intro", //정보마당
    INTRO_WORKS                 : "/intro/works", // 정보마당/주요사업소개
    INTRO_SERVICE               : "/intro/service", // 정보마당/주요서비스소개
    
    //SUPPORT
    SUPPORT                     : "/support", // 고객지원
    SUPPORT_DOWNLOAD            : "/support/download", // 고객지원/자료실
    SUPPORT_DOWNLOAD_DETAIL     : "/support/download/detail", // 고객지원/자료실/상세
    SUPPORT_DOWNLOAD_CREATE     : "/support/download/create", // 고객지원/자료실/등록
    SUPPORT_QNA                 : "/support/qna", // 고객지원/묻고답하기
    SUPPORT_QNA_DETAIL          : "/support/qna/detail", // 고객지원/묻고답하기/상세
    SUPPORT_APPLY               : "/support/apply", // 고객지원/서비스신청
    
    //INFORM
    INFORM                      : "/inform", // 알림마당 
    INFORM_DAILY                : "/inform/daily", // 알림마당/오늘의행사
    INFORM_DAILY_DETAIL         : "/inform/daily/detail", // 알림마당/오늘의행사상세
    INFORM_WEEKLY               : "/inform/weekly", // 알림마당/금주의행사
    INFORM_WEEKLY_DETAIL        : "/inform/weekly/detail", // 알림마당/금주의행사상세
    INFORM_NOTICE               : "/inform/notice", // 알림마당/공지사항
    INFORM_NOTICE_DETAIL        : "/inform/notice/detail", // 알림마당/공지사항상세
    INFORM_NOTICE_CREATE        : "/inform/notice/create", // 알림마당/공지사항등록
    INFORM_NOTICE_MODIFY        : "/inform/notice/modify", // 알림마당/공지사항수정
    INFORM_NOTICE_REPLY         : "/inform/notice/reply", // 알림마당/공지사항답글
    INFORM_GALLERY              : "/inform/gallery", // 알림마당/사이트갤러리
    INFORM_GALLERY_DETAIL       : "/inform/gallery/detail", // 알림마당/사이트갤러리상세
    INFORM_GALLERY_CREATE       : "/inform/gallery/create", // 알림마당/사이트갤러리등록
    INFORM_GALLERY_MODIFY       : "/inform/gallery/modify", // 알림마당/사이트갤러리수정
    INFORM_GALLERY_REPLY        : "/inform/gallery/reply", // 알림마당/사이트갤러리답글
    
    //ADMIN
    ADMIN                       : "/admin", // 사이트관리
    ADMIN_SCHEDULE              : "/admin/schedule", // 사이트관리/일정관리
    ADMIN_SCHEDULE_DETAIL       : "/admin/schedule/detail", // 사이트관리/일정관리상세
    ADMIN_SCHEDULE_CREATE       : "/admin/schedule/create", // 사이트관리/일정관리생성
    ADMIN_SCHEDULE_MODIFY       : "/admin/schedule/modify", // 사이트관리/일정관리수정

    ADMIN_BOARD                 : "/admin/board", // 사이트관리/게시판생성관리 목록
    ADMIN_BOARD_DETAIL          : "/admin/board/detail", // 사이트관리/게시판생성관리 상세
    ADMIN_BOARD_CREATE          : "/admin/board/create", // 사이트관리/게시판생성관리 등록
    ADMIN_BOARD_MODIFY          : "/admin/board/modify", // 사이트관리/게시판생성관리 상세/수정

    ADMIN_USAGE                 : "/admin/usage", // 사이트관리/게시판사용관리 목록
    ADMIN_USAGE_DETAIL          : "/admin/usage/detail", // 사이트관리/게시판사용관리 상세
    ADMIN_USAGE_CREATE          : "/admin/usage/create", // 사이트관리/게시판사용관리 등록
    ADMIN_USAGE_MODIFY          : "/admin/usage/modify", // 사이트관리/게시판사용관리 상세/수정

    ADMIN_NOTICE                : "/admin/notice/", // 사이트관리/공지사항관리 목록
    ADMIN_NOTICE_DETAIL         : "/admin/notice/detail", // 사이트관리/공지사항관리 상세
    ADMIN_NOTICE_CREATE         : "/admin/notice/create", // 사이트관리/공지사항관리 등록
    ADMIN_NOTICE_MODIFY         : "/admin/notice/modify", // 사이트관리/공지사항관리 수정
    ADMIN_NOTICE_REPLY          : "/admin/notice/reply", // 사이트관리/공지사항관리 답글 등록

    ADMIN_GALLERY               : "/admin/gallery", // 사이트관리/사이트갤러리관리
    ADMIN_GALLERY_DETAIL        : "/admin/gallery/detail", // 사이트관리/사이트갤러리관리 상세
    ADMIN_GALLERY_CREATE        : "/admin/gallery/create", // 사이트관리/사이트갤러리관리 등록
    ADMIN_GALLERY_MODIFY        : "/admin/gallery/modify", // 사이트관리/사이트갤러리관리 수정
    ADMIN_GALLERY_REPLY         : "/admin/gallery/reply", // 사이트관리/사이트갤러리관리 답글 등록
    
	ADMIN_MANAGER               : "/admin/manager/", // 사이트관리/사이트관리자 암호변경 기능
}

export default URL;