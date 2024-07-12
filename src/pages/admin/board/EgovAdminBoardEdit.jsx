import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'components/EgovRadioButtonGroup';


function EgovAdminBoardEdit(props) {
    console.group("EgovAdminBoardEdit");
    console.log("[Start] EgovAdminBoardEdit ------------------------------");
    console.log("EgovAdminBoardEdit [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
	const checkRef = useRef([]);
	
    console.log("EgovAdminBoardEdit [location] : ", location);

    const replyPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const fileAtchPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const bbsTyCodeOptions = [{ value: "", label: "선택" }, { value: "BBST01", label: "일반게시판" }, { value: "BBST03", label: "공지게시판" }];
    const bbsAttrbCodeOptions = [{ value: "", label: "선택" }, { value: "BBSA02", label: "갤러리" }, { value: "BBSA03", label: "일반게시판" }];
    const posblAtchFileNumberOptions = [{ value: 0, label: "선택하세요" }, { value: 1, label: "1개" }, { value: 2, label: "2개" }, { value: 3, label: "3개" }];
    const bbsId = location.state?.bbsId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [boardDetail, setBoardDetail] = useState({});

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/bbsMaster'
                });
                break;

            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: `/bbsMaster/${bbsId}`
                });
                break;
			default:
                navigate({pathname: URL.ERROR}, {state: {msg : ""}});
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 조회/등록이면 조회 안함
            setBoardDetail({
                tmplatId: "TMPLAT_BOARD_DEFAULT",  //Template 고정
                replyPosblAt: "Y",                 //답장가능여부 초기값
                fileAtchPosblAt: "Y"                //파일첨부가능여부 초기값
            });
            return;
        }

        const retrieveDetailURL = `/bbsMaster/${bbsId}`;
        
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                // 수정모드일 경우 조회값 세팅
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.boardMasterVO);
                }
            }
        );
    }

	const formValidator = (formData) => {
        if (formData.get('bbsNm') === null || formData.get('bbsNm') === "") {
            alert("게시판명은 필수 값입니다.");
            return false;
        }
        if (formData.get('bbsIntrcn') === null || formData.get('bbsIntrcn') === "") {
            alert("게시판 소개는 필수 값입니다.");
            return false;
        }
        if (formData.get('bbsTyCode') === null || formData.get('bbsTyCode') === "") {
            alert("게시판 유형은 필수 값입니다.");
            return false;
        }
        if (formData.get('bbsAttrbCode') === null || formData.get('bbsAttrbCode') === "") {
            alert("게시판 속성은 필수 값입니다.");
            return false;
        }
        if (formData.get('posblAtchFileNumber') === null || formData.get('posblAtchFileNumber') === "") {
            alert("첨부파일 가능 숫자는 필수 값입니다.");
            return false;
        }
        return true;
    };

    const formObjValidator = (checkRef) => {
        if(checkRef.current[0].value === ""){
            alert("게시판명은 필수 값입니다.");
            return false;
        }
        if(checkRef.current[1].value === ""){
            alert("게시판 소개는 필수 값입니다.");
            return false;
        }
        if(checkRef.current[2].value === "0"){
            alert("첨부파일 가능 숫자는 필수 값입니다.");
            return false;
        }
        return true;
    };

    const updateBoard = () => {

        let modeStr = modeInfo.mode === CODE.MODE_CREATE ? "POST" : "PUT";

        let requestOptions ={};

        if (modeStr === "POST") {

            const formData = new FormData();

                for (let key in boardDetail) {
                    formData.append(key, boardDetail[key]);
                    //console.log("boardDetail [%s] ", key, boardDetail[key]);
                }

                if (formValidator(formData)) {

                    requestOptions = {
                        method: modeStr,
                        headers: {
                            
                        },
                        body: formData
                    }

                    EgovNet.requestFetch(modeInfo.editURL,
                        requestOptions,
                        (resp) => {
                            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                                navigate({ pathname: URL.ADMIN_BOARD });
                            } else {
                                navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                            }
                        }
                    );
                };

        } else {
            if (formObjValidator(checkRef)) {

                requestOptions = {
                    method: modeStr,
                    headers: {
                        'Content-type': 'application/json',
                        
                    },
                    body: JSON.stringify({...boardDetail})
                }

                EgovNet.requestFetch(modeInfo.editURL,
                    requestOptions,
                    (resp) => {
                        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                            navigate({ pathname: URL.ADMIN_BOARD });
                        } else {
                            navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                        }
                    }
                );
            }     
        }
    };

    const deleteBoardArticle = (bbsId) => {
        const deleteBoardURL = `/bbsMaster/${bbsId}`;
        
        const requestOptions = {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            }
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("게시글이 삭제되었습니다.")
                    navigate(URL.ADMIN_BOARD, { replace: true });
                } else {
                    alert("ERR : " + resp.resultMessage);
                }
            }
        );
    }

    const getSelectedLabel = (objArray, findLabel = "") => {
        let foundValueLabelObj = objArray.find(o => o['value'] === findLabel);
        return foundValueLabelObj['label'];
    }

    useEffect(() => {
        initMode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

                        {modeInfo.mode === CODE.MODE_CREATE &&
                            <h2 className="tit_2">게시판 생성</h2>
                        }

                        {modeInfo.mode === CODE.MODE_MODIFY &&
                            <h2 className="tit_2">게시판 수정</h2>
                        }

                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="bbsNm">게시판명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="bbsNm" title="" id="bbsNm" placeholder=""
                                        defaultValue={boardDetail.bbsNm}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsNm: e.target.value })}
										ref={el => (checkRef.current[0] = el)}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsIntrcn">게시판 소개</label><span className="req">필수</span></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" name="bbsIntrcn" id="bbsIntrcn" cols="30" rows="10" placeholder=""
                                        defaultValue={boardDetail.bbsIntrcn}
                                        onChange={e => setBoardDetail({ ...boardDetail, bbsIntrcn: e.target.value })}
										ref={el => (checkRef.current[1] = el)}
                                    ></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 유형<span className="req">필수</span></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_130" htmlFor="bbsTyCode">
                                            <select
                                                id="bbsTyCode"
                                                name="bbsTyCode"
                                                title="게시판유형선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsTyCode: e.target.value })}
                                                value={boardDetail.bbsTyCode}
                                            >
                                                {bbsTyCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <span>
                                            {boardDetail.bbsTyCode && getSelectedLabel(bbsTyCodeOptions, boardDetail.bbsTyCode)}
                                        </span>
                                    }

                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 속성<span className="req">필수</span></dt>
                                <dd>
                                    {/* 등록 일때 변경 가능 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <label className="f_select w_130" htmlFor="bbsAttrbCode">
                                            <select
                                                id="bbsAttrbCode"
                                                name="bbsAttrbCode"
                                                title="게시판속성선택"
                                                onChange={(e) => setBoardDetail({ ...boardDetail, bbsAttrbCode: e.target.value })}
                                                value={boardDetail.bbsAttrbCode}
                                            >
                                                {bbsAttrbCodeOptions.map((option, i) => {
                                                    return (
                                                        <option value={option.value} key={option.value}>
                                                            {option.label}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    }
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <span>
                                            {boardDetail.bbsAttrbCode && getSelectedLabel(bbsAttrbCodeOptions, boardDetail.bbsAttrbCode)}
                                        </span>
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt>답장가능여부<span className="req">필수</span></dt>
                                <dd>
                                    {/* 등록 일때 변경 가능 */}
                                    {modeInfo.mode === CODE.MODE_CREATE &&
                                        <EgovRadioButtonGroup
                                            name="replyPosblAt"
                                            radioGroup={replyPosblAtRadioGroup}
                                            setValue={boardDetail.replyPosblAt}
                                            setter={(v) => setBoardDetail({ ...boardDetail, replyPosblAt: v })} />
                                    }
                                    {/* 수정/조회 일때 변경 불가 */}
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <span>
                                            {boardDetail.replyPosblAt && getSelectedLabel(replyPosblAtRadioGroup, boardDetail.replyPosblAt)}
                                        </span>
                                    }
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부가능여부<span className="req">필수</span></dt>
                                <dd>
                                    <EgovRadioButtonGroup
                                        name="fileAtchPosblAt"
                                        radioGroup={fileAtchPosblAtRadioGroup}
                                        setValue={boardDetail.fileAtchPosblAt}
                                        setter={(v) => setBoardDetail({ ...boardDetail, fileAtchPosblAt: v })} />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="posblAtchFileNumber">첨부파일가능파일 숫자</label><span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select " htmlFor="posblAtchFileNumber">
                                        <select
                                            id="posblAtchFileNumber"
                                            name="posblAtchFileNumber"
                                            title="첨부가능파일 숫자선택"
                                            onChange={(e) => setBoardDetail({ ...boardDetail, posblAtchFileNumber: e.target.value })}
                                            value={boardDetail.posblAtchFileNumber}
											ref={el => (checkRef.current[2] = el)}
                                        >
                                            {posblAtchFileNumberOptions.map((option, i) => {
                                                return (
                                                    <option value={option.value} key={option.value}>
                                                        {option.label}
                                                    </option>
                                                )
                                            })}
                                        </select>

                                    </label>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateBoard()}>저장</button>
                                    {modeInfo.mode === CODE.MODE_MODIFY &&
                                        <button className="btn btn_skyblue_h46 w_100" onClick={() => {
                                            deleteBoardArticle(boardDetail.bbsId);
                                        }}>삭제</button>
                                    }
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