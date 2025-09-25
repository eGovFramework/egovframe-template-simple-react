import { Link } from "react-router-dom";

function BoardList({ title, items = [], detailUrl, moreUrl, className }) {
  return (
    <div className={className}>
      <h2 className="blind">{title}</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.nttId}>
              <Link
                to={{ pathname: detailUrl }}
                state={{
                  nttId: item.nttId,
                  bbsId: item.bbsId,
                }}
              >
                {item.nttSj}
                <span>{item.frstRegisterPnttm}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>검색된 결과가 없습니다.</li>
        )}
      </ul>
      <Link to={moreUrl} className="more">
        더보기
      </Link>
    </div>
  );
}

export default BoardList;
