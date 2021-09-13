import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import qs from 'qs';
import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import { DEFAULT_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'common/EgovAttachFile';

function EgovNoticeCreate(props) {
    console.log("------------------------------");
    console.log("EgovNoticeCreate [props] : ", props);

    let history = useHistory();
    console.log("EgovNoticeCreate [history] : ", history);

    const query = qs.parse(history.location.search, {
        ignoreQueryPrefix: true 
    });
    if (query["bbsId"] === undefined) query["bbsId"] = DEFAULT_BBS_ID; // default = 공지사항
    console.log("EgovNoticeCreate [query] : ", query);

    let [boardResult, setBoardResult] = useState({});
    let [boardResultFiles, setBoardResultFiles] = useState();
    let [boardDetail, setBoardDetail] = useState({ nttSj: '', nttCn: '' });
    let [boardInfo, setBoardInfo] = useState({});

    const onClickUpdate = () => {
        console.log("[func] onClickUpdate", query);
        console.log("boardDetail", boardDetail);
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            console.log("====>>> boardDetail = ", key, boardDetail[key]);
        }
        formData.set("ntcrNm", "dummy");
        formData.set("password", "dummy");
        formData.set("ntceBgnde", "10000101");
        formData.set("ntceEndde", "99991231");

        console.log("==== Required Field");
        console.log("nttCn = " + boardDetail.nttSj);
        console.log("nttCn = " + boardDetail.nttCn);
        console.log("ntceBgnde = " + boardDetail.ntceBgnde);
        console.log("ntceEndde = " + boardDetail.ntceEndde);
        console.log("ntcrNm = " + boardDetail.ntcrNm);
        console.log("password = " + boardDetail.password);

        const requestOptions = {
            method: "POST",
            headers: {
                //'Content-type': 'multipart/form-data'
            },
            body: formData
        }
        console.log("====>>> boardInfo = ", boardInfo);
        EgovNet.requestFetch(boardInfo.processUrl,
            requestOptions,
            function (resp) {
                console.log("====>>> board update= " , resp);
                if (resp !== undefined)
                    if (resp.resultCode === 0)
                        window.location.href = URL.INFORM_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    else
                        alert("ERR : " + resp.resultMessage);

            }
        );
    }

    //componentDidMount (1회만)
    useEffect(function () {
        console.log('*====>>> useEffect (componentDidMount)'); // bbsId: 'BBSMSTR_AAAAAAAAAAAA'
        console.log("====>>> props.mode = ", props.mode);
        switch (props.mode) {
            case 'edit':
                setBoardInfo({
                    ...boardInfo,
                    modeTitle: "게시글 수정",
                    processUrl: '/cop/bbs/updateBoardArticleAPI.do'
                });
                break;
            case 'new':
                setBoardInfo({
                    ...boardInfo,
                    modeTitle: "게시글 쓰기",
                    processUrl: '/cop/bbs/insertBoardArticleAPI.do'
                });
                break;
            case 'reply':
                setBoardInfo({
                    ...boardInfo,
                    modeTitle: "답글쓰기",
                    processUrl: '/cop/bbs/replyBoardArticleAPI.do'
                });
                break;
        }
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
                console.log("===>>response : " , resp );
                setBoardResult(resp);
                if (resp.resultFiles !== undefined)
                    setBoardResultFiles(resp.resultFiles);
                if (resp.result !== undefined && resp.result !== null) {
                    if (props.mode === "reply") {
                        setBoardDetail({ ...resp.result, nttSj: "RE: " + resp.result.nttSj, nttCn: "" });
                    } else {
                        setBoardDetail(resp.result);
                    }
                } else {
                    //신규 글 등록시
                    setBoardDetail({ bbsId: query["bbsId"], nttSj:"", nttCn:"" });
                }
            }
        );

        return function () {
            console.log('====>>> useEffect return (componentWillUnmount)');
        }
    }, []);

    useEffect(function () {
        console.log('boardInfo Changed.....');
    }, [boardInfo]);

    console.groupEnd("EgovNoticeCreate");

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

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">공지사항 {boardInfo.modeTitle}</h2>
                        {/* <h2 className="tit_2">{boardInfo.bbsNm} {boardInfo.modeTitle}</h2> */}

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">제목<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text"
                                        value={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">내용<span className="req">필수</span></label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_200" id="nttCn" name="nttCn" cols="30" rows="10" placeholder=""
                                        value={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
                                </dd>
                            </dl>
                            {/* <dl>
                                <dt>파일첨부</dt>
                                <dd>
                                    <input type="file" /> */}
                            <EgovAttachFile
                                fnChangeFile={(_file) => {
                                    console.log("====>>> file = ", _file);
                                    setBoardDetail({ ...boardDetail, file_1: _file });
                                }}
                                fnDeleteFile={function (_resultFiles) {
                                    console.log("====>>> resultFiles = ", _resultFiles);
                                    setBoardResultFiles(_resultFiles);
                                }}
                                boardFiles={boardResultFiles}
                                mode={props.mode} />
                            {/* </dd>
                            </dl> */}

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickUpdate();
                                    }}>저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href={URL.INFORM_NOTICE} className="btn btn_blue_h46 w_100">목록</a>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EgovNoticeCreate;