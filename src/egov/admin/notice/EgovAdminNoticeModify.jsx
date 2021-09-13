import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';

function EgovAdminNoticeList() {
    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>공지사항 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_GALLARY_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>                            
                        </div>
                        
                        <h2 className="tit_2">공지사항 상세보기</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view2">
                            <dl>
                                <dt>일정구분</dt>
                                <dd>회의</dd>
                            </dl>
                            <dl>
                                <dt>중요도</dt>
                                <dd>높음</dd>
                            </dl>
                            <dl>
                                <dt>부서</dt>
                                <dd>기본조직</dd>
                            </dl>
                            <dl>
                                <dt>일정명</dt>
                                <dd>일정 테스트</dd>
                            </dl>
                            <dl>
                                <dt>일정내용</dt>
                                <dd>일정 테스트</dd>
                            </dl>
                            <dl>
                                <dt>반복구분</dt>
                                <dd>당일</dd>
                            </dl>
                            <dl>
                                <dt>날짜/시간</dt>
                                <dd>2021-07-01 00시 00분 ~ 2021-07-02 00시 00분</dd>
                            </dl>
                            <dl>
                                <dt>담당자</dt>
                                <dd>관리자</dd>
                            </dl>
                            <dl>
                                <dt>파일첨부</dt>
                                <dd>
                                    <span className="file_attach">
                                        <Link to="">file_name.hwp</Link> <span>[3626] byte</span>
                                    </span>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <Link to="" className="btn btn_skyblue_h46 w_100">삭제</Link>
                                    <Link to="" className="btn btn_skyblue_h46 w_100">수정</Link>
                                </div>

                                <div className="right_col btn1">
                                    <Link to="" className="btn btn_blue_h46 w_100">목록</Link>
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

export default EgovAdminNoticeList;