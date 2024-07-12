import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform';

function EgovDailyList(props) {
    console.group("EgovDailyDetail");
    console.log("[Start] EgovDailyDetail ------------------------------");
    console.log("EgovDailyDetail [props] : ", props);

    const location = useLocation();
    console.log("EgovDailyDetail [location] : ", location);

    const DATE = new Date();
    const TODAY = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate());

    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { schdulSe: '', year: TODAY.getFullYear(), month: TODAY.getMonth(), date: TODAY.getDate() });

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

        if (target === CODE.DATE_DATE) {
            changedDate = new Date(searchCondition.year, searchCondition.month, searchCondition.date + amount);
        }

        setSearchCondition({ ...searchCondition, year: changedDate.getFullYear(), month: changedDate.getMonth(), date: changedDate.getDate() });
    }

    const drawList = useCallback(() => {
        let mutListTag = [];
        mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

        let listCnt = 0;
        // 리스트 항목 구성
        scheduleList.forEach(function (item, index) {
            if (index === 0) mutListTag = []; // 목록 초기화
            listCnt++;
            mutListTag.push(
                <Link
                    to={{pathname: URL.INFORM_DAILY_DETAIL}}
                    state={{
                        schdulId : item.schdulId,
                        prevPath: URL.INFORM_DAILY
                    }}
                    key={listCnt}
                    className="list_item" >
                    <div>{getTimeForm(item.schdulBgnde)} ~ {getTimeForm(item.schdulEndde)}</div>
                    <div className="al">{item.schdulNm}</div>
                    <div>{item.userNm}</div>
                </Link>
            );
        });
        setListTag(mutListTag);
    },[scheduleList]);

    const retrieveList = useCallback((srchcnd) => {
        console.groupCollapsed("EgovDailyDetail.retrieveList()");

        const retrieveListURL = '/schedule/daily'+EgovNet.getQueryString(srchcnd);
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
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

        console.groupEnd("EgovDailyDetail.retrieveList()");
    },[drawList]);

    const Location = React.memo(function Location() {
        return (
            <div className="location">
                 <ul>
                    <li><Link to={URL.MAIN} className="home">Home</Link></li>
                    <li><Link to={URL.INFORM}>알림마당</Link></li>
                    <li>오늘의 행사</li>
                </ul>
            </div>
        )
    });

    const getTimeForm = (str) => {
        let hour = str.substring(8, 10);
        let starminute = str.substring(10, 12);
        return hour + ":" + starminute;
    }

    useEffect(() => {
        retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchCondition]);

    useEffect(() => {
        drawList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scheduleList]);


    console.log("------------------------------EgovDailyDetail [End]");
    console.groupEnd("EgovDailyDetail");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <Location />
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav />
                    {/* <!--// Navigation --> */}

                    <div className="contents TODAY_SCHEDULE" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>
                        </div>

                        <h2 className="tit_2">오늘의 행사</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li>
                                    <label className="f_select" htmlFor="sel1">
                                        <select name="schdulSe" id="sel1" title="조건"
                                            onChange={e => {
                                                setSearchCondition({ ...searchCondition, schdulSe: e.target.value });
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
                                <li>
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.year}년</span>
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
                                            changeDate(CODE.DATE_DATE, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.date}일</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_DATE, 1);
                                        }}
                                    ></button>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD001">
                            <div className="head">
                                <span>시간</span>
                                <span>제목</span>
                                <span>담당자</span>
                            </div>
                            <div className="result">
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


export default EgovDailyList;