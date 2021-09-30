import React from 'react';
import { Link } from 'react-router-dom';
import URL from 'context/url';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminBoardList() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>게시판 생성 관리</li>
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

                        <h2 className="tit_2">게시판 생성 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <span className="lb">검색유형선택</span>
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선력">
                                            <option value="0">게시판명</option>
                                            <option value="1">게시판유형</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="lb">검색어</span>
                                    <span className="f_search w_400">
                                        <input type="text" name="" value="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                                <li>
                                    <Link to="" className="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD006">
                            <div className="head">
                                <span>번호</span>
                                <span>게시판명</span>
                                <span>게시판유형</span>
                                <span>게시판속성</span>
                                <span>생성일</span>
                                <span>사용여부</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p className="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to={URL.ADMIN_BOARD_DETAIL} className="list_item">
                                    <div>1</div>
                                    <div>갤러리</div>
                                    <div>일반게시판</div>
                                    <div>갤러리</div>
                                    <div>2011-08-31</div>
                                    <div>사용</div>
                                </Link>
                                <Link to={`${URL.ADMIN_BOARD_DETAIL}/2`} className="list_item">
                                    <div>2</div>
                                    <div>공지사항</div>
                                    <div>공지게시판</div>
                                    <div>일반게시판</div>
                                    <div>2011-08-31</div>
                                    <div>사용</div>
                                </Link>
                                <Link to={`${URL.ADMIN_BOARD_DETAIL}/3`} className="list_item">
                                    <div>3</div>
                                    <div>자료실</div>
                                    <div>일반게시판</div>
                                    <div>일반게시판</div>
                                    <div>2011-08-31</div>
                                    <div>사용</div>
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

export default EgovAdminBoardList;