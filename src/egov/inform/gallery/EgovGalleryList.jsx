import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import qs from 'qs';
import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import { GALLERY_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'common/EgovPaging';

function EgovGalleryList(props) {
    console.log("------------------------------");
    console.log("EgovGalleryList [props] : ", props);

    let history = useHistory();
    console.log("EgovGalleryList [history] : ", history);

    const query = qs.parse(history.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소에서 '?'를 생략해주는 옵션
    });
    if (query["bbsId"] === undefined) query["bbsId"] = GALLERY_BBS_ID; // 갤러리 게시판 URL
    console.log("EgovNoticeList [query] : ", query);

    let [boardResult, setBoardResult] = useState({});
    let [paginationInfo, setPaginationInfo] = useState();
    let [listTag, setListTag] = useState();
    let [searchCondition, setSearchCondition] = useState({ searchWrd: '', searchCnd: '0' });

    const onClickSearch = () => {
        console.log("[func] onClickSearch");
        let _query;
        if (searchCondition.searchWrd.length > 0) {
            _query = { ...query, pageIndex: 1, searchCnd: searchCondition.searchCnd, searchWrd: searchCondition.searchWrd };
        } else {
            _query = { ...query, pageIndex: 1 };
        }
        searchList(_query);
    }

    const searchList = (_query) => {
        console.log("[func] searchList");

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
            function (resp) {
                console.log("[RESULT] /cop/bbs/selectBoardListAPI.do", resp);

                setBoardResult(resp);
                setPaginationInfo(resp.paginationInfo);

                let listTag = [];
                listTag.push(<p className="no_data">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

                let resultCnt = resp.resultCnt * 1;
                let currentPageNo = resp.paginationInfo.currentPageNo;
                let pageSize = resp.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.resultList.forEach(function (item, index) {
                    if (index === 0) listTag = []; // 목록 초기화
                    var listIdx = resultCnt + 1 - ((currentPageNo - 1) * pageSize + index + 1);

                    const queryString = qs.stringify({
                        nttId: item.nttId,
                        bbsId: item.bbsId,
                        pageIndex: currentPageNo
                    }, {
                        addQueryPrefix: true
                    });

                    listTag.push(
                        <Link to={URL.INFORM_GALLERY_DETAIL + queryString} key={listIdx} className="list_item" >
                            <div>{listIdx}</div>
                            {(item.replyLc * 1 ? true : false) &&
                                <><div className="al reply">
                                    {item.nttSj}
                                </div></>}
                            {(item.replyLc * 1 ? false : true) &&
                                <><div className="al">
                                    {item.nttSj}
                                </div></>}
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
        console.log("===>>> board length = ", listTag);

    }, [listTag, paginationInfo]);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">알림마당</Link></li>
                        <li>{boardResult.brdMstrVO && boardResult.brdMstrVO.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_GALLARY_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">{boardResult.brdMstrVO && boardResult.brdMstrVO.bbsNm}</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
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
                                            onChange={e => setSearchCondition({ ...searchCondition, searchWrd: e.target.value })} />/>
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                                <li>
                                    <a href={URL.INFORM_GALLERY_CREATE} className="btn btn_blue_h46 pd35">등록</a>
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
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging pagination={paginationInfo}></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovGalleryList;