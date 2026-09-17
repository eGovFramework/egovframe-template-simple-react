/**
 * 목록 항목의 역순 표시번호를 계산한다. (최신 글이 큰 번호)
 *
 * 세 번째 인자는 반드시 paginationInfo.recordCountPerPage(한 페이지에 게시되는 게시물 건수) 여야 한다.
 * paginationInfo.pageSize 는 페이저에 노출할 페이지 번호의 개수로 의미가 다르며,
 * 이를 넘기면 Globals.pageUnit 과 Globals.pageSize 를 다르게 설정한 게시판에서
 * 2페이지부터 번호가 어긋난다. (두 값이 같은 기본 설정에서는 증상이 드러나지 않는다.)
 */
export const itemIdxByPage = (resultCnt, currentPageNo, recordCountPerPage, index) => resultCnt + 1 - ((currentPageNo - 1) * recordCountPerPage + index + 1);
