import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import URL from 'context/url';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'common/EgovPaging';

function EgovAdminBoardList() {
    const history = useHistory();
    return (
        <div class="container">
            <div class="c_wrap">
                {/* <!-- Location --> */}
                <div class="location">
                    <ul>
                        <li><a class="home" href="">Home</a></li>
                        <li><a href="">사이트관리</a></li>
                        <li>게시판 생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div class="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div class="contents TEMPLATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div class="top_tit">
                            <h1 class="tit_1">사이트관리</h1>
                        </div>

                        <h2 class="tit_2">게시판 생성 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div class="condition">
                            <ul>
                                <li class="third_1 L">
                                    <span class="lb">검색유형선택</span>
                                    <label class="f_select" for="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선력">
                                            <option value="0">게시판명</option>
                                            <option value="1">게시판유형</option>
                                        </select>
                                    </label>
                                </li>
                                <li class="third_2 R">
                                    <span class="lb">검색어</span>
                                    <span class="f_search w_400">
                                        <input type="text" name="" value="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                                <li>
                                    <a href="" class="btn btn_blue_h46 pd35">등록</a>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div class="board_list BRD006">
                            <div class="head">
                                <span>번호</span>
                                <span>게시판명</span>
                                <span>게시판유형</span>
                                <span>게시판속성</span>
                                <span>생성일</span>
                                <span>사용여부</span>
                            </div>
                            <div class="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p class="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to={URL.ADMIN_BOARD_DETAIL} onClick={() => history.push()} class="list_item">
                                    <div>1</div>
                                    <div>갤러리</div>
                                    <div>일반게시판</div>
                                    <div>갤러리</div>
                                    <div>2011-08-31</div>
                                    <div>사용</div>
                                </Link>
                                <Link to={`${URL.ADMIN_BOARD_DETAIL}/2`} class="list_item">
                                    <div>2</div>
                                    <div>공지사항</div>
                                    <div>공지게시판</div>
                                    <div>일반게시판</div>
                                    <div>2011-08-31</div>
                                    <div>사용</div>
                                </Link>
                                <Link to={`${URL.ADMIN_BOARD_DETAIL}/3`} class="list_item">
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

                        <div class="board_bot">
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