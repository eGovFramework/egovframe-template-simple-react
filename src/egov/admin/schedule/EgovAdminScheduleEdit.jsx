import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'egov/common/EgovAttachFile';
import EgovRadioButtonGroup from 'egov/common/EgovRadioButtonGroup';

import 'react-datepicker/dist/react-datepicker.css';

function EgovAdminScheduleEdit(props) {
    console.group("EgovAdminScheduleEdit");
    console.log("[Start] EgovAdminScheduleEdit ------------------------------");
    console.log("EgovAdminScheduleEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminScheduleEdit [history] : ", history);

    const reptitSeCodeRadioGroup = [{ value: "1", label: "당일" }, { value: "2", label: "반복" }, { value: "3", label: "연속" }];

    const [modeInfo, setModeInfo] = useState({ mode: props.mode });
    const [scheduleDetail, setScheduleDetail] = useState({ schdulDeptName: "관리자부서", schdulChargerName: "관리자", schdulKindCode: 2, reptitSeCode: "1", startDate: new Date(), endDate: new Date() });
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [user, setUser] = useState({});

    const [schdulBgndeHH, setSchdulBgndeHH] = useState();
    const [schdulBgndeMM, setSchdulBgndeMM] = useState();
    const [schdulEnddeHH, setSchdulEnddeHH] = useState();
    const [schdulEnddeMM, setSchdulEnddeMM] = useState();


    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/smt/sim/egovIndvdlSchdulManageRegistActorAPI.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/smt/sim/egovIndvdlSchdulManageModifyActorAPI.do'
                });
                break;
        }
        retrieveDetail();
    }

    const convertDate = (str) => {
        let year = str.substring(0, 4);
        let month = str.substring(4, 6);
        let date = str.substring(6, 8);
        let hour = str.substring(8, 10);
        let minute = str.substring(10, 12);
        return new Date(year, month - 1, date, hour, minute)
    }

    const retrieveDetail = () => {
        if (modeInfo.mode === CODE.MODE_CREATE) {// 조회/등록이면 조회 안함
            setScheduleDetail({
                ...scheduleDetail,
                schdulBgnde: getDateFourteenDigit(scheduleDetail.startDate),
                schdulEndde: getDateFourteenDigit(scheduleDetail.endDate)
            });
            return;
        }

        const retrieveDetailURL = '/cop/smt/sim/egovIndvdlSchdulManageDetailAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                schdulId: history.location.state?.schdulId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                let rawScheduleDetail = resp.result.scheduleDetail;
                //기본값 설정
                setScheduleDetail({
                    ...scheduleDetail,
                    ...rawScheduleDetail,
                    startDate: convertDate(rawScheduleDetail.schdulBgnde),
                    endDate: convertDate(rawScheduleDetail.schdulEndde),
                });
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const updateSchedule = () => {
        const formData = new FormData();
        for (let key in scheduleDetail) {
            formData.append(key, scheduleDetail[key]);
            console.log("scheduleDetail [%s] ", key, scheduleDetail[key]);
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
                        history.push({ pathname: URL.ADMIN_SCHEDULE });
                    } else {
                        alert("ERR : " + resp.resultMessage);
                    }
                }
            );
        }

    }

    const formValidator = (formData) => {
        if (formData.get('schdulSe') === null || formData.get('schdulSe') === "") {
            alert("일정구분은 필수 값입니다.");
            return false;
        }
        if (formData.get('schdulIpcrCode') === null || formData.get('schdulIpcrCode') === "") {
            alert("중요도은 필수 값입니다.");
            return false;
        }
        if (formData.get('reptitSeCode') === null ||formData.get('reptitSeCode') === "") {
            alert("반복구분은 필수 값입니다.");
            return false;
        }
        if (formData.get('schdulBgnde') > formData.get('schdulEndde')) {
            alert("종료일시는 시작일시보다 앞 설 수 없습니다.");
            return false;
        }
        return true;
    }
    const getDateFourteenDigit = (date) => {
        return getYYYYMMDD(date).toString() + makeTwoDigit(date.getHours()) + makeTwoDigit(date.getMinutes()) + makeTwoDigit(date.getSeconds());
    }
    const getYYYYMMDD = (date) => {
        return date.getFullYear().toString() + makeTwoDigit(Number(date.getMonth() + 1)) + makeTwoDigit(date.getDate());
    }
    const makeTwoDigit = (number) => {
        return number < 10 ? "0" + number : number.toString();
    }

    useEffect(function () {
        initMode();
        return function () {
        }
    }, []);

    console.log("------------------------------EgovAdminScheduleEdit [End]");
    console.groupEnd("EgovAdminScheduleEdit");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>일정관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_SCHDULE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">일정관리 상세보기</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view2">
                            <dl>
                                <dt>일정구분<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" htmlFor="schdulSe">
                                        <select id="schdulSe" name="schdulSe" title="일정구분"
                                            value={scheduleDetail.schdulSe}
                                            onChange={(e) => setScheduleDetail({ ...scheduleDetail, schdulSe: e.target.value })}>
                                            <option value="">선택</option>
                                            <option value="1">회의</option>
                                            <option value="2">세미나</option>
                                            <option value="3">강의</option>
                                            <option value="4">교육</option>
                                            <option value="5">기타</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt>중요도<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" htmlFor="schdulIpcrCode">
                                        <select id="schdulIpcrCode" name="schdulIpcrCode" title="중요도"
                                            value={scheduleDetail.schdulIpcrCode}
                                            onChange={(e) => setScheduleDetail({ ...scheduleDetail, schdulIpcrCode: e.target.value })}>
                                            <option value="">선택</option>
                                            <option value="A">높음</option>
                                            <option value="B">보통</option>
                                            <option value="C">낮음</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="schdulDeptName">부서</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="schdulDeptName" title="부서" id="schdulDeptName"
                                        value="관리자부서" readOnly
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="schdulNm">일정명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="schdulNm" title="부서" id="schdulNm" placeholder="일정 테스트"
                                        defaultValue={scheduleDetail.schdulNm}
                                        onChange={(e) => setScheduleDetail({ ...scheduleDetail, schdulNm: e.target.value })} />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="schdulCn">일정내용</label><span className="req">필수</span></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" name="schdulCn" id="schdulCn" cols="30" rows="10" placeholder="일정내용"
                                        defaultValue={scheduleDetail.schdulCn}
                                        onChange={(e) => setScheduleDetail({ ...scheduleDetail, schdulCn: e.target.value })}
                                    ></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>반복구분<span className="req">필수</span></dt>
                                <dd>
                                    <EgovRadioButtonGroup
                                        name="reptitSeCode"
                                        radioGroup={reptitSeCodeRadioGroup}
                                        setValue={scheduleDetail.reptitSeCode}
                                        setter={(v) => setScheduleDetail({ ...scheduleDetail, reptitSeCode: v })} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜/시간<span className="req">필수</span></dt>
                                <dd className="datetime">
                                    <span className="line_break">
                                        <DatePicker
                                            selected={scheduleDetail.startDate}
                                            name="schdulBgnde"
                                            className="f_input"
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            showTimeInput
                                            onChange={(date) => {
                                                console.log("setStartDate : ", date);
                                                setScheduleDetail({ ...scheduleDetail, schdulBgnde: getDateFourteenDigit(date), schdulBgndeYYYMMDD: getYYYYMMDD(date), schdulBgndeHH: date.getHours(), schdulBgndeMM: date.getMinutes(), startDate: date });
                                                setSchdulBgndeHH(date.getHours());
                                                setSchdulBgndeMM(date.getMinutes());
                                            }} />
                                        <input type="hidden" name="schdulBgndeHH" defaultValue={schdulBgndeHH} readOnly />
                                        <input type="hidden" name="schdulBgndeMM" defaultValue={schdulBgndeMM} readOnly />
                                        <span className="f_inn_txt">~</span>
                                    </span>
                                    <span className="line_break">
                                        <DatePicker
                                            selected={scheduleDetail.endDate}
                                            name="schdulEndde"
                                            className="f_input"
                                            dateFormat="yyyy-MM-dd HH:mm"
                                            showTimeInput
                                            minDate={scheduleDetail.startDate}
                                            onChange={(date) => {
                                                console.log("setEndDate: ", date);
                                                setScheduleDetail({ ...scheduleDetail, schdulEndde: getDateFourteenDigit(date), schdulEnddeYYYMMDD: getYYYYMMDD(date), schdulEnddeHH: date.getHours(), schdulEnddeMM: date.getMinutes(), endDate: date });
                                                setSchdulEnddeHH(date.getHours());
                                                setSchdulEnddeMM(date.getMinutes());
                                            }
                                            } />
                                        <input type="hidden" name="schdulEnddeHH" defaultValue={schdulEnddeHH} readOnly />
                                        <input type="hidden" name="schdulEnddeMM" defaultValue={schdulEnddeMM} readOnly />
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="schdulChargerName">담당자</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="schdulChargerName" id="schdulChargerName" defaultValue="관리자" readOnly
                                    />
                                </dd>
                            </dl>
                            <EgovAttachFile
                                fnChangeFile={(attachfile) => {
                                    console.log("====>>> Changed attachfile file = ", attachfile);
                                    setScheduleDetail({ ...scheduleDetail, file_1: attachfile });
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
                                        onClick={() => updateSchedule()}
                                    > 저장</button>
                                    <a href="" className="btn btn_skyblue_h46 w_100">삭제</a>
                                </div>

                                <div className="right_col btn1">
                                    <Link to={URL.ADMIN_SCHEDULE} className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EgovAdminScheduleEdit;