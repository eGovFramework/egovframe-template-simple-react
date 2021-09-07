import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

class EgovPaging extends Component {
    //function EgovPaging(this.props) {
    constructor(props) {
        super(props);
        //this.logInOutHandler = this.logInOutHandler.bind(this);
        console.log("===>>> pagination = " + JSON.stringify(props));
    }
    render() {
        console.log("------------------------------");
        console.log(this.props);
        console.log("location = ", this.props.location);

        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
        });

        console.log("query = ", query);

        let paginationTag = [];
        //let queryString;

        if (this.props.pagination === undefined) {
            console.log("EgovPagination > pagination NULL");
            paginationTag = "-";
        } else {
            console.log("EgovPagination > pagination = " + JSON.stringify(this.props.pagination));

            const currentPageNo = this.props.pagination.currentPageNo;
            const pageSize = this.props.pagination.pageSize;
            const totalRecordCount = this.props.pagination.totalRecordCount;
            const recordCountPerPage = this.props.pagination.recordCountPerPage;

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
                console.log("===>>> count i = " + i)
                if (i === currentPageNo) {
                    // 현재 페이지
                    // const currentPage = <li key={i}><strong>{i}</strong></li>;
                    const currentPage = <li key={i}><a href="" className="cur">{i}</a></li>;
                    //<li><Link to="" className="cur">1</Link></li>
                    paginationTag.push(currentPage);
                } else {
                    // 다른 페이지
                    //const otherPage = <li key={i}><a href={getQueryString(query,i)} onclick="fn_egov_select_noticeList(2);return false; ">{i}</a></li>;
                    const otherPage = <li key={i}><a href={getQueryString(query, i)} onclick="fn_egov_select_noticeList(2);return false; ">{i}</a></li>;
                    //<li><Link to="">2</Link></li>
                    paginationTag.push(otherPage);
                }
            }
            if (totalPageCount > pageSize) {
                // 다음 페이지 이동
                const nextPageIndex = (currentLastPage + 1 < totalPageCount) ? currentLastPage + 1 : totalPageCount;
                //const nextPageTag = <li key="np">&#160;<a href={getQueryString(query,nextPageIndex)} onclick=""><img src="/images/board/icon_next.gif" alt="다음" border="0" /></a></li>;
                const nextPageTag = <li key="np" className="btn"><a href={getQueryString(query, nextPageIndex)} onclick="" className="next">다음</a></li>;
                // <li className="btn"><Link to="" className="next">다음</Link></li>
                paginationTag.push(nextPageTag);
                // 마지막 페이지 이동
                const lastPageTag = <li key="lp"><a href={getQueryString(query, totalPageCount)} onclick=""><img src="/images/board/icon_nextend.gif" alt="마지막" border="0" /></a></li>;
                //<li className="btn"><Link to="" className="last">마지막</Link></li>
                paginationTag.push(lastPageTag);
            }
        }
        console.log(paginationTag);
        return (
            <div className="paging">
                <ul>
                    {/* <li className="btn"><Link to="" className="first">처음</Link></li>
                <li className="btn"><Link to="" className="prev">이전</Link></li>
                <li><Link to="" className="cur">1</Link></li>
                <li><Link to="">2</Link></li>
                <li><Link to="">3</Link></li>
                <li><Link to="">4</Link></li>
                <li><Link to="">5</Link></li>
                <li className="btn"><Link to="" className="next">다음</Link></li>
                <li className="btn"><Link to="" className="last">마지막</Link></li> */}
                    {paginationTag}
                </ul>
            </div>
        );
    }
}

const getQueryString = (query, pageIndex) => {
    query["pageIndex"] = pageIndex;
    const queryString = qs.stringify(query, { addQueryPrefix: true });
    console.log("pageIndex = %i , queryString = ", pageIndex, queryString);

    return queryString;
}
export default EgovPaging;