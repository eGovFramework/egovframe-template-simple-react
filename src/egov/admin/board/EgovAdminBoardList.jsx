import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminBoardList(props) {
    console.group("EgovAdminBoardList");
    console.log("[Start] EgovAdminBoardList ------------------------------");
    console.log("EgovAdminBoardList [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminBoardList [history] : ", history);

    let searchCnd = '0';
    let searchWrd = '';
    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [user, setUser] = useState({});
    const [paginationInfo, setPaginationInfo] = useState({});

    const [listTag, setListTag] = useState([]);

    const retrieveList = (srchCnd) => {
        console.groupCollapsed("EgovAdminBoardList.retrieveList()");

        const retrieveListURL = '/cop/bbs/selectBBSMasterInfsAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(srchCnd)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setPaginationInfo(resp.result.paginationInfo);
                setUser(resp.result.user);

                let mutListTag = [];
                listTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.result.resultCnt * 1;
                let currentPageNo = resp.result.paginationInfo.currentPageNo;
                let pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    let listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                    mutListTag.push(
                        <Link
                            to={{
                                pathname: URL.ADMIN_BOARD_MODIFY,
                                state: {
                                    bbsId: item.bbsId,
                                    searchCondition: searchCondition
                                }
                            }}
                            key={listIdx}
                            className="list_item">
                            <div>{listIdx}</div>
                            <div>{item.bbsNm}</div>
                            <div>{item.bbsTyCodeNm}</div>
                            <div>{item.bbsAttrbCodeNm}</div>
                            <div>{item.frstRegisterPnttm}</div>
                            <div>{item.useAt === "Y" ? "사용" : "사용안함"}</div>
                        </Link>
                    );
                });
                setListTag(mutListTag);
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovAdminBoardList.retrieveList()");
    }

    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, []);

    console.log("------------------------------EgovAdminBoardList [End]");
    console.groupEnd("EgovAdminBoardList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>게시판생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_CREATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">게시판생성 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <span className="lb">검색유형선택</span>
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선력"
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchCnd: e.target.value })}
                                        >
                                            <option value="0">게시판명</option>
                                            <option value="1">게시판유형</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="lb">검색어</span>
                                    <span className="f_search w_400">
                                        <input type="text" name="" defaultValue={searchCondition && searchCondition.searchWrd} placeholder=""
                                            onChange={(e) => setSearchCondition({ ...searchCondition, searchWrd: e.target.value })}
                                        />
                                        <button type="button"
                                            onClick={() => retrieveList(searchCondition)}>조회</button>
                                    </span>
                                </li>
                                <li>
                                    <Link to={URL.ADMIN_BOARD_CREATE} className="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD006">
                            <div className="head">
                                <span>번호</span>
                                <span>게시판명</span>
                                <span>게시판유형</span>
                                <span>게시판속성</span>
                                <span>생성일</span>
                                <span>사용여부</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo} moveToPage={passedPage => {
                                setSearchCondition({ ...searchCondition, pageIndex: passedPage });
                            }}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>








    );
}

export default EgovAdminBoardList;