import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 리스트 페이지의 네비게이션 관리를 위한 커스텀 훅
 * 페이지네이션, 검색, URL 쿼리 파라미터 관리를 담당
 */
export function useListNavigation(defaultBbsId) {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 쿼리 파라미터에서 검색 조건 추출
  const getSearchConditionFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      bbsId: defaultBbsId,
      pageIndex: parseInt(searchParams.get('page')) || 1,
      searchCnd: searchParams.get('searchCnd') || "0",
      searchWrd: searchParams.get('searchWrd') || "",
    };
  };

  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || getSearchConditionFromURL()
  );

  // URL 쿼리 파라미터 업데이트
  const updateURL = (newSearchCondition) => {
    const searchParams = new URLSearchParams();
    if (newSearchCondition.pageIndex > 1) searchParams.set('page', newSearchCondition.pageIndex);
    if (newSearchCondition.searchCnd !== "0") searchParams.set('searchCnd', newSearchCondition.searchCnd);
    if (newSearchCondition.searchWrd) searchParams.set('searchWrd', newSearchCondition.searchWrd);

    const newURL = `${location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    navigate(newURL, { replace: true });
  };

  // 페이지 이동 핸들러
  const handlePageMove = (pageIndex, cndRef, wrdRef, retrieveList) => {
    const newSearchCondition = {
      ...searchCondition,
      pageIndex,
      searchCnd: cndRef.current.value,
      searchWrd: wrdRef.current.value,
    };

    updateURL(newSearchCondition);
    retrieveList(newSearchCondition);
    setSearchCondition(newSearchCondition);
  };

  // 검색 핸들러
  const handleSearch = (cndRef, wrdRef, retrieveList) => {
    const newSearchCondition = {
      ...searchCondition,
      pageIndex: 1,
      searchCnd: cndRef.current.value,
      searchWrd: wrdRef.current.value,
    };

    updateURL(newSearchCondition);
    retrieveList(newSearchCondition);
    setSearchCondition(newSearchCondition);
  };

  // 상세 페이지에서 목록으로 돌아갈 때의 URL 생성
  const getBackToListURL = (baseURL, searchCondition) => {
    const searchParams = new URLSearchParams();
    if (searchCondition?.pageIndex > 1) searchParams.set('page', searchCondition.pageIndex);
    if (searchCondition?.searchCnd !== "0") searchParams.set('searchCnd', searchCondition.searchCnd);
    if (searchCondition?.searchWrd) searchParams.set('searchWrd', searchCondition.searchWrd);

    return `${baseURL}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  };

  return {
    searchCondition,
    setSearchCondition,
    handlePageMove,
    handleSearch,
    getBackToListURL
  };
}

export default useListNavigation;