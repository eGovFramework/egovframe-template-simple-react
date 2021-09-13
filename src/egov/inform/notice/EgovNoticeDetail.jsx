import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import qs from 'qs';
import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import { DEFAULT_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'common/EgovAttachFile';

function EgovNoticeDetail(props) {
    console.log("------------------------------");
    console.log("EgovNoticeDetail [props] : ", props);

    let history = useHistory();
    console.log("EgovNoticeDetail [history] : ", history);

    const query = qs.parse(history.location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소에서 '?'를 생략해주는 옵션
    });
    if (query["bbsId"] === undefined) query["bbsId"] = DEFAULT_BBS_ID; // default = 공지사항
    console.log("EgovNoticeDetail [query] : ", query);

    let [boardResult, setBoardResult] = useState();
    let [boardResultFiles, setBoardResultFiles] = useState();
    let [boardDetail, setBoardDetail] = useState({});
    
    //componentDidMount (1회만)
    useEffect(function () {
        console.log('*===>>> useEffect (componentDidMount)'); // bbsId: 'BBSMSTR_AAAAAAAAAAAA'
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(query)
        }
        EgovNet.requestFetch('/cop/bbs/selectBoardArticleAPI.do',
            requestOptions,
            function (resp) {
                //console.log("===>>> board = " + JSON.stringify(resp));
                //console.log("*===>>> board = " + JSON.stringify(resultList));
                setBoardResult(resp);
                setBoardDetail(resp.result);
                if (resp.resultFiles !== undefined)
                    setBoardResultFiles(resp.resultFiles);
                // setDate("2021-05-11");
                // console.log("===>>> date = " + _date);
                // console.log("===>>> myStr = " + myStr);
                console.log("===>>> resp.sessionUniqId = " + resp.sessionUniqId);
                console.log("===>>> resp.result = ", resp.result);
                console.log("===>>> resp.brdMstrVO = ", resp.brdMstrVO);
                console.log("===>>> resp.resultFiles = ", resp.resultFiles);

            }
        );

        return function () {
            console.log('===>>> useEffect return (componentWillUnmount)');
        }
    }, []);

    useEffect(function () {
        console.log('===>>> useEffect (boardResult)');
        console.log("===>>> boardResult = ", boardResult);

    }, [boardDetail]);

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">알림마당</Link></li>
                        <li>공지사항</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">공지사항</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>{boardDetail.frstRegisterNm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>{boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>조회수</dt>
                                        <dd>{boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="board_article">
                                <textarea name="" cols="30" rows="10" readOnly="readonly" value={boardDetail.nttCn}></textarea>
                            </div>
                            <div className="board_attach">
                                <EgovAttachFile boardFiles={boardResultFiles} />
                            </div>
                            

                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                    <Link to={URL.INFORM_NOTICE_MODIFY + qs.stringify(query, { addQueryPrefix: true })} className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <Link to="" className="btn btn_skyblue_h46 w_100">삭제</Link>
                                    <Link to={URL.INFORM_NOTICE_REPLY + qs.stringify(query, { addQueryPrefix: true })} className="btn btn_skyblue_h46 w_100">답글작성</Link>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.INFORM_NOTICE + qs.stringify(query, { addQueryPrefix: true })} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovNoticeDetail;