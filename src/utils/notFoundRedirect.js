import CODE from "@/constants/code";
import URL from "@/constants/url";

  /**
   * 상세 조회 응답을 공통 처리한다.
   * 리소스 없는 경우 (resultCode 404 거나 200인데 대상 데이터가 없는 경우)는 안내 후 목록으로 복귀
   * 그 외의 200이 아닌 경우는 공통 에러 페이지
   *
   * @param resp            requestFetch 응답
   * @param navigate        useNavigate()
   * @param listURL         돌아갈 목록 경로
   * @param searchCondition 목록 복원용 검색조건(있으면 함께 전달)
   * @param message         없음 안내 문구
   * @param resultKey       대상 존재 판별 키(예: "boardVO", "scheduleDetail"). 생략 시 result 자체로 판별
   */

export function redirectIfNotFound (resp, { navigate, listURL, searchCondition, message, resultKey }) {
    const code = Number(resp.resultCode);
    const hasData = resultKey ? resp.result?.[resultKey] : resp.result;
    
    if(code === Number(CODE.RCV_ERROR_NOT_FOUND) || (code === Number(CODE.RCV_SUCCESS) && !hasData)) {
        alert(message);
        navigate(listURL, { replace: true, state: { searchCondition } });
        return true;
    }
    if(code !== Number(CODE.RCV_SUCCESS)) {
        navigate({ pathname: URL.ERROR }, { state: { msg: resp.resultMessage } });
        return true;
    }
    return false;
}
  