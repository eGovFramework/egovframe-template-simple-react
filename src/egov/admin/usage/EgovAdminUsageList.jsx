import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminUsageList() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>게시판 사용 관리</li>
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

                        <h2 className="tit_2">게시판 사용 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="sel1">
                                        <select name="searchCnd" id="sel1" title="검색조건">
                                            <option value="0">템플릿명</option>
                                            <option value="1">템플릿구분</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    {/* <!-- 210806 수정 --> */}
                                    <span className="f_search w_500">
                                        <input type="text" name="" value="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                                <li>
                                    <Link href="" className="btn btn_blue_h46 pd35">등록</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD004">
                            <div className="head">
                                <span>번호</span>
                                <span>템플릿명</span>
                                <span>템플릿구분</span>
                                <span>템플릿경로</span>
                                <span>사용여부</span>
                                <span>등록일자</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                <p className="no_data">검색된 결과가 없습니다.</p>

                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to="" className="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div className="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div className="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
                                </Link>
                                <Link to="" className="list_item">
                                    <div>3</div>
                                    <div>게시판 기본템플릿</div>
                                    <div>게시판템플릿</div>
                                    <div className="al">/css/egovframework/cop/bbs/egovbbsTemplate.css</div>
                                    <div>사용</div>
                                    <div>2011-08-31 00:00</div>
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

export default EgovAdminUsageList;