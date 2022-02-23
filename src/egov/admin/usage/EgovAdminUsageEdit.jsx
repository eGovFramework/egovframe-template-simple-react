import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';
import EgovSelect from 'egov/common/EgovSelect';

function EgovAdminUsageEdit(props) {
    console.group("EgovAdminUsageEdit");
    console.log("[Start] EgovAdminUsageEdit ------------------------------");
    console.log("EgovAdminUsageEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminUsageEdit [history] : ", history);

    const bbsId = history.location.state?.bbsId || "";
    const trgetId = history.location.state?.trgetId || "SYSTEM_DEFAULT_BOARD";
    const searchCondition = history.location.state?.searchCondition;

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [boardDetail, setBoardDetail] = useState({});
    const [notUsedBdMstrList, setNotUsedBdMstrList] = useState([]);

    const [useAtRadioGroup, setUseAtRadioGroup] = useState([{ value: "Y", label: "사용" }, { value: "N", label: "미사용" }])

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/com/insertBBSUseInfAPI.do'
                });
                break;

            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/com/updateBBSUseInfAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 등록모드일 경우 사용중이지 않은 MasterBoard만 조회
            
            setBoardDetail({
                useAt: "Y",                         //사용여부 초기값
                trgetId: "SYSTEM_DEFAULT_BOARD"     //시스템 targetId default값
            });

            //새로 생성된 MstrBoard 리스트 조회
            const retrieveMasterBdURL = '/cop/com/selectNotUsedBdMstrList.do';

            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                })
            }
            EgovNet.requestFetch(retrieveMasterBdURL,
                requestOptions,
                function (resp) {
                    setNotUsedBdMstrList(resp.result.resultList);
                }
            );

            return;
        }

        const retrieveDetailURL = '/cop/com/selectBBSUseInfAPI.do';

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                trgetId: trgetId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                // 수정모드일 경우 조회값 세팅
                if (modeInfo.mode === CODE.MODE_MODIFY) {
                    setBoardDetail(resp.result.bdUseVO);
                    setNotUsedBdMstrList(resp.result.resultList);
                }
            }
        );
    }

    const updateBoard = () => {
        const formData = new FormData();
        for (let key in boardDetail) {
            formData.append(key, boardDetail[key]);
            console.log("boardDetail [%s] ", key, boardDetail[key]);
        }

        if (formValidator(formData)) {
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
                        history.push({ pathname: URL.ADMIN_USAGE });
                    } else {
                        alert("ERR : " + resp.resultMessage);
                    }
                }
            );
        }
    }

    const formValidator = (formData) => {
        if (formData.get('bbsId') === null || formData.get('bbsId') === "") {
            alert("게시판명은 필수 값입니다.");
            return false;
        }
        if (modeInfo.mode === CODE.MODE_CREATE) {
            if (formData.get('trgetType') === null || formData.get('trgetType') === "") {
                alert("커뮤니티/동호회명은 필수 값입니다.");
                return false;
            }
        }
        return true;
    }
    useEffect(() => {
        initMode();
        return () => {
        }
    }, []);

    console.log("------------------------------EgovAdminUsageEdit [End]");
    console.groupEnd("EgovAdminUsageEdit");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="">Home</a></li>
                        <li><a href="">사이트관리</a></li>
                        <li>게시판사용관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_USE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">게시판사용 관리</h2>

                        <div className="board_view2">
                            {/* 등록일때 일때 */}
                            {modeInfo.mode === CODE.MODE_CREATE && <>
                                <dl>
                                    <dt>게시판명<span className="req">필수</span></dt>
                                    <dd>
                                        <label className="f_select " htmlFor="bbsId">
                                            <select
                                                id="bbsId"
                                                name="bbsId"
                                                title="게시판선택"
                                                onChange={(e) => {
                                                    let index = e.nativeEvent.target.selectedIndex;
                                                    let label = e.nativeEvent.target[index].text;
                                                    console.log("bbsId onChange : ", e.nativeEvent);
                                                    setBoardDetail({ ...boardDetail, bbsId: e.target.value, bbsNm: label });
                                                }}
                                                value={boardDetail.bbsId}
                                            >
                                                <option value="">선택하세요</option>
                                                {notUsedBdMstrList.map((option, i) => {
                                                    console.log("notUsedBdMstrList option : ", option);
                                                    return (
                                                        <option value={option.bbsId} key={option.bbsId}>
                                                            {option.bbsNm}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </label>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>커뮤니티/동호회명<span className="req">필수</span></dt>
                                    <dd>
                                        <label className="f_select " htmlFor="trgetType">
                                            <select id="trgetType" name="trgetType" className="select" title=""
                                                onChange={(e) => setBoardDetail({ ...boardDetail, trgetType: e.target.value, trgetId: "SYSTEM_DEFAULT_BOARD" })}>
                                                <option value="">선택하세요</option>
                                                <option value="SYSTEM">시스템 활용</option>
                                            </select>
                                        </label>
                                    </dd>
                                </dl>
                            </>}

                            {/* 수정/조회 일때 */}
                            {modeInfo.mode === CODE.MODE_MODIFY && <>
                                <dl>
                                    <dt><label htmlFor="">게시판명</label></dt>
                                    <dd>
                                        {boardDetail && boardDetail.bbsNm}
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="">커뮤니티/동호회명</label></dt>
                                    <dd>
                                        {boardDetail && boardDetail.cmmntyNm}
                                    </dd>
                                </dl>
                                <dl>
                                    <dt><label htmlFor="">사용여부</label><span className="req">필수</span></dt>
                                    <dd>
                                        <EgovRadioButtonGroup
                                            name="useAt"
                                            radioGroup={useAtRadioGroup}
                                            setValue={boardDetail.useAt}
                                            setter={(v) => setBoardDetail({ ...boardDetail, useAt: v })} />
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>제공 URL</dt>
                                    <dd>
                                        <Link
                                            to={{
                                                pathname: URL.INFORM_NOTICE,
                                                state: {
                                                    bbsId: boardDetail.bbsId,
                                                }
                                            }}
                                        >
                                            {`${URL.INFORM_NOTICE}`}
                                        </Link>

                                    </dd>
                                </dl>
                            </>}

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                </div>

                                <div className="right_col btn1">
                                    <button className="btn btn_blue_h46 w_100"
                                        onClick={() => updateBoard()} > 저장</button>
                                    <Link to={URL.ADMIN_USAGE} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div >

    );
}

export default EgovAdminUsageEdit;