import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import qs from 'qs';

function EgovPaging(props) {
    console.groupCollapsed("EgovPaging");
    console.log("EgovPaging [props] : ", props);
    let history = useHistory();
    console.log("EgovPaging [history] ", history);

    // const query = qs.parse(props.location.search, {
    const query = qs.parse(history.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    console.log("EgovPaging [query] = ", query);

    let paginationTag = [];

    const getQueryString = (query, pageIndex) => {
        query["pageIndex"] = pageIndex;
        const queryString = qs.stringify(query, { addQueryPrefix: true });
        return queryString;
    }

    if (props.pagination === undefined) {
        console.log("EgovPaging > pagination NULL");
        paginationTag = "-";
    } else {
        console.log("EgovPaging > pagination = ", props.pagination);

        const currentPageNo = props.pagination.currentPageNo;
        const pageSize = props.pagination.pageSize;
        const totalRecordCount = props.pagination.totalRecordCount;
        const recordCountPerPage = props.pagination.recordCountPerPage;

        const totalPageCount = Math.ceil(totalRecordCount / recordCountPerPage);
        const currentFirstPage = Math.floor((currentPageNo - 1) / pageSize) * pageSize + 1;
        let currentLastPage = currentFirstPage + pageSize - 1;
        currentLastPage = (currentLastPage > totalPageCount) ? totalPageCount : currentLastPage;

        if (totalPageCount > pageSize) {
            // 첫 페이지 이동
            //const firstPageTag = <li key="fp"><a href={getQueryString(query,1)} onclick=""><img src="/images/board/icon_prevend.gif" alt="처음" /></a></li>;
            const firstPageTag = <li key="fp" className="btn"><a to={getQueryString(query, 1)} className="first">처음</a></li>;
            //<li className="btn"><Link to="" className="first">처음</Link></li>
            paginationTag.push(firstPageTag);

            // 이전 페이지 이동
            const prevPageIndex = (currentPageNo - 1 > 0) ? currentPageNo - 1 : 1;
            //const previousPageTag = <li key="pp"><a href={getQueryString(query,prevPageIndex)} onclick=""><img src="/images/board/icon_prev.gif" alt="이전" border="0" /></a></li>;
            const previousPageTag = <li key="pp" className="btn"><a href={getQueryString(query, prevPageIndex)} className="prev">이전</a></li>;
            //<li className="btn"><Link to="" className="prev">이전</Link></li>
            paginationTag.push(previousPageTag);
        }

        for (let i = currentFirstPage; i <= currentLastPage; i++) {
            if (i === currentPageNo) {
                // 현재 페이지
                // const currentPage = <li key={i}><strong>{i}</strong></li>;
                const currentPage = <li key={i}><a href="" className="cur" >{i}</a></li>;
                //<li><Link to="" className="cur">1</Link></li>
                paginationTag.push(currentPage);
            } else {
                // 다른 페이지
                //const otherPage = <li key={i}><a href={getQueryString(query,i)} onclick="fn_egov_select_noticeList(2);return false; ">{i}</a></li>;
                const otherPage = <li key={i}><a href="" onClick={e => {
                    e.preventDefault();
                    console.log("paging!!!!!!!!!!!!!!!!!!!!!!! : ",i);
                    props.moveToPage(i)}}>{i}</a></li>;
                //<li><Link to="">2</Link></li>
                paginationTag.push(otherPage);
            }
        }
        if (totalPageCount > pageSize) {
            // 다음 페이지 이동
            const nextPageIndex = (currentLastPage + 1 < totalPageCount) ? currentLastPage + 1 : totalPageCount;
            //const nextPageTag = <li key="np">&#160;<a href={getQueryString(query,nextPageIndex)} onclick=""><img src="/images/board/icon_next.gif" alt="다음" border="0" /></a></li>;
            const nextPageTag = <li key="np" className="btn"><Link to={getQueryString(query, nextPageIndex)} onClick="" className="next">다음</Link></li>;
            // <li className="btn"><Link to="" className="next">다음</Link></li>
            paginationTag.push(nextPageTag);
            // 마지막 페이지 이동
            const lastPageTag = <li key="lp" className="btn"><Link href={getQueryString(query, totalPageCount)} onClick="" className="last"></Link></li>;
            //<li className="btn"><Link to="" className="last">마지막</Link></li>
            paginationTag.push(lastPageTag);
        }
    }
    console.log("paginationTag", paginationTag);
    console.groupEnd("EgovPaging");

    return (
        <div className="paging">
            <ul>
                {paginationTag}
            </ul>
        </div>
    );
}


export default React.memo(EgovPaging);