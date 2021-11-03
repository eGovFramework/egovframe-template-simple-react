import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'egov/common/EgovPaging';
import EgovAttachFile from 'egov/common/EgovAttachFile';

function EgovWeeklyList(props) {
    console.group("EgovWeeklyList");
    console.log("[Start] EgovWeeklyList ------------------------------");
    console.log("EgovWeeklyList [props] : ", props);

    const history = useHistory();
    console.log("EgovWeeklyList [history] : ", history);

    const DATE = new Date();
    const FIRST_DAY_OF_THIS_WEEK = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate() - DATE.getDay());

    const getWeekOfMonth = (date) => {
        let adjustedDate = date.getDate() + date.getDay();
        console.log("getWeekOfMonth : ", date, date.getDate(), date.getDay(), adjustedDate, adjustedDate / 7, 0 | adjustedDate / 7);
        let weeksOrder = [0, 1, 2, 3, 4, 5];
        let returnVal = parseInt(weeksOrder[0 | adjustedDate / 7]);
        console.log("returnVal:", returnVal);
        return (returnVal);
    }

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { schdulSe: '', year: FIRST_DAY_OF_THIS_WEEK.getFullYear(), month: FIRST_DAY_OF_THIS_WEEK.getMonth(), date: FIRST_DAY_OF_THIS_WEEK.getDate(), weekDay: FIRST_DAY_OF_THIS_WEEK.getDay(), weekOfMonth: getWeekOfMonth(FIRST_DAY_OF_THIS_WEEK) });

    const [scheduleList, setScheduleList] = useState([]);
    const [listTag, setListTag] = useState([]);

    const changeDate = (target, amount) => {
        let changedDate;

        if (target === CODE.DATE_YEAR) {
            changedDate = new Date(searchCondition.year + amount, searchCondition.month, searchCondition.date);
        }

        if (target === CODE.DATE_MONTH) {
            changedDate = new Date(searchCondition.year, searchCondition.month + amount, searchCondition.date);
        }

        if (target === CODE.DATE_WEEK) {
            // let addtionOfDays = 7 * amount - searchCondition.weekDay;
            let addtionOfDays = 7 * amount;
            changedDate = new Date(searchCondition.year, searchCondition.month, searchCondition.date + addtionOfDays);//다음주의 첫날
        }
        console.log("changedDate : ", changedDate);
        setSearchCondition({ ...searchCondition, year: changedDate.getFullYear(), month: changedDate.getMonth(), date: changedDate.getDate(), weekDay: changedDate.getDay(), weekOfMonth: getWeekOfMonth(changedDate) });
    }


    const retrieveList = (srchcnd) => {
        console.groupCollapsed("EgovWeeklyList.retrieveList()");

        const retrieveListURL = '/cop/smt/sim/egovIndvdlSchdulManageWeekListAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(srchcnd)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                setScheduleList(resp.result.resultList);
                drawList();
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );

        console.groupEnd("EgovWeeklyList.retrieveList()");
    }

    const drawList = () => {
        const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        let mutListTag = [];

        let keyPropertyCnt = 0;
        // 리스트 항목 구성
        for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
            let scheduleDate = new Date(searchCondition.year, searchCondition.month, searchCondition.date + dayIdx);
            let scheduleDateStr = scheduleDate.getFullYear() + "년 " + (scheduleDate.getMonth() + 1) + "월 " + scheduleDate.getDate() + "일 " + dayNames[scheduleDate.getDay()];
            keyPropertyCnt++;
            mutListTag.push(
                <div class="list_item" key={keyPropertyCnt}>
                    <div>{scheduleDateStr}</div>
                    <div>
                        {scheduleList.length === 0 && <span>일정이 존재하지 않습니다.</span>}
                        {scheduleList.length !== 0 && scheduleList.map((item) => {
                            keyPropertyCnt++;
                            return (
                                <Link
                                    key={keyPropertyCnt}
                                    to={{
                                        pathname: URL.INFORM_WEEKLY_DETAIL,
                                        state: {
                                            schdulId: item.schdulId,
                                            prevPath: URL.INFORM_WEEKLY
                                        }
                                    }} >
                                    <span>{getTimeForm(item.schdulBgnde)} ~ {getTimeForm(item.schdulEndde)}</span>
                                    <span>{item.schdulNm}</span>
                                    <span>{item.userNm}</span>
                                </Link>
                            )
                        })}


                    </div>
                </div>
            )
        }
        setListTag(mutListTag);

    }
    const getTimeForm = (str) => {
        let hour = str.substring(8, 10);
        let starminute = str.substring(10, 12);
        return hour + ":" + starminute;
    }

    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, [searchCondition.schdulSe, searchCondition.year, searchCondition.month, searchCondition.weekOfMonth]);

    useEffect(() => {
        drawList();
        return () => {
        }
    },[scheduleList]);

    console.log("------------------------------EgovWeeklyList [End]");
    console.groupEnd("EgovWeeklyList");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>알림마당</Link></li>
                        <li>오늘의 행사</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents WEEK_SCHEDULE" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">금주의 행사</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li>
                                    <label className="f_select" htmlFor="sel1">
                                        <select name="" id="sel1" title="조건">
                                            <option value="">전체</option>
                                            <option value="1">회의</option>
                                            <option value="2">세미나</option>
                                            <option value="3">강의</option>
                                            <option value="4">교육</option>
                                            <option value="5">기타</option>
                                        </select>
                                    </label>
                                </li>
                                <li>
                                    {/* <a href="" className="prev">이전연도로이동</a> */}
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.year}년</span>
                                    {/* <a href="" className="next">다음연도로이동</a> */}
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, 1);
                                        }}
                                    ></button>
                                </li>
                                <li className="half L">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, -1);
                                        }}
                                    ></button>
                                    <span>{(searchCondition.month + 1)}월</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, 1);
                                        }}
                                    ></button>
                                </li>
                                <li className="half R">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_WEEK, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.weekOfMonth + 1}주</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_WEEK, 1);
                                        }}
                                    ></button>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD003">
                            <div className="head">
                                <span>날짜</span>
                                <span>시간</span>
                                <span>제목</span>
                                <span>담당자</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 있을때 --> */}
                                {/* <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a>
                                <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a>
                                <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a>
                                <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a>
                                <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a> 
                                                                <div class="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                    </div>
                                    <div>관리자</div>
                                </div>
                                <div class="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                    </div>
                                    <div>관리자</div>
                                </div>
                                <div class="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                        <a href="">
                                            <span>11:00~12:30</span>
                                            <span>전자정부표준프레임워크 금주의 행사안내입니다.</span>
                                        </a>
                                    </div>
                                    <div>관리자</div>
                                </div>
                                
                                
                                */}
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}


                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovWeeklyList;