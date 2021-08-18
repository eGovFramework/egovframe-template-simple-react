import React from 'react';

import { Link } from 'react-router-dom';

import URL from 'context/url';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'common/EgovPaging';

function EgovNoticeList() {
    console.log("EgovWeeklyList create");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="">Home</a></li>
                        <li><a href="">알림마당</a></li>
                        <li>공지사항</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>                            
                        </div>
                        
                        <h2 className="tit_2">공지사항</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                <div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>관리자</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>2021-06-13</dd>
                                    </dl>
                                    <dl>
                                        <dt>조회수</dt>
                                        <dd>123</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="board_article">
                                <textarea name="" cols="30" rows="10" readonly="readonly">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.전자정부표준프레임워크 심플 홈페이지 공지사항입니다.
전자정부표준프레임워크 심플 홈페이지 공지사항입니다.전자정부표준프레임워크 심플 홈페이지 공지사항입니다.
전자정부표준프레임워크 심플 홈페이지 공지사항입니다.전자정부표준프레임워크 심플 홈페이지 공지사항입니다.
전자정부표준프레임워크 심플 홈페이지 공지사항입니다.전자정부표준프레임워크 심플 홈페이지 공지사항입니다.
전자정부표준프레임워크 심플 홈페이지 공지사항입니다.전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</textarea>
                            </div>

                            <div className="board_attach">
                                <dl>
                                    <dt>첨부</dt>
                                    <dd>
                                        <span>
                                            <a href="">file_namefile_namefile_name.hwp</a> <span>[3626] byte</span>
                                        </span>

                                        {/* <!-- 파일 2개 이상 --> */}
                                        <span>
                                            <a href="">file_name2.hwp</a> <span>[3626] byte</span>
                                        </span>
                                    </dd>
                                </dl>
                            </div>

                            <div className="board_btn_area">
                                <div className="left_col btn3">
                                    <a href="" className="btn btn_skyblue_h46 w_100">수정</a>
                                    <a href="" className="btn btn_skyblue_h46 w_100">삭제</a>
                                    <a href="" className="btn btn_skyblue_h46 w_100">답글작성</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href="" className="btn btn_blue_h46 w_100">목록</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovNoticeList;