import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'common/EgovPaging';

function EgovAdminTemplateList() {
    return (
        <div class="container">
            <div class="c_wrap">
                {/* <!-- Location --> */}
                <div class="location">
                    <ul>
                        <li><Link to="" class="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>게시판 템플릿 관리</li>
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

                        <h2 class="tit_2">게시판 템플릿 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div class="condition">
                            <ul>
                                <li class="third_1 L">
                                    <label class="f_select" for="sel1">
                                        <select name="searchCnd" id="sel1" title="검색조건">
                                            <option value="0">템플릿명</option>
                                            <option value="1">템플릿구분</option>
                                        </select>
                                    </label>
                                </li>
                                <li class="third_2 R">
                                    {/* <!-- 210806 수정 --> */}
                                    <span class="f_search w_500">
                                        <input type="text" name="" value="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                                <li>
                                    <Link to="" class="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div class="board_list BRD004">
                            <div class="head">
                                <span>번호</span>
                                <span>템플릿명</span>
                                <span>템플릿구분</span>
                                <span>템플릿경로</span>
                                <span>사용여부</span>
                                <span>등록일자</span>
                            </div>
                            <div class="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p class="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to="" class="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div class="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
                                </Link>
                                <Link to="" class="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div class="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
                                </Link>
                                <Link to="" class="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div class="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
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

export default EgovAdminTemplateList;