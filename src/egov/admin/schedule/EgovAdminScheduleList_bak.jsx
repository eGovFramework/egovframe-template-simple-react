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

    const DATETARGET = {
        YEAR: "year", MONTH: "month", DAY: "day", DATE: "date"
    }

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { schdulSe: '0' });

    const [retrieveDate, setRetrieveDate] = useState({ year: 0, month: 0, date: 0, });

    const [listTag, setListTag] = useState([]);

    // === 날짜 구현 시작

    let date = new Date();
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let lastDateOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    console.log("DATE :", date);
    console.log("lastDateOfThisMonth :", lastDateOfThisMonth, lastDateOfThisMonth.getDate());

    const initSetDate = () => {
        console.log("Today : ", today, date.getFullYear(), date.getMonth(), date.getDate());
        console.log("searchCondition : ", searchCondition.year, searchCondition.month, searchCondition.date);

        if (searchCondition.year) {
            setRetrieveDate({ ...retrieveDate, year: searchCondition.year, month: searchCondition.month, date: searchCondition.date });
        } else {
            setRetrieveDate({ ...retrieveDate, year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() })
            setSearchCondition({ ...searchCondition, year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate() })
        }
        console.log("retrieveDate : ", retrieveDate);
        console.log("researchConditiontrieveDate : ", searchCondition);

    }

    const changeDate = (target, amount) => {
        let changedDate;
        if (target === DATETARGET.YEAR) {
            changedDate = new Date(retrieveDate.year + amount, retrieveDate.month - 1, retrieveDate.date);
        }
        if (target === DATETARGET.MONTH) {
            changedDate = new Date(retrieveDate.year, retrieveDate.month + amount - 1, retrieveDate.date);
        }
        setRetrieveDate({ ...retrieveDate, year: changedDate.getFullYear(), month: changedDate.getMonth() + 1, date: changedDate.getDate() });
    }

    const drawCalendar = () => {
        //test
        // const drawDate = new Date(retrieveDate.year, retrieveDate.month - 1, retrieveDate.date);
        //console.log("drawDate : ", drawDate);
        console.log("date.getDay : ", date.getDay());
        // let startDay = today.getDay();

        // let monthArr = [];
        // let weekArr = [];
        // let countedDate = 0;

        // for (let day = 0; day < 7; day++) {
        //     if (day < startDay) {
        //         weekArr.push(0);
        //         countedDate = 0;
        //     }
        //     else {
        //         weekArr.push(++countedDate);
        //     }
        // }
        // monthArr.push(weekArr);

        // let dayCount = 0;
        // weekArr = [];
        // for (let day = countedDate; day < lastDateOfThisMonth; day++) {
        //     dayCount++;
        //     weekArr.push(day);

        //     if (day % 7 == 0) {
        //         monthArr.push(weekArr);
        //         weekArr = [];
        //         dayCount = 0;
        //     }
        // }

        // for (let day = dayCount; day < 7; day++) {
        //     weekArr.push(0);
        //     console.log(day);
        //     if (day % 7 == 0) monthArr.push(weekArr);
        // }
        // console.log("Calender---------------------");
        // weekArr.forEach((week, weekIdx) => {
        //     let weekStr = "";
        //     week.forEach((day, dayIdx) => {
        //         weekStr += " " + day;
        //     })
        //     console.log(weekStr);
        // })
        // console.log("---------------------Calender");

        // let calendar = [];
        // if (!startDay == 6) {
        //     calendar.push(
        //         <tr>
        //             {() => {
        //                 for (let day = 0; day < startDay; day++) {
        //                     <td>빈칸</td>
        //                 }
        //             }}
        //         </tr>
        //     );

        // }
        // setListTag(monthArr);
    }




    // === 날짜 구현 끝

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

            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );
        console.groupEnd("EgovAdminScheduleList.retrieveList()");
    }

    useEffect(() => {
        //initSetDate();
        drawCalendar();
        //retrieveList(searchCondition);

        return () => {
        }
    }, []);

    // useEffect(() => {
    //     //drawCalendar();
    //     return () => {
    //     }
    // }, [retrieveDate]);

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
                                            changeDate(DATETARGET.YEAR, -1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="prev">이전연도로이동</a> */}
                                    <span>{retrieveDate.year}</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(DATETARGET.YEAR, 1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="next">다음연도로이동</a> */}
                                </li>
                                <li className="half R">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(DATETARGET.MONTH, -1);
                                        }}
                                    ></button>
                                    {/* <a href="" className="prev">이전월로이동</a> */}
                                    <span>{retrieveDate.month}</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(DATETARGET.MONTH, 1);
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
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {/* <a href="" className="day">1</a> */}
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
                                    </tr>
                                    {/* 새로 시작 */}
                                    { }
                                </tbody>
                            </table>
                        </div>

                        <div className="calendar_info">
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
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminScheduleList;