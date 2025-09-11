import GalleryUnit from "./GalleryUnit";
import { itemIdxByPage } from "@/utils/calc";

const GalleryList = ({
  itemList,
  itemCnt,
  currentPageNo,
  pageSize,
  searchCondition,
}) => {
  const items = itemList;

  return (
    <div className="result">
      {items?.length === 0 ? (
        <p className="no_data" key="0">
          검색된 결과가 없습니다.
        </p>
      ) : (
        items?.map((item, index) => {
          const listIdx = itemIdxByPage(
            itemCnt,
            currentPageNo,
            pageSize,
            index
          );

          return (
            <GalleryUnit
              key={listIdx}
              item={item}
              listIdx={listIdx}
              searchCondition={searchCondition}
            />
          );
        })
      )}
    </div>
  );
};

export default GalleryList;
