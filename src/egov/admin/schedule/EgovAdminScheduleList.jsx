import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import debug from 'debug';
const log = debug('egov:EgovAdminScheduleList');

const EgovAdminScheduleList = (props) => {
  log({ props });

  const history = useHistory();
  log({ history });

  const DATE = new Date();
  const TODAY = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate());

  const [searchCondition, setSearchCondition] = useState(
    history.location.state?.searchCondition || {
      schdulSe: '',
      year: TODAY.getFullYear(),
      month: TODAY.getMonth(),
      date: TODAY.getDate(),
    },
  );
  const [calendarTag, setCalendarTag] = useState([]);

  const [scheduleList, setScheduleList] = useState([]);

  const getLastDateOfMonth = (year, month) => {
    const LAST_DATE_SUPPLMENT = 1;
    return new Date(year, month + LAST_DATE_SUPPLMENT, 0);
  };
  const getFirstDateOfMonth = (year, month) => {
    return new Date(year, month, 1);
  };

  const changeDate = (target, amount) => {
    let changedDate;

    if (target === CODE.DATE_YEAR) {
      changedDate = new Date(
        searchCondition.year + amount,
        searchCondition.month,
        searchCondition.date,
      );
    }

    if (target === CODE.DATE_MONTH) {
      changedDate = new Date(
        searchCondition.year,
        searchCondition.month + amount,
        searchCondition.date,
      );
    }
    setSearchCondition({
      ...searchCondition,
      year: changedDate.getFullYear(),
      month: changedDate.getMonth(),
      date: changedDate.getDate(),
    });
  };

  const retrieveList = (srchcnd) => {
    const log = debug('egov:EgovAdminScheduleList:retrieveList()');

    const retrieveListURL = '/cop/smt/sim/egovIndvdlSchdulManageMonthListAPI.do';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(srchcnd),
    };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        setScheduleList(resp.result.resultList);
      },
      (error) => log('error response:', error),
    );
  };

  const drawCalendar = () => {
    const log = debug('egov:EgovAdminScheduleList:drawCalendar()');
    const PREV_MONTH_ADDITION = -1;

    let lastOfLastMonth = getLastDateOfMonth(
      searchCondition.year,
      searchCondition.month + PREV_MONTH_ADDITION,
    );
    let firstOfThisMonth = getFirstDateOfMonth(searchCondition.year, searchCondition.month);
    let lastOfThisMonth = getLastDateOfMonth(searchCondition.year, searchCondition.month);

    log('lastOfLastMonth:', lastOfLastMonth, lastOfLastMonth.getDay());
    log('firstOfThisMonth:', firstOfThisMonth, firstOfThisMonth.getDay());
    log('lastOfThisMonth:', lastOfThisMonth, lastOfThisMonth.getDay());
    log('scheduleList:', scheduleList);

    let firstDayOfThisMonth = firstOfThisMonth.getDay();
    let lastDateOfThisMonth = lastOfThisMonth.getDate();
    log('firstDayOfThisMonth', firstDayOfThisMonth, 'lastDateOfThisMonth', lastDateOfThisMonth);

    let monthArr = [];
    let weekArr = [];

    // firstWeek Date Set START
    let firstWeekDateCount = 0;
    for (let day = 0; day < 7; day++) {
      if (day < firstDayOfThisMonth) {
        //
        weekArr.push(0);
        firstWeekDateCount = 0;
      } else {
        weekArr.push(++firstWeekDateCount);
      }
    }
    monthArr.push(weekArr);
    log('FirstWeek monthArr:', monthArr);
    // firstWeek Date Set END

    // otherWeek Date Set START
    let dayCount = 0;
    weekArr = []; //초기화
    for (let day = firstWeekDateCount + 1; day <= lastDateOfThisMonth; day++) {
      if (dayCount % 7 !== 6) {
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
    if (weekArr.length > 0) {
      //남은 부분
      for (let day = weekArr.length; day < 7; day++) {
        weekArr.push(0);
      }
      monthArr.push(weekArr);
    }
    // lastWeek Date Set END
    log('OtherWeek monthArr:', monthArr);

    let mutsUseYearMonth =
      searchCondition.year.toString() +
      ((searchCondition.month + 1).toString().length === 1
        ? '0' + (searchCondition.month + 1).toString()
        : (searchCondition.month + 1).toString());
    log('mutsUseYearMonth:', mutsUseYearMonth);

    let mutCalendarTagList = [];
    let keyIdx = 0;

    //draw Calendar
    monthArr.forEach((week, weekIdx) => {
      log('');
      mutCalendarTagList.push(
        <tr key={keyIdx++}>
          {week.map((day, dayIdx) => {
            if (day !== 0) {
              //당월 일별 구현
              let sDate = day.toString().length === 1 ? '0' + day.toString() : day.toString();
              let iUseDate = Number(mutsUseYearMonth + sDate);
              if (scheduleList.length > 0) {
                //일정 있는 경우
                return (
                  <td key={keyIdx++}>
                    <Link to={URL.ADMIN_SCHEDULE_CREATE} className="day" key={keyIdx++}>
                      {day}
                    </Link>
                    <br />
                    {scheduleList.map((schedule, scheduleIdx) => {
                      let iBeginDate = Number(schedule.schdulBgnde.substring(0, 8));
                      let iEndDate = Number(schedule.schdulEndde.substring(0, 8));
                      log(
                        'scheduleList:',
                        day,
                        scheduleIdx,
                        iBeginDate,
                        iUseDate,
                        iEndDate,
                        iUseDate >= iBeginDate && iUseDate <= iEndDate,
                      );
                      log('schedule.schdulId:', schedule.schdulId);
                      if (iUseDate >= iBeginDate && iUseDate <= iEndDate) {
                        return (
                          <>
                            <Link
                              to={{
                                pathname: URL.ADMIN_SCHEDULE_DETAIL,
                                state: {
                                  schdulId: schedule.schdulId,
                                },
                              }}
                              key={keyIdx++}>
                              {schedule.schdulNm}
                            </Link>
                            <br />
                          </>
                        );
                      }
                    })}
                  </td>
                );
              } else {
                //일정 없는 경우
                return (
                  <td key={keyIdx++}>
                    <Link to={URL.ADMIN_SCHEDULE_CREATE} className="day" key={keyIdx++}>
                      {day}
                    </Link>
                  </td>
                );
              }
            } else if (day === 0) {
              // 이전달/다음달 구현
              return <td key={keyIdx++}></td>;
            }
          })}
        </tr>,
      );
    });
    log('mutCalendarTagList:', mutCalendarTagList);
    setCalendarTag(mutCalendarTagList);
  };

  useEffect(() => {
    retrieveList(searchCondition);
  }, [searchCondition.year, searchCondition.month]);

  useEffect(() => {
    drawCalendar();
  }, [scheduleList]);

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <Link to={URL.MAIN} className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to={URL.ADMIN}>사이트관리</Link>
            </li>
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

            <h2 className="tit_2">일정관리</h2>

            {/* <!-- 검색조건 --> */}
            <div className="condition">
              <ul>
                <li>
                  <label className="f_select" htmlFor="sel1">
                    <select
                      name="schdulSe"
                      id="sel1"
                      title="조건"
                      onChange={(e) => {
                        setSearchCondition({ ...searchCondition, schdulSe: e.target.value });
                      }}>
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
                  <button
                    className="prev"
                    onClick={() => {
                      changeDate(CODE.DATE_YEAR, -1);
                    }}></button>
                  <span>{searchCondition.year}</span>
                  <button
                    className="next"
                    onClick={() => {
                      changeDate(CODE.DATE_YEAR, 1);
                    }}></button>
                </li>
                <li className="half R">
                  <button
                    className="prev"
                    onClick={() => {
                      changeDate(CODE.DATE_MONTH, -1);
                    }}></button>
                  <span>{searchCondition.month + 1}</span>
                  <button
                    className="next"
                    onClick={() => {
                      changeDate(CODE.DATE_MONTH, 1);
                    }}></button>
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
                <tbody>{calendarTag}</tbody>
              </table>
            </div>
            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EgovAdminScheduleList;
