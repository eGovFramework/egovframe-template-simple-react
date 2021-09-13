import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'context/url';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';


function EgovAdminNoticeList() {
    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="/" className="home" href="">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>공지사항 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents TEMPLATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">공지사항 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p className="no_data">검색된 결과가 없습니다.</p>
                                
                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to={`${URL.ADMIN_NOTICE_DETAIL}/3`} className="list_item">
                                    <div>3</div>
                                    <div className="al">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>
                                <Link to={`${URL.ADMIN_NOTICE_DETAIL}/2`} className="list_item">
                                    <div>2</div>
                                    <div className="al">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>
                                <Link to={`${URL.ADMIN_NOTICE_DETAIL}/1`} className="list_item">
                                    <div>1</div>
                                    <div className="al">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</div>
                                    <div>관리자</div>
                                    <div>2021-7-24</div>
                                    <div>3</div>
                                </Link>
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

export default EgovAdminNoticeList;