import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';

function EgovAdminTemplateEdit(props) {
    console.group("EgovAdminTemplateEdit");
    console.log("[Start] EgovAdminTemplateEdit ------------------------------");
    console.log("EgovAdminTemplateEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminTemplateEdit [history] : ", history);

    const tmplatId = history.location.state?.tmplatId || "";

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [useAt, setUseAt] = useState("Y");
    const [templateDetail, setTemplateDetail] = useState({ nttSj: '', nttCn: '' });
    const [useAtRadioGroup, setUseAtRadioGroup] = useState([{value: "Y", label:"Y Label"}, {value: "N", label:"N Label"}])
    const [radioGroup, setRadioGroup] = useState({ Y: true, N: false, F: false })

    const intMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: ''
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: ''
                });
                break;
            case CODE.MODE_REPLY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "답글쓰기",
                    editURL: ''
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {

        if (modeInfo.mode === CODE.MODE_CREATE) {
            setTemplateDetail({});
            return;
        }

        const retrieveDetailURL = '/cop/com/selectTemplateInfAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tmplatId: tmplatId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setTemplateDetail(resp.result.templateInfVO);

                // // 초기 templateDetail 설정 => ( 답글 / 수정 ) 모드일때...
                // if (modeInfo.mode === CODE.MODE_REPLY) {// 답글모드이면 RE: 붙여줌 
                //     setTemplateDetail({ ...resp.result.boardVO, nttSj: "RE: " + resp.result.boardVO.nttSj, nttCn: "" , inqireCo: 0, atchFileId: ""});
                // }
                // if (modeInfo.mode === CODE.MODE_MODIFY) {
                //     setTemplateDetail(resp.result.boardVO);
                // }

                // // 초기 setBoardAttachFiles 설정 => (수정) 모드 일때...
                // if (modeInfo.mode === CODE.MODE_MODIFY) {
                //     setBoardAttachFiles(resp.result.resultFiles);
                // }
            }
        );
    }

    const handleUseAtRadio = (e) => {
        let radioChecks = {};
        radioChecks[e.target.value] = e.target.checked;
        setRadioGroup(radioChecks);
    }

    useEffect(() => {
        intMode();
        return () => {
        }
    }, []);
    
    useEffect(() => {
        // setUseAt(useAt)
        return () => {
        }
    }, [useAt]);

    console.log("------------------------------EgovAdminTemplateEdit [End]");
    console.groupEnd("EgovAdminTemplateEdit");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="">Home</a></li>
                        <li><a href="">사이트관리</a></li>
                        <li>게시판템플릿 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav />
                    {/* <!--// Navigation --> */}

                    <div className="contents TEMPLATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">템플릿 등록</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="tmplatNm">템플릿명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" title="템플릿명" id="tmplatNm" placeholder="" defaultValue={templateDetail.tmplatNm} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>템플릿 구분<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select " htmlFor="tmplatSeCode">
                                        <select id="tmplatSeCode" name="" title="템플릿 구분" defaultValue={templateDetail.tmplatSeCode}>
                                            <option value="">선택하세요</option>
                                            <option value="TMPT01">게시판템플릿</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="tmplatCours">템플릿 경로</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" title="템플릿 경로" id="tmplatCours" placeholder="" defaultValue={templateDetail.tmplatCours} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>사용여부<span className="req">필수</span></dt>
                                <dd>
                                    {/* <label className={`f_rdo ${"Y" === useAt && " on"}`}>
                                        <input
                                            type="radio"
                                            name="useAt"
                                            value="Y"
                                            title="Ylabel"
                                            checked={"Y" === useAt}
                                            onChange={ () => setUseAt("Y")}
                                        />
                                        <em>Ylabel</em>
                                    </label>
                                    <label className={`f_rdo ${"N" === useAt && " on"}`}>
                                        <input
                                            type="radio"
                                            name="useAt"
                                            value="N"
                                            title="Nlabel"
                                            checked={"N" === useAt}
                                            onChange={() => setUseAt("N")}
                                        />
                                        <em>Nlabel</em>
                                    </label> */}
                                    {/* <EgovRadioButton
                                        name="useAt"
                                        label="Y value"
                                        value="Y"
                                        checkedValue={useAt}
                                        setter={setUseAt}
                                    />
                                    <EgovRadioButton
                                        name="useAt"
                                        label="N value"
                                        value="N"
                                        checkedValue={useAt}
                                        setter={setUseAt} 
                                    /> */}
                                    <EgovRadioButtonGroup
                                        name="useAt"
                                        radioGroup={useAtRadioGroup}
                                        setValue={useAt}
                                        setter={setUseAt}/>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100">미리보기</a>
                                    <a href="" className="btn btn_skyblue_h46 w_100">저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href="" className="btn btn_blue_h46 w_100">목록</a>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminTemplateEdit;