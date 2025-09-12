import { useEffect, useState, useRef, useCallback } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import URL from "@/constants/url";
import CODE from "@/constants/code";

//COMMON
import EgovHeader from "@/components/EgovHeader";
import EgovFooter from "@/components/EgovFooter";
import EgovInfoPopup from "@/components/EgovInfoPopup";
import EgovError from "@/components/EgovError";

import EgovMain from "@/pages/main/EgovMain";
import EgovLogin from "@/pages/login/EgovLogin";

//SNS
import SnsNaverCallback from "@/components/sns/SnsNaverCallback";
import SnsKakaoCallback from "@/components/sns/SnsKakaoCallback";

//ABOUT
import EgovAboutSite from "@/pages/about/EgovAboutSite";
import EgovAboutHistory from "@/pages/about/EgovAboutHistory";
import EgovAboutOrganization from "@/pages/about/EgovAboutOrganization";
import EgovAboutLocation from "@/pages/about/EgovAboutLocation";

//INTRO
import EgovIntroWork from "@/pages/intro/EgovIntroWork";
import EgovIntroService from "@/pages/intro/EgovIntroService";

//SUPPORT
import EgovSupportDownloadList from "@/pages/support/download/EgovDownloadList";
import EgovSupportDownloadDetail from "@/pages/support/download/EgovDownloadDetail";
import EgovSupportDownloadCreate from "@/pages/support/download/EgovDownloadCreate";
import EgovSupportQnaList from "@/pages/support/qna/EgovQnaList";
import EgovSupportQnaDetail from "@/pages/support/qna/EgovQnaDetail";
import EgovSupportApply from "@/pages/support/apply/EgovSupportApply";

//INFORM
import EgovDailyList from "@/pages/inform/daily/EgovDailyList";
import EgovDailyDetail from "@/pages/inform/daily/EgovDailyDetail";
import EgovWeeklyList from "@/pages/inform/weekly/EgovWeeklyList";

import EgovNoticeList from "@/pages/inform/notice/EgovNoticeList";
import EgovNoticeDetail from "@/pages/inform/notice/EgovNoticeDetail";
import EgovNoticeEdit from "@/pages/inform/notice/EgovNoticeEdit";

import EgovGalleryList from "@/pages/inform/gallery/EgovGalleryList";
import EgovGalleryDetail from "@/pages/inform/gallery/EgovGalleryDetail";
import EgovGalleryEdit from "@/pages/inform/gallery/EgovGalleryEdit";

//ADMIN
import EgovAdminScheduleList from "@/pages/admin/schedule/EgovAdminScheduleList";
import EgovAdminScheduleDetail from "@/pages/admin/schedule/EgovAdminScheduleDetail";
import EgovAdminScheduleEdit from "@/pages/admin/schedule/EgovAdminScheduleEdit";

import EgovAdminBoardList from "@/pages/admin/board/EgovAdminBoardList";
import EgovAdminBoardEdit from "@/pages/admin/board/EgovAdminBoardEdit";

import EgovAdminUsageList from "@/pages/admin/usage/EgovAdminUsageList";
import EgovAdminUsageEdit from "@/pages/admin/usage/EgovAdminUsageEdit";

import EgovAdminNoticeList from "@/pages/admin/notice/EgovAdminNoticeList";
import EgovAdminNoticeDetail from "@/pages/admin/notice/EgovAdminNoticeDetail";
import EgovAdminNoticeEdit from "@/pages/admin/notice/EgovAdminNoticeEdit";

import EgovAdminGalleryList from "@/pages/admin/gallery/EgovAdminGalleryList";
import EgovAdminGalleryDetail from "@/pages/admin/gallery/EgovAdminGalleryDetail";
import EgovAdminGalleryEdit from "@/pages/admin/gallery/EgovAdminGalleryEdit";
//사이트관리자 암호 바꾸기 기능 추가 2023.04.15(토) 김일국 추가
import EgovAdminPasswordUpdate from "@/pages/admin/manager/EgovAdminPasswordUpdate";
//회원관리 기능 추가
import EgovAdminMemberList from "@/pages/admin/members/EgovAdminMemberList";
import EgovAdminMemberEdit from "@/pages/admin/members/EgovAdminMemberEdit";
//마이페이지 기능 추가
import EgovMypageEdit from "@/pages/mypage/EgovMypageEdit";
import initPage from "@/js/ui";

