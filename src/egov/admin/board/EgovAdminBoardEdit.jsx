import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';
import EgovSelect from 'egov/common/EgovSelect';

function EgovAdminBoardEdit(props) {
    console.group("EgovAdminBoardEdit");
    console.log("[Start] EgovAdminBoardEdit ------------------------------");
    console.log("EgovAdminBoardEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminBoardEdit [history] : ", history);

    const bbsId = history.location.state?.bbsId || "";
    const searchCondition = history.location.state?.searchCondition;

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [boardDetail, setBoardDetail] = useState({});
    // const [replyPosblAt, setReplyPosblAt] = useState("Y");
    const [replyPosblAtRadioGroup, setReplyPosblAtRadioGroup] = useState([{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }])
    // const [fileAtchPosblAt, setFileAtchPosblAt] = useState("Y");
    const [fileAtchPosblAtRadioGroup, setFileAtchPosblAtRadioGroup] = useState([{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }])
    // const [bbsTyCode, setBbsTyCode] = useState("");
    const [bbsTyCodeOptions, setBbsTyCodeOptions] = useState([{ value: "", label: "선택" }, { value: "BBST01", label: "일반게시판" }, { value: "BBST03", label: "공지게시판" }])
    // const [bbsAttrbCode, setBbsAttrbCode] = useState("");
    const [bbsAttrbCodeOptions, setBbsAttrbCodeOptions] = useState([{ value: "", label: "선택" }, { value: "BBSA02", label: "갤러리" }, { value: "BBSA03", label: "일반게시판" }])
    // const [posblAtchFileNumber, setPosblAtchFileNumber] = useState(0);
    const [posblAtchFileNumberOptions, setPosblAtchFileNumberOptions] = useState([{ value: "0", label: "선택하세요" }, { value: "1", label: "1개" }, { value: "2", label: "2개" }, { value: "3", label: "3개" }])

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/bbs/insertBBSMasterInfAPI.do'
                });
                break;

            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/bbs/UpdateBBSMasterInfAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 조회/등록이면 조회 안함
            setBoardDetail({ bbsId: "", nttCn: "" });
            return;
        }

        const retrieveDetailURL = '/cop/bbs/SelectBBSMasterInfAPI.do';

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {

                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardMasterVO);

                    // setReplyPosblAt(resp.result.boardMasterVO.replyPosblAt);
                    // setFileAtchPosblAt(resp.result.boardMasterVO.fileAtchPosblAt);
                    // setBbsTyCode(resp.result.boardMasterVO.bbsTyCode);
                    // setBbsAttrbCode(resp.result.boardMasterVO.bbsAttrbCode);
                    // setPosblAtchFileNumber(resp.result.boardMasterVO.posblAtchFileNumber);
                }

                // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    // setBoardAttachFiles(resp.result.resultFiles);
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
                    history.push({ pathname: URL.ADMIN_BOARD });

                } else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
        );
    }

    useEffect(() => {
        initMode();
        return () => {
        }
    }, []);

    console.log("------------------------------EgovAdminBoardEdit [End]");
    console.groupEnd("EgovAdminBoardEdit");

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

                    <div className="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">게시판 생성</h2>

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="bbsNm">게시판명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="bbsNm" title="" id="bbsNm" placeholder=""
                                        defaultValue={boardDetail.bbsNm} />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsIntrcn">게시판 소개</label><span className="req">필수</span></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" name="bbsIntrcn" id="bbsIntrcn" cols="30" rows="10" placeholder=""
                                        defaultValue={boardDetail.bbsIntrcn}></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 유형<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" for="schdulIpcrCode">
                                        <EgovSelect
                                            id="bbsTyCode"
                                            name="bbsTyCode"
                                            title="게시판유형선택"
                                            options={bbsTyCodeOptions}
                                            // setValue={bbsTyCode}
                                            // setter={setBbsTyCode}
                                            setValue={boardDetail.bbsTyCode}
                                            setter={(v) => setBoardDetail({...boardDetail, bbsTyCode : v})}
                                        />
                                        {/* <select id="bbsTyCode" name="bbsTyCode" title="게시판유형선택"
                                            defaultValue={boardDetail.bbsTyCode}>
                                            <option value="" >선택</option>
                                            <option value="BBST01">일반게시판</option>
                                            <option value="BBST03">공지게시판</option>
                                        </select> */}
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 속성<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" for="bbsAttrbCode">
                                        <EgovSelect
                                            id="bbsAttrbCode"
                                            name="bbsAttrbCode"
                                            title="게시판속성선택"
                                            options={bbsAttrbCodeOptions}
                                            // setValue={bbsAttrbCode}
                                            // setter={setBbsAttrbCode}
                                            setValue={boardDetail.bbsAttrbCode}
                                            setter={(v) => setBoardDetail({...boardDetail, bbsAttrbCode : v})}
                                        />
                                        {/* <select id="bbsAttrbCode" name="bbsAttrbCode" title="게시판속성선택"
                                            defaultValue={boardDetail.bbsAttrbCode}>
                                            <option value="" >선택</option>
                                            <option value="BBSA02">갤러리</option>
                                            <option value="BBSA03">일반게시판</option>
                                        </select> */}
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt>답장가능여부<span className="req">필수</span></dt>
                                <dd>
                                    {/* <span className="f_rdo on"><input type="radio" name="replyPosblAt" title="가능" checked="checked" /><em>가능</em></span>
                                    <span className="f_rdo"><input type="radio" name="replyPosblAt" title="불가능" /><em>불가능</em></span> */}
                                    <EgovRadioButtonGroup
                                        name="replyPosblAt"
                                        radioGroup={replyPosblAtRadioGroup}
                                        setValue={boardDetail.replyPosblAt}
                                        setter={(v) => setBoardDetail({...boardDetail, replyPosblAt : v})} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부가능여부<span className="req">필수</span></dt>
                                <dd>
                                    {/* <span className="f_rdo on"><input type="radio" name="replyPosblAt" title="가능" checked="checked" /><em>가능</em></span>
                                    <span className="f_rdo"><input type="radio" name="replyPosblAt" title="불가능" /><em>불가능</em></span> */}
                                    <EgovRadioButtonGroup
                                        name="fileAtchPosblAt"
                                        radioGroup={fileAtchPosblAtRadioGroup}
                                        setValue={boardDetail.fileAtchPosblAt}
                                        setter={(v) => setBoardDetail({...boardDetail, fileAtchPosblAt : v})} />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulDeptName">첨부파일가능파일 숫자</label><span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select " for="posblAtchFileNumber">
                                        <EgovSelect
                                            id="posblAtchFileNumber"
                                            name="posblAtchFileNumber"
                                            title="첨부가능파일 숫자선택"
                                            options={posblAtchFileNumberOptions}
                                            // setValue={posblAtchFileNumber}
                                            // setter={setPosblAtchFileNumber}
                                            setValue={boardDetail.posblAtchFileNumber}
                                            setter={(v) => setBoardDetail({...boardDetail, posblAtchFileNumber : v})}
                                        />
                                        {/* <select id="posblAtchFileNumber" name="posblAtchFileNumber" title="첨부가능파일 숫자선택"
                                            defaultValue={boardDetail.posblAtchFileNumber}>
                                            <option value="0">선택하세요</option>
                                            <option value="1">1개</option>
                                            <option value="2">2개</option>
                                            <option value="3">3개</option>
                                        </select> */}
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulNm">템플릿 정보</label><span className="req">필수</span></dt>
                                <dd>
                                    <span className="f_search2">
                                        <input type="text" name="" title="" id="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateBoard()}>저장</button>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.ADMIN_BOARD} className="btn btn_blue_h46 w_100">목록</Link>
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

export default EgovAdminBoardEdit;