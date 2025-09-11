import { Link } from "react-router-dom";
import URL from "@/constants/url";

const GalleryUnit = ({ item, listIdx, searchCondition }) => {
  return (
    <Link
      to={{ pathname: URL.INFORM_GALLERY_DETAIL }}
      state={{
        nttId: item.nttId,
        bbsId: item.bbsId,
        searchCondition: searchCondition,
      }}
      key={listIdx}
      className="list_item"
    >
      <div>{listIdx}</div>
      {(item?.replyLc * 1 ? true : false) && (
        <>
          <div className="al reply">{item?.nttSj}</div>
        </>
      )}
      {(item?.replyLc * 1 ? false : true) && (
        <>
          <div className="al">{item?.nttSj}</div>
        </>
      )}
      <div>{item?.frstRegisterNm}</div>
      <div>{item?.frstRegisterPnttm}</div>
      <div>{item?.inqireCo}</div>
    </Link>
  );
};

export default GalleryUnit;
