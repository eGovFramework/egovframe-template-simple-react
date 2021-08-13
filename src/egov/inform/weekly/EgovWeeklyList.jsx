import React from 'react';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'common/EgovPaging';

function EgovWeeklyList() {
    console.log("EgovWeeklyList create");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="">Home</a></li>
                        <li><a href="">알림마당</a></li>
                        <li>금주의 행사</li>
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
                                    <label className="f_select" for="sel1">
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
                                    <a href="" className="prev">이전연도로이동</a>
                                    <span>2021년</span>
                                    <a href="" className="next">다음연도로이동</a>
                                </li>
                                <li className="half L">
                                    <a href="" className="prev">이전월로이동</a>
                                    <span>8월</span>
                                    <a href="" className="next">다음월로이동</a>
                                </li>
                                <li className="half R">
                                    <a href="" className="prev">이전주로이동</a>
                                    <span>1주</span>
                                    <a href="" className="next">다음주로이동</a>
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
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p className="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
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
                                <a href="" className="list_item">
                                    <div>2021년07월11일 일요일</div>
                                    <div>11:00~12:30</div>
                                    <div className="al">전자정부표준프레임워크 금주의 행사안내입니다.</div>
                                    <div>관리자</div>
                                </a>
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovWeeklyList;