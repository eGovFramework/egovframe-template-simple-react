import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import URL from 'context/url';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'common/EgovPaging';

import * as EgovNet from 'context/egovFetch';
import { DEFAULT_BBS_ID } from 'context/config';
import qs from 'qs';

function EgovNoticeList(props) {
    console.log("EgovNoticeList create");
    const [boardResult, setBoardResult] = useState({});
    const [paginationInfo, setPaginationInfo] = useState();
    const [listTag, setListTag] = useState();
    const [searchCondition, setSearchCondition] = useState({ searchWrd: '', searchCnd: '0' });

    console.log('===>>> init EgovNoticeList');
    console.log("------------------------------");
    console.log(props);
    console.log("location = ", props.location);

    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소에서 '?'를 생략해주는 옵션
    });

    console.log("query = ", query);

    if (query["bbsId"] === undefined) query["bbsId"] = DEFAULT_BBS_ID; // default = 공지사항

    console.log("query['bbsId'] ", query["bbsId"]);

    const onClickSearch = () => {
        console.log("===>>> onClick Search List");
        let _query;
        if (searchCondition.searchWrd.length > 0) {
            _query = { ...query, pageIndex: 1, searchCnd: searchCondition.searchCnd, searchWrd: searchCondition.searchWrd };
        } else {
            _query = { ...query, pageIndex: 1 };
        }
        searchList(_query);
    }

    const searchList = (_query) => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(_query)
        }
        EgovNet.requestFetch('/cop/bbs/selectBoardListAPI.do',
            requestOptions,
            function (json) {
                console.log("===>>> board = " + JSON.stringify(json));
                //setResultList(json.resultList);
                console.log("*===>>> board = " + JSON.stringify(json.resultList));
                setBoardResult(json);

                console.log("===>>> json.resultList length = " + json.resultList.length);
                console.log("===>>> json.paginationInfo = " + JSON.stringify(json.paginationInfo));
                setPaginationInfo(json.paginationInfo);

                let listTag = [];
                listTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = json.resultCnt * 1;
                let currentPageNo = json.paginationInfo.currentPageNo;
                let pageSize = json.paginationInfo.pageSize;

                json.resultList.forEach(function (item, index) {
                    console.log('boardItem = %s', JSON.stringify(item));
                    //${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}
                    if (index === 0) listTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);
                    console.log("currentPageNo = %i , pageSize = %i , listIdx = %i", currentPageNo, pageSize, listIdx);
                    console.log("===> replyLc = ", item.replyLc);
                    // listTag.push(<tr key={listIdx} onClick={
                    //     () => {
                    //         const queryString = qs.stringify({
                    //             nttId: item.nttId,
                    //             bbsId: DEFAULT_BBS_ID,
                    //             pageIndex: currentPageNo
                    //         },
                    //         { addQueryPrefix: true });
                    //         console.log(queryString);
                    //         //window.location.href="/board_detail"+queryString;
                    //         window.location.href=URL.INFORM_NOTICE_DETAIL+queryString;
                    //     }
                    // }>
                    //     <td><b>{listIdx}</b></td>
                    //     <td align="left">
                    //         {(item.replyLc*1 ? true:false) && <img src="/images/board/reply_arrow.gif" alt="reply arrow" />}
                    //         {item.nttSj}
                    //     </td>
                    //     <td >{item.frstRegisterNm}</td>
                    //     <td >{item.frstRegisterPnttm}</td>
                    //     <td >{item.inqireCo}</td>
                    // </tr>
                    // );
                    listTag.push(<Link key={listIdx} className="list_item" onClick={
                        () => {
                            const queryString = qs.stringify({
                                nttId: item.nttId,
                                bbsId: DEFAULT_BBS_ID,
                                pageIndex: currentPageNo
                            },
                                { addQueryPrefix: true });
                            console.log(queryString);
                            //window.location.href="/board_detail"+queryString;
                            window.location.href = URL.INFORM_NOTICE_DETAIL + queryString;
                        }
                    }>
                        <div>{listIdx}</div>
                        <div className="al">
                            {(item.replyLc * 1 ? true : false) && <img src="/assets/images/reply_arrow.gif" alt="reply arrow" />}
                            {item.nttSj}
                        </div>
                        <div>{item.frstRegisterNm}</div>
                        <div>{item.frstRegisterPnttm}</div>
                        <div>{item.inqireCo}</div>
                    </Link>
                    );
                });
                setListTag(listTag);
            },
            function (response) {
                console.log("err response : ", response);
            }
        );
    }

    //componentDidMount (1회만)
    useEffect(function () {
        console.log('*===>>> useEffect (componentDidMount)'); // bbsId: 'BBSMSTR_AAAAAAAAAAAA'

        searchList(query);
        return function () {
            console.log('===>>> useEffect return (componentWillUnmount)');
        }
    }, []); // 빈 배열로 전달

    useEffect(function () {
        console.log('===>>> useEffect (listTag)');
        console.log("===>>> board length = " + listTag);

    }, [listTag, paginationInfo]);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">알림마당</Link></li>
                        {/* <li>공지사항</li> */}
                        <li>{boardResult.brdMstrVO && boardResult.brdMstrVO.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        {/* <h2 className="tit_2">공지사항</h2> */}
                        <h2 className="tit_2">{boardResult.brdMstrVO && boardResult.brdMstrVO.bbsNm}</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlhtmlFor="sel1">
                                        <select name="" id="sel1" title="조건"
                                            onChange={e => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}>
                                            <option value="0">제목</option>
                                            <option value="1">내용</option>
                                            <option value="2">작성자</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="f_search w_500">
                                        <input type="text" name="" value={searchCondition.searchWrd} placeholder=""
                                            onChange={e => setSearchCondition({ ...searchCondition, searchWrd: e.target.value })} />
                                        <button type="button"
                                            onClick={() => {
                                                onClickSearch();
                                            }}>조회</button>
                                    </span>
                                </li>
                                <li>
                                    <a href={ URL.INFORM_NOTICE_CREATE + qs.stringify(query, { addQueryPrefix: true })} className="btn btn_blue_h46 pd35">등록</a>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
                            </div>
                            <div className="result">
                                {listTag}
                                {/* <!-- case : 데이터 없을때 --> */}
                                {/* <p className="no_data">검색된 결과가 없습니다.</p> */}

                                {/* <!-- case : 데이터 있을때 --> */}
                                {/* <Link to={`${URL.INFORM_NOTICE_DETAIL}/3`} className="list_item">
                                    <div>3</div>
                                    <div className="al">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>
                                <Link to={`${URL.INFORM_NOTICE_DETAIL}/2`} className="list_item">
                                    <div>2</div>
                                    <div className="al"><img src="/assets/images/reply_arrow.gif" alt="reply arrow" />전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>
                                <Link to={`${URL.INFORM_NOTICE_DETAIL}/1`} className="list_item">
                                    <div>1</div>
                                    <div className="al">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>*/} 
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging location={props.location} pagination={paginationInfo}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovNoticeList;