import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';

function EgovAdminScheduleList(props) {
    console.group("EgovAdminScheduleList");
    console.log("[Start] EgovAdminScheduleList ------------------------------");
    console.log("EgovAdminScheduleList [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminScheduleList [history] : ", history);


    const DATE = new Date();
    const TODAY = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate());

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { schdulSe: '0', year: TODAY.getFullYear(), month: TODAY.getMonth(), date: TODAY.getDate() });
    const [calendarTag, setCalendarTag] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);


    const getLastDateOfMonth = (year, month) => {
        const LAST_DATE_SUPPLMENT = 1;
        return new Date(year, month + LAST_DATE_SUPPLMENT, 0);
    }
    const getFirstDateOfMonth = (year, month) => {
        return new Date(year, month, 1);
    }

    const changeDate = (target, amount) => {
        let changedDate;

        if (target === CODE.DATE_YEAR) {
            changedDate = new Date(searchCondition.year + amount, searchCondition.month, searchCondition.date);
        }

        if (target === CODE.DATE_MONTH) {
            changedDate = new Date(searchCondition.year, searchCondition.month + amount, searchCondition.date);
        }

        setSearchCondition({ ...searchCondition, year: changedDate.getFullYear(), month: changedDate.getMonth(), date: changedDate.getDate() });

        retrieveList(searchCondition);
    }

    const retrieveList = (srchcnd) => {
        console.groupCollapsed("EgovAdminScheduleList.retrieveList()");

        const retrieveListURL = '/cop/smt/sim/egovIndvdlSchdulManageMonthListAPI.do';
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
                drawCalendar();
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovAdminScheduleList.retrieveList()");
    }

    const drawCalendar = () => {
        const PREV_MONTH_ADDITION = -1;

        let lastOfLastMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month + PREV_MONTH_ADDITION);
        let firstOfThisMonth = getFirstDateOfMonth(searchCondition.year, searchCondition.month);
        let lastOfThisMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month);

        console.log("lastOfLastMonth : ", lastOfLastMonth, lastOfLastMonth.getDay());
        console.log("firstOfThisMonth :", firstOfThisMonth, firstOfThisMonth.getDay());
        console.log("lastOfThisMonth :", lastOfThisMonth, lastOfThisMonth.getDay());

        let firstDayOfThisMonth = firstOfThisMonth.getDay();
        let lastDateOfThisMonth = lastOfThisMonth.getDate();

        let monthArr = [];
        let weekArr = [];

        // firstWeek Date Set START
        let firstWeekDateCount = 0;
        for (let day = 0; day < 7; day++) {
            if (day < firstDayOfThisMonth) { // 
                weekArr.push(0);
                firstWeekDateCount = 0;
            } else {
                weekArr.push(++firstWeekDateCount);
            }
        }
        monthArr.push(weekArr);
        console.log("monthArr : ", monthArr);
        // firstWeek Date Set END

        // otherWeek Date Set START
        let dayCount = 0;
        weekArr = [];//초기화
        for (let day = firstWeekDateCount + 1; day <= lastDateOfThisMonth; day++) {

            if (dayCount % 7 != 6) {
                weekArr.push(day);
            } else {
                weekArr.push(day);
                monthArr.push(weekArr);
                weekArr = [];
                dayCount = -1;
            }
            dayCount++;
        }
        // otherWeek Date Set END

        // lastWeek Date Set START
        if (weekArr.length > 0) {//남은 부분
            for (let day = weekArr.length; day < 7; day++) {
                weekArr.push(0);
            }
            monthArr.push(weekArr);
        }
        // lastWeek Date Set END
        console.log("monthArr : ", monthArr);


        let sUseYear = searchCondition.year.toString();
        let sUseMonth = (searchCondition.month + 1).toString().length === 1 ? "0" + (searchCondition.month + 1).toString() : (searchCondition.month + 1).toString();
        let sUseYearMonth = sUseYear + sUseMonth;

        let mutCalendarTagList = [];
        //draw Calendar
        monthArr.forEach((week, weekIdx) => {
            mutCalendarTagList.push(
                <tr key={weekIdx}>{
                    week.map((day, dayIdx) => {
                        if (day !== 0) {
                            let sDate = day.toString().length === 1 ? "0" + day.toString() : day.toString();
                            let iUseDate = parseInt(sUseYearMonth + sDate);
                            if (scheduleList.length > 0) {
                                return (
                                    <td>
                                        <Link className="day">{day}</Link><br />
                                        {
                                            scheduleList.map((schedule) => {
                                                let iBeginDate = parseInt(schedule.schdulBgnde.substring(0, 8));
                                                let iEndDate = parseInt(schedule.schdulEndde.substring(0, 8));
                                                console.log("schedule DATE : ", iBeginDate, iUseDate, iEndDate);
                                                if (iUseDate >= iBeginDate && iUseDate <= iEndDate) {
                                                    return (
                                                        <>
                                                            <Link >{schedule.schdulNm}
                                                            </Link>
                                                            <br />
                                                        </>
                                                    );
                                                }
                                            })
                                        }
                                    </td>
                                );
                            } else {
                                return (
                                    <td>
                                        <Link className="day">{day}</Link>
                                    </td>);
                            }
                        } else if (day === 0) {
                            return (<td></td>);
                        }
                    })
                }</tr>);
        })
        console.log("mutCalendarTagList : ", mutCalendarTagList);
        setCalendarTag(mutCalendarTagList);
    }
    useEffect(() => {
        retrieveList(searchCondition);

        return () => {
        }
    }, [searchCondition]);


    console.log("------------------------------EgovAdminScheduleList [End]");
    console.groupEnd("EgovAdminScheduleList");
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

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">게시판사용 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li>
                                    <label className="f_select" htmlFor="sel1">
                                        <select name="" id="sel1" title="조건"
                                            onChange={e => {
                                                setSearchCondition({ ...searchCondition, searchCnd: e.target.value });
                                            }}
                                        >
                                            <option value="">전체</option>
                                            <option value="1">회의</option>
                                            <option value="2">세미나</option>
                                            <option value="3">강의</option>
                                            <option value="4">교육</option>
                                            <option value="5">기타</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="half L">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, -1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="prev">이전연도로이동</a> */}
                                    <span>{searchCondition.year}</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, 1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="next">다음연도로이동</a> */}
                                </li>
                                <li className="half R">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, -1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="prev">이전월로이동</a> */}
                                    <span>{(searchCondition.month + 1)}</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, 1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="next">다음월로이동</a> */}
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        <div className="calendar_list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>일</th>
                                        <th>월</th>
                                        <th>화</th>
                                        <th>수</th>
                                        <th>목</th>
                                        <th>금</th>
                                        <th>토</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Link to="" className="day">1</Link>
                                        </td>
                                        <td>
                                            <a href="" className="day">2</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">3</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">4</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="" className="day">5</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">6</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">7</a>
                                        </td>
                                        <td className="selected">
                                            <a href="" className="day">8</a>
                                            <a href="" className="schedule">스케쥴</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">9</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">10</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">11</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="" className="day">12</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">13</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">14</a>
                                            <a href="" className="schedule">스케쥴</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">15</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">16</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">17</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">18</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="" className="day">19</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">20</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">21</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">22</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">23</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">24</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">25</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="" className="day">26</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">27</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">28</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">29</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">30</a>
                                        </td>
                                        <td>
                                            <a href="" className="day">31</a>
                                        </td>
                                        <td>

                                        </td>
                                    </tr> */}
                                    {/* 새로 시작 */}
                                    {calendarTag}
                                </tbody>
                            </table>
                        </div>

                        {/* <div className="calendar_info">
                            <h2>2021년 9월 7일 </h2>
                            <ul>
                                <li>
                                    <a href="">[C3] 팀 주간 회의</a>
                                    <span>오전 9:00 ~ 오전 10:00</span>
                                </li>
                                <li>
                                    <a href="">[표준프레임워크] 주간회의 3차 회의 일정</a>
                                    <span>오전 10:00 ~ 오전 11:30</span>
                                </li>
                            </ul>
                        </div> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminScheduleList;