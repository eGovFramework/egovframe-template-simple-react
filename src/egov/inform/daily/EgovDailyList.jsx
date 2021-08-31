import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import URL from 'context/url';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'common/EgovPaging';

import * as EgovNet  from 'context/egovFetch';
import { DEFAULT_BBS_ID } from 'context/config';
import qs from 'qs';

function EgovDailyList(props) {
    console.log("EgovDailyList create");

    const [boardResult, setBoardResult] = useState({});
    const [paginationInfo, setPaginationInfo] = useState();
    const [listTag, setListTag] = useState();
    const [searchCondition, setSearchCondition] = useState({ searchWrd: '', searchCnd: '0' });

    console.log('===>>> init EgovBoardListContent');
    console.log("------------------------------");
    console.log(props);
    console.log("location = ", props.location);

    const query = qs.parse(props.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소에서 '?'를 생략해주는 옵션
    });

    console.log("query = ", query);

    if (query["bbsId"] === undefined) query["bbsId"] = DEFAULT_BBS_ID; // default = 공지사항

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
                //console.log("===>>> board = " + JSON.stringify(json));
                //setResultList(json.resultList);
                //console.log("*===>>> board = " + JSON.stringify(resultList));
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
                    listTag.push(<Link key={listIdx} onClick={
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
            }
        );
    }


    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">알림마당</Link></li>
                        <li>오늘의 행사</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents TODAY_SCHEDULE" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">오늘의 행사</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li>
                                    <label className="f_select" for="sel1">
                                        <select name="" id="sel1" title="조건">
                                            <option value="">전체</option>
                                            <option value="1">회의</option>
                                            <option value="2">세미나</option>
                                            <option value="3">강의</option>
                                            <option value="4">교육</option>
                                            <option value="5">기타</option>
                                        </select>
                                    </label>
                                </li>
                                <li>
                                    <Link to="" className="prev">이전연도로이동</Link>
                                    <span>2021년</span>
                                    <Link to="" className="next">다음연도로이동</Link>
                                </li>
                                <li className="half L">
                                    <Link to="" className="prev">이전월로이동</Link>
                                    <span>8월</span>
                                    <Link to="" className="next">다음월로이동</Link>
                                </li>
                                <li className="half R">
                                    <Link to="" className="prev">이전일로이동</Link>
                                    <span>11일</span>
                                    <Link to="" className="next">다음일로이동</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD001">
                            <div className="head">
                                <span>시간</span>
                                <span>제목</span>
                                <span>담당자</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p className="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to="" className="list_item">
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 오늘의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 오늘의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 오늘의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 오늘의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 오늘의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </Link>
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


export default EgovDailyList;