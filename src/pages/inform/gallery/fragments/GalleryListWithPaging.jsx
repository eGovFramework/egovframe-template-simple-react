import GalleryList from "./GalleryList";
import EgovPaging from "@/components/EgovPaging";

const GalleryListWithPaging = ({
  items,
  paginationInfo,
  searchCondition,
  onMoveToPage,
  cndRef,
  wrdRef,
}) => {
  return (
    <>
      <div className="board_list BRD002">
        <div className="head">
          <span>번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>작성일</span>
          <span>조회수</span>
        </div>

        <GalleryList
          itemList={items.resultList}
          itemCnt={items.resultCnt}
          currentPageNo={paginationInfo.currentPageNo}
          pageSize={paginationInfo.pageSize}
          searchCondition={searchCondition}
        />
      </div>
      <div className="board_bot">
        <EgovPaging
          pagination={paginationInfo}
          moveToPage={(passedPage) => {
            onMoveToPage({
              ...searchCondition,
              pageIndex: passedPage,
              searchCnd: cndRef?.current?.value,
              searchWrd: wrdRef?.current?.value,
            });
          }}
        />
      </div>
    </>
  );
};

export default GalleryListWithPaging;
