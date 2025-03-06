import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavInform";

function EgovWeeklyList(props) {
  console.group("EgovWeeklyList");
  console.log("[Start] EgovWeeklyList ------------------------------");
  console.log("EgovWeeklyList [props] : ", props);

  const location = useLocation();
  console.log("EgovWeeklyList [location] : ", location);

  const DATE = new Date();
  const FIRST_DAY_OF_THIS_WEEK = new Date(
    DATE.getFullYear(),
    DATE.getMonth(),
    DATE.getDate() - DATE.getDay()
  );

  const getWeekOfMonth = (date) => {
    let adjustedDate = date.getDate() + date.getDay();
    console.log(
      "getWeekOfMonth : ",
      date,
      date.getDate(),
      date.getDay(),
      adjustedDate,
      adjustedDate / 7,
      0 | (adjustedDate / 7)
    );
    let weeksOrder = [0, 1, 2, 3, 4, 5];
    let returnVal = parseInt(weeksOrder[0 | (adjustedDate / 7)]);
    console.log("returnVal:", returnVal);
    return returnVal;
  };

  const [searchCondition, setSearchCondition] = useState(
    location.state?.searchCondition || {
      schdulSe: "",
      year: FIRST_DAY_OF_THIS_WEEK.getFullYear(),
      month: FIRST_DAY_OF_THIS_WEEK.getMonth(),
      date: FIRST_DAY_OF_THIS_WEEK.getDate(),
      weekDay: FIRST_DAY_OF_THIS_WEEK.getDay(),
      weekOfMonth: getWeekOfMonth(FIRST_DAY_OF_THIS_WEEK),
    }
  );

  const [scheduleList, setScheduleList] = useState([]);
  const [listTag, setListTag] = useState([]);

  const changeDate = (target, amount) => {
    let changedDate;

    if (target === CODE.DATE_YEAR) {
      changedDate = new Date(
        searchCondition.year + amount,
        searchCondition.month,
        searchCondition.date
      );
    }

    if (target === CODE.DATE_MONTH) {
      changedDate = new Date(
        searchCondition.year,
        searchCondition.month + amount,
        searchCondition.date
      );
    }

    if (target === CODE.DATE_WEEK) {
      // let addtionOfDays = 7 * amount - searchCondition.weekDay;
      let addtionOfDays = 7 * amount;
      changedDate = new Date(
        searchCondition.year,
        searchCondition.month,
        searchCondition.date + addtionOfDays
      ); //다음주의 첫날
    }
    console.log("changedDate : ", changedDate);
    setSearchCondition({
      ...searchCondition,
      year: changedDate.getFullYear(),
      month: changedDate.getMonth(),
      date: changedDate.getDate(),
      weekDay: changedDate.getDay(),
      weekOfMonth: getWeekOfMonth(changedDate),
    });
  };

  const drawList = useCallback(() => {
    const dayNames = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    let mutListTag = [];

    let keyPropertyCnt = 0;
    // 리스트 항목 구성
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      let scheduleDate = new Date(
        searchCondition.year,
        searchCondition.month,
        searchCondition.date + dayIdx
      );
      let scheduleDateStr =
        scheduleDate.getFullYear() +
        "년 " +
        (scheduleDate.getMonth() + 1) +
        "월 " +
        scheduleDate.getDate() +
        "일 " +
        dayNames[scheduleDate.getDay()];
      let scheduleBgDate =
        scheduleDate.getFullYear() +
        ("00" + (scheduleDate.getMonth() + 1).toString()).slice(-2) +
        ("00" + scheduleDate.getDate().toString()).slice(-2);

      keyPropertyCnt++;

      let mutSubListTag = [];
      let slicedScheduleList = [];

      //scheduleList는 일주일치 일정을 한번에 가져온 데이터
      //scheduleList를 순환하면서 날짜에 맞는 걸로만 재구성
      scheduleList.forEach((currentElement, index) => {
        // 하루짜리 일정일 경우 시작일과 날짜가 일치하면
        if (
          currentElement.schdulBgnde.substring(0, 8) ===
            currentElement.schdulEndde.substring(0, 8) &&
          currentElement.schdulBgnde.substring(0, 8) === scheduleBgDate
        ) {
          slicedScheduleList.push(scheduleList[index]);
          // 이틀 이상 일정일 경우 시작일이 날짜보다 작거나 같으면 (그리고 종료일이 날짜보다 크거나 같으면)
        } else if (
          currentElement.schdulBgnde.substring(0, 8) !==
            currentElement.schdulEndde.substring(0, 8) &&
          currentElement.schdulBgnde.substring(0, 8) <= scheduleBgDate &&
          currentElement.schdulEndde.substring(0, 8) >= scheduleBgDate
        ) {
          slicedScheduleList.push(scheduleList[index]);
        }
      });

      //재구성된 게 없으면(즉, 일주일치 일정이 없으면)
      if (slicedScheduleList.length === 0) {
        mutListTag.push(
          <div className="list_item" key={keyPropertyCnt}>
            <div>{scheduleDateStr}</div>
            <div>
              <span>일정이 존재하지 않습니다.</span>
            </div>
          </div>
        );
      } else {
        mutListTag.push(
          <div className="list_item" key={keyPropertyCnt}>
            <div>{scheduleDateStr}</div>
            <div>{mutSubListTag}</div>
          </div>
        );

        let subKeyPropertyCnt = 0;

        mutSubListTag.push(
          <>
            {slicedScheduleList.length !== 0 &&
              slicedScheduleList.map((item) => {
                subKeyPropertyCnt++;
                return (
                  <Link
                    key={subKeyPropertyCnt}
                    to={{ pathname: URL.INFORM_WEEKLY_DETAIL }}
                    state={{
                      schdulId: item.schdulId,
                      prevPath: URL.INFORM_WEEKLY,
                    }}
                  >
                    <span>
                      {getTimeForm(item.schdulBgnde)} ~{" "}
                      {getTimeForm(item.schdulEndde)}
                    </span>
                    <span>{item.schdulNm}</span>
                    <span>{item.userNm}</span>
                  </Link>
                );
              })}
          </>
        );
      }
    }
    setListTag(mutListTag);
  }, [
    scheduleList,
    searchCondition.date,
    searchCondition.month,
    searchCondition.year,
  ]);

  const retrieveList = useCallback(
    (srchcnd) => {
      console.groupCollapsed("EgovWeeklyList.retrieveList()");

      const retrieveListURL =
        "/schedule/week" + EgovNet.getQueryString(srchcnd);
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };

      EgovNet.requestFetch(
        retrieveListURL,
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
    },
    [drawList]
  );

  const Location = React.memo(function Location() {
    return (
      <div className="location">
        <ul>
          <li>
            <Link to={URL.MAIN} className="home">
              Home
            </Link>
          </li>
          <li>
            <Link to={URL.INFORM}>알림마당</Link>
          </li>
          <li>금주의 행사</li>
        </ul>
      </div>
    );
  });

  const getTimeForm = (str) => {
    let hour = str.substring(8, 10);
    let starminute = str.substring(10, 12);
    return hour + ":" + starminute;
  };

  useEffect(() => {
    retrieveList(searchCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition]);

  useEffect(() => {
    drawList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList]);

  console.log("------------------------------EgovWeeklyList [End]");
  console.groupEnd("EgovWeeklyList");
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
                    <select
                      name=""
                      id="sel1"
                      title="조건"
                      onChange={(e) => {
                        setSearchCondition({
                          ...searchCondition,
                          schdulSe: e.target.value,
                        });
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
                  <button
                    className="prev"
                    onClick={() => {
                      changeDate(CODE.DATE_YEAR, -1);
                    }}
                  ></button>
                  <span>{searchCondition.year}년</span>
                  <button
                    className="next"
                    onClick={() => {
                      changeDate(CODE.DATE_YEAR, 1);
                    }}
                  ></button>
                </li>
                <li className="half L">
                  <button
                    className="prev"
                    onClick={() => {
                      changeDate(CODE.DATE_MONTH, -1);
                    }}
                  ></button>
                  <span>{searchCondition.month + 1}월</span>
                  <button
                    className="next"
                    onClick={() => {
                      changeDate(CODE.DATE_MONTH, 1);
                    }}
                  ></button>
                </li>
                <li className="half R">
                  <button
                    className="prev"
                    onClick={() => {
                      changeDate(CODE.DATE_WEEK, -1);
                    }}
                  ></button>
                  <span>{searchCondition.weekOfMonth + 1}주</span>
                  <button
                    className="next"
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
              <div className="result">{listTag}</div>
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