const RootRoutes = () => {
  //useLocation객체를 이용하여 정규표현식을 사용한 /admin/~ 으로 시작하는 경로와 비교에 사용(아래 1줄) */}
  const location = useLocation();

  // JWT 토큰 정보 가져오기 함수 추가
  // eslint-disable-next-line no-unused-vars
  const [userRole, setUserRole] = useState(""); // 사용자 권한 저장

  // JWT 토큰에서 사용자 권한 정보 확인
  const getUserRoleFromToken = useCallback(() => {
    console.group("getUserRoleFromToken");
    console.log("[Start] getUserRoleFromToken ------------------------------");

    // 세션에서 JWT 토큰 가져오기
    const token = sessionStorage.getItem("jToken");

    if (token) {
      try {
        // JWT 토큰 파싱 (간단한 방식으로 처리)
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const role = payload.groupNm || "";
          console.log("User role from token:", role);
          setUserRole(role);
          return role;
        }
      } catch (error) {
        console.error("JWT 토큰 파싱 중 오류:", error);
      }
    }

    console.log("JWT 토큰에서 권한 정보를 찾을 수 없음");
    setUserRole("");
    return "";
  }, []);

  // 경로에 따른 인증 처리를 위한 함수 추가
  const checkPathAccess = useCallback(() => {
    console.group("checkPathAccess");
    console.log("[Start] checkPathAccess ------------------------------");
    console.log("Current path:", location.pathname);

    // 현재 경로 가져오기
const currentPath = location.pathname;

// 관리자 페이지 정규식: base path 포함
const adminRegex = /^\/egovframe-template-simple-react\/admin(\/.*)?$/;

// 마이페이지 정규식: /create는 예외, base path 포함
const mypageRegex = /^\/egovframe-template-simple-react\/mypage(?!\/create)(\/.*)?$/;


    // JWT 토큰에서 사용자 로그인 정보 확인
    const token = sessionStorage.getItem("jToken");

    if (!token) {
      console.log("로그인 정보가 없습니다.");

      // 로그인이 필요한 경로인 경우 처리
      if (adminRegex.test(currentPath) || mypageRegex.test(currentPath)) {
        console.log("로그인이 필요한 경로입니다.");
        setMounted(false);
        alert("로그인이 필요한 경로입니다.");
        window.location.href = URL.LOGIN;
        return false;
      }

      // 로그인이 필요하지 않은 경로인 경우
      setMounted(true);
      return true;
    }

    // 사용자 권한 확인
    const role = getUserRoleFromToken();
    console.log("User role:", role);

    // 관리자 페이지 접근 처리
    if (adminRegex.test(currentPath)) {
      if (role !== "ROLE_ADMIN") {
        console.log("관리자 권한이 없어 접근이 불가합니다.");
        setMounted(false);
        alert("관리자 권한이 필요한 페이지입니다.");
        window.location.href = URL.MAIN;
        return false;
      } else {
        console.log("관리자 권한 확인 성공.");
        setMounted(true);
        return true;
      }
    }

    // 마이페이지 접근 처리 - 로그인한 유저라면 접근 가능
    if (mypageRegex.test(currentPath)) {
      if (!token) {
        console.log("로그인이 필요한 경로입니다.");
        setMounted(false);
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = URL.LOGIN;
        return false;
      } else {
        console.log("로그인 사용자 확인 성공.");
        setMounted(true);
        return true;
      }
    }

    // 기본적으로 모든 다른 경로는 접근 가능
    setMounted(true);
    console.log("------------------------------checkPathAccess [End]");
    console.groupEnd("checkPathAccess");
    return true;
  }, [getUserRoleFromToken, location.pathname]);

  //시스템관리 메뉴인 /admin/으로 시작하는 URL은 모두 로그인이 필요하도록 코드추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성
  const [mounted, setMounted] = useState(false); // 컴포넌트 최초 마운트 후 리렌더링 전 로그인 페이지로 이동하는 조건으로 사용

  useEffect(() => {
    if (!isMounted.current) {
      // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
      isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
      checkPathAccess(); // 경로에 따른 접근 권한 처리
    } else {
      // 라우트 변경 시 접근 권한 처리
      checkPathAccess();
    }
  }, [checkPathAccess]); // location 경로가 변경 될 때만 업데이트 후 리렌더링

  if (mounted) {
    // 인증 없이 시스템관리 URL로 접근할 때 렌더링 되는 것을 방지하는 조건추가.
    return (
      <Routes>
        <Route path={URL.ERROR} element={<EgovError />} />
        <Route path="*" element={<SecondRoutes />} />
      </Routes>
    );
  }
};

