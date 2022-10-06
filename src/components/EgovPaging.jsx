import React from 'react';

function EgovPaging(props) {
    console.groupCollapsed("EgovPaging");
    console.log("EgovPaging [props] : ", props);

    let paginationTag = [];

    if (props.pagination === undefined) {
        paginationTag = "-";
    } else {
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
            const firstPageTag = <li key="fp" className="btn">
                <button onClick={e => {props.moveToPage(1)}} className="first">처음</button></li>;
            paginationTag.push(firstPageTag);

            // 이전 페이지 이동
            const prevPageIndex = (currentPageNo - 1 > 0) ? currentPageNo - 1 : 1;
            const previousPageTag = <li key="pp" className="btn">
                <button onClick={e => {props.moveToPage(prevPageIndex)}} className="prev">이전</button></li>;
            paginationTag.push(previousPageTag);
        }

        for (let i = currentFirstPage; i <= currentLastPage; i++) {
            if (i === currentPageNo) {
                // 현재 페이지
                const currentPage = <li key={i}>
                    <button className="cur">{i}</button>
                </li>;
                paginationTag.push(currentPage);
            } else {
                // 다른 페이지
                const otherPage = <li key={i}>
                    <button onClick={e => {props.moveToPage(i)}}>{i}</button>
                </li>;
                paginationTag.push(otherPage);
            }
        }
        if (totalPageCount > pageSize) {
            // 다음 페이지 이동
            const nextPageIndex = (currentLastPage + 1 < totalPageCount) ? currentLastPage + 1 : totalPageCount;
            const nextPageTag = <li key="np" className="btn">
                <button onClick={e => {props.moveToPage(nextPageIndex)}} className="next">다음</button>
            </li>;
            paginationTag.push(nextPageTag);
            
            // 마지막 페이지 이동
            const lastPageTag = <li key="lp" className="btn">
                <button onClick={e => {props.moveToPage(totalPageCount)}} className="last"></button></li>;
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