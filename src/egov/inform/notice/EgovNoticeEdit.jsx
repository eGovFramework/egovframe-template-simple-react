import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';
import { NOTICE_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'egov/common/EgovAttachFile';

function EgovNoticeEdit(props) {
    console.group("EgovNoticeEdit");
    console.log("------------------------------");
    console.log("EgovNoticeEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovNoticeEdit [history] : ", history);

    const bbsId = history.location.state?.bbsId || NOTICE_BBS_ID;
    const nttId = history.location.state?.nttId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({ nttSj: '', nttCn: '' });
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/bbs/insertBoardArticleAPI.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/bbs/updateBoardArticleAPI.do'
                });
                break;
            case CODE.MODE_REPLY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "답글쓰기",
                    editURL: '/cop/bbs/replyBoardArticleAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록이면 조회 안함
            setBoardDetail({ bbsId: bbsId, nttSj: "", nttCn: "" });
            return;
        }

        const retrieveDetailURL = '/cop/bbs/selectBoardArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                
                // 초기 boardDetail 설정 => ( 답글 / 수정 ) 모드일때...
                if (modeInfo.mode === CODE.MODE_REPLY) {// 답글모드이면 RE: 붙여줌 
                    setBoardDetail({ ...resp.result.boardVO, nttSj: "RE: " + resp.result.boardVO.nttSj, nttCn: "" , inqireCo: 0, atchFileId: ""});
                }
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardVO);
                }
                
                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardAttachFiles(resp.result.resultFiles);
                }
            }
        );
    }

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            //console.log("boardDetail [%s] ", key, boardDetail[key]);
        }
        
        const requestOptions = {
            method: "POST",
            headers: {

            },
            body: formData
        }

        EgovNet.requestFetch(modeInfo.editURL,
            requestOptions,
            (resp) => {
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    history.push({ pathname: URL.INFORM_NOTICE });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

    useEffect(function () {
        initMode();
        return function () {
        }
    }, []);

    useEffect(function () {
        console.log("boardDetail, boardAttachFiles: useEffect");
        return function () {
        }
    }, [boardDetail,boardAttachFiles]);

    console.groupEnd("EgovNoticeEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>알림마당</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
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

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm} {modeInfo.modeTitle}</h2>

                        <div className="board_view2">
                            <dl>
                                <dt>
                                    <label htmlFor="nttSj">제목<span className="req">필수</span></label>
                                </dt>
                                <dd>
                                    <input className="f_input2 w_full" id="nttSj" name="nttSj" type="text"
                                        defaultValue={boardDetail.nttSj}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttSj: e.target.value })}
                                        maxLength="60" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="nttCn">내용<span className="req">필수</span></label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_200" id="nttCn" name="nttCn" cols="30" rows="10" placeholder=""
                                        defaultValue={boardDetail.nttCn}
                                        onChange={e => setBoardDetail({ ...boardDetail, nttCn: e.target.value })}></textarea>
                                </dd>
                            </dl>
                            <EgovAttachFile
                                fnChangeFile={(attachfile) => {
                                    console.log("====>>> Changed attachfile file = ", attachfile);
                                    setBoardDetail({ ...boardDetail, file_1: attachfile });
                                }}
                                fnDeleteFile={(deletedFile) => {
                                    console.log("====>>> Delete deletedFile = ", deletedFile);
                                    setBoardAttachFiles(deletedFile);
                                }}
                                boardFiles={boardAttachFiles}
                                mode={props.mode} />

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateBoard()}>저장</button>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.INFORM_NOTICE} className="btn btn_blue_h46 w_100">목록</Link>
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

export default EgovNoticeEdit;