import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';
import URL from 'constants/url';

function EgovQnaList() {
    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">고객지원</Link></li>
                        <li>소개</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents QNA_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">고객지원</h1>                            
                        </div>
                        
                        <h2 className="tit_2">묻고답하기(Q&amp;A)</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    <label className="f_select" htmlFor="search_select">
                                        <select defaultValue={"0"} name="search_select" id="search_select">
                                            <option value="0">전체</option>
                                            <option value="1">제목</option>
                                            <option value="2">제목/내용</option>
                                            <option value="3">작성자</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    {/* <!-- 210806 수정 --> */}
                                    <span className="f_search w_500">
                                        <input type="text" name="" placeholder=""/>
                                        <button type="button">조회</button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}
                        
                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD008">
                            <div className="head">
                                <span>번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>조회수</span>
                                <span>등록일</span>
                            </div>
                            <div className="result">
                                {/* <!-- case : 데이터 없을때 --> */}
                                {/* <p className="no_data" key="0">검색된 결과가 없습니다.</p> */}
                                
                                {/* <!-- case : 데이터 있을때 --> */}
                                <Link to={URL.SUPPORT_QNA_DETAIL} className="list_item">
                                    <div>3</div>
                                    <div className="al">공통컴포넌트 중 모니터링 관련 서비스 실행시 오류가 발생합니다(15)</div>
                                    <div>홍길동</div>
                                    <div>3</div>
                                    <div>2021-7-24</div>
                                </Link>
                                <Link to={URL.SUPPORT_QNA_DETAIL} className="list_item">
                                    <div>2</div>
                                    <div className="al">validation 처리 시.패스워드에 대한 메소드를 찾지 못합니다.</div>
                                    <div>홍길동</div>
                                    <div>3</div>
                                    <div>2021-7-24</div>
                                </Link>
                                <Link to={URL.SUPPORT_QNA_DETAIL} className="list_item">
                                    <div>1</div>
                                    <div className="al">공통컴포넌트 중 모니터링 관련 서비스 실행시 오류가 발생합니다.</div>
                                    <div>홍길동</div>
                                    <div>3</div>
                                    <div>2021-7-24</div>
                                </Link>
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <div className="paging">
                                <ul>
                                    <li className="btn"><button to="" className="first">처음</button></li>
                                    <li className="btn"><button to="" className="prev">이전</button></li>
                                    <li><button to="" className="cur">1</button></li>
                                    <li><button to="">2</button></li>
                                    <li><button to="">3</button></li>
                                    <li><button to="">4</button></li>
                                    <li><button to="">5</button></li>
                                    <li className="btn"><button to="" className="next">다음</button></li>
                                    <li className="btn"><button to="" className="last">마지막</button></li>
                                </ul>
                            </div>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EgovQnaList;