const SecondRoutes = () => {
  // eslint-disable-next-line no-unused-vars
  const [loginVO, setLoginVO] = useState({});

  //useRef객체를 사용하여 페이지 마운트 된 후 ui.js를 로딩 하도록 변경 코드 추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성

  useEffect(() => {
    if (!isMounted.current) {
      // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
      isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
    } else {
      initPage();
    }
  }, []);

  return (
    <>
      <EgovHeader />
      <Routes>
        {/* ROOT - Redirect to MAIN */}
        <Route path="/" element={<Navigate to={URL.MAIN} />} />
        
        {/* MAIN */}
        <Route path={URL.MAIN} element={<EgovMain />} />

        {/* LOGIN */}
        <Route
          path={URL.LOGIN}
          element={<EgovLogin onChangeLogin={(user) => setLoginVO(user)} />}
        />

        {/* Sns Naver Callback */}
        <Route
          path={URL.SNS_NAVER_CB}
          element={
            <SnsNaverCallback onChangeLogin={(user) => setLoginVO(user)} />
          }
        />
        {/* Sns Kakao Callback */}
        <Route
          path={URL.SNS_KAKAO_CB}
          element={
            <SnsKakaoCallback onChangeLogin={(user) => setLoginVO(user)} />
          }
        />

        {/* ERROR */}
        <Route path={URL.ERROR} element={<EgovError />} />

        {/* ABOUT */}
        <Route path={URL.ABOUT} element={<Navigate to={URL.ABOUT_SITE} replace />} />
        <Route path={URL.ABOUT_SITE} element={<EgovAboutSite />} />
        <Route path={URL.ABOUT_HISTORY} element={<EgovAboutHistory />} />
        <Route
          path={URL.ABOUT_ORGANIZATION}
          element={<EgovAboutOrganization />}
        />
        <Route path={URL.ABOUT_LOCATION} element={<EgovAboutLocation />} />

        {/* INTRO */}
        <Route path={URL.INTRO} element={<Navigate to={URL.INTRO_WORKS} replace />} />
        <Route path={URL.INTRO_WORKS} element={<EgovIntroWork />} />
        <Route path={URL.INTRO_SERVICE} element={<EgovIntroService />} />

        {/* SUPPORT */}
        <Route
          path={URL.SUPPORT}
          element={<Navigate to={URL.SUPPORT_DOWNLOAD} replace />}
        />

        <Route
          path={URL.SUPPORT_DOWNLOAD}
          element={<EgovSupportDownloadList />}
        />
        <Route
          path={URL.SUPPORT_DOWNLOAD_DETAIL}
          element={<EgovSupportDownloadDetail />}
        />
        <Route
          path={URL.SUPPORT_DOWNLOAD_CREATE}
          element={<EgovSupportDownloadCreate />}
        />

        <Route path={URL.SUPPORT_QNA} element={<EgovSupportQnaList />} />
        <Route
          path={URL.SUPPORT_QNA_DETAIL}
          element={<EgovSupportQnaDetail />}
        />

        <Route path={URL.SUPPORT_APPLY} element={<EgovSupportApply />} />

        {/* INFORM */}
        <Route path={URL.INFORM} element={<Navigate to={URL.INFORM_DAILY} replace />} />

        <Route path={URL.INFORM_DAILY} element={<EgovDailyList />} />
        <Route path={URL.INFORM_DAILY_DETAIL} element={<EgovDailyDetail />} />
        <Route path={URL.INFORM_WEEKLY} element={<EgovWeeklyList />} />
        <Route path={URL.INFORM_WEEKLY_DETAIL} element={<EgovDailyDetail />} />

        <Route path={URL.INFORM_NOTICE} element={<EgovNoticeList />} />
        <Route path={URL.INFORM_NOTICE_DETAIL} element={<EgovNoticeDetail />} />
        <Route
          path={URL.INFORM_NOTICE_CREATE}
          element={<EgovNoticeEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.INFORM_NOTICE_MODIFY}
          element={<EgovNoticeEdit mode={CODE.MODE_MODIFY} />}
        />
        <Route
          path={URL.INFORM_NOTICE_REPLY}
          element={<EgovNoticeEdit mode={CODE.MODE_REPLY} />}
        />

        <Route path={URL.INFORM_GALLERY} element={<EgovGalleryList />} />
        <Route
          path={URL.INFORM_GALLERY_DETAIL}
          element={<EgovGalleryDetail />}
        />
        <Route
          path={URL.INFORM_GALLERY_CREATE}
          element={<EgovGalleryEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.INFORM_GALLERY_MODIFY}
          element={<EgovGalleryEdit mode={CODE.MODE_MODIFY} />}
        />
        <Route
          path={URL.INFORM_GALLERY_REPLY}
          element={<EgovGalleryEdit mode={CODE.MODE_REPLY} />}
        />

        {/* ADMIN */}
        <Route
          path={URL.ADMIN}
          element={<Navigate to={URL.ADMIN_SCHEDULE} replace />}
        />
        <Route path={URL.ADMIN_SCHEDULE} element={<EgovAdminScheduleList />} />
        <Route
          path={URL.ADMIN_SCHEDULE_DETAIL}
          element={<EgovAdminScheduleDetail />}
        />
        <Route
          path={URL.ADMIN_SCHEDULE_CREATE}
          element={<EgovAdminScheduleEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_SCHEDULE_MODIFY}
          element={<EgovAdminScheduleEdit mode={CODE.MODE_MODIFY} />}
        />

        <Route path={URL.ADMIN_BOARD} element={<EgovAdminBoardList />} />
        <Route
          path={URL.ADMIN_BOARD_CREATE}
          element={<EgovAdminBoardEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_BOARD_MODIFY}
          element={<EgovAdminBoardEdit mode={CODE.MODE_MODIFY} />}
        />

        <Route path={URL.ADMIN_USAGE} element={<EgovAdminUsageList />} />
        <Route
          path={URL.ADMIN_USAGE_CREATE}
          element={<EgovAdminUsageEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_USAGE_MODIFY}
          element={<EgovAdminUsageEdit mode={CODE.MODE_MODIFY} />}
        />

        <Route path={URL.ADMIN_NOTICE} element={<EgovAdminNoticeList />} />
        <Route
          path={URL.ADMIN_NOTICE_DETAIL}
          element={<EgovAdminNoticeDetail />}
        />
        <Route
          path={URL.ADMIN_NOTICE_CREATE}
          element={<EgovAdminNoticeEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_NOTICE_MODIFY}
          element={<EgovAdminNoticeEdit mode={CODE.MODE_MODIFY} />}
        />
        <Route
          path={URL.ADMIN_NOTICE_REPLY}
          element={<EgovAdminNoticeEdit mode={CODE.MODE_REPLY} />}
        />

        <Route path={URL.ADMIN_GALLERY} element={<EgovAdminGalleryList />} />
        <Route
          path={URL.ADMIN_GALLERY_DETAIL}
          element={<EgovAdminGalleryDetail />}
        />
        <Route
          path={URL.ADMIN_GALLERY_CREATE}
          element={<EgovAdminGalleryEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_GALLERY_MODIFY}
          element={<EgovAdminGalleryEdit mode={CODE.MODE_MODIFY} />}
        />
        <Route
          path={URL.ADMIN_GALLERY_REPLY}
          element={<EgovAdminGalleryEdit mode={CODE.MODE_REPLY} />}
        />
        {/* 사이트관리자 암호 바꾸기 기능 */}
        <Route path={URL.ADMIN_MANAGER} element={<EgovAdminPasswordUpdate />} />
        <Route path={URL.ADMIN_MEMBERS} element={<EgovAdminMemberList />} />
        <Route
          path={URL.ADMIN_MEMBERS_CREATE}
          element={<EgovAdminMemberEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.ADMIN_MEMBERS_MODIFY}
          element={<EgovAdminMemberEdit mode={CODE.MODE_MODIFY} />}
        />
        {/* MYPAGE */}
        <Route
          path={URL.MYPAGE_CREATE}
          element={<EgovMypageEdit mode={CODE.MODE_CREATE} />}
        />
        <Route
          path={URL.MYPAGE_MODIFY}
          element={<EgovMypageEdit mode={CODE.MODE_MODIFY} />}
        />
        
        {/* 404 방지 - 알 수 없는 경로는 메인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to={URL.MAIN} replace />} />
      </Routes>

      <EgovFooter />
      <EgovInfoPopup />
    </>
  );
};

export default RootRoutes;