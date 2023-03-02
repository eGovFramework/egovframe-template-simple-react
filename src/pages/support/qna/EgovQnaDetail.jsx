import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';

function EgovQnaDetail() {
    return (
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
                        
                        <h2 className="tit_2">Q&amp;A 상세조회</h2>

                        <div className="board_view2">
                            <dl>
                                <dt>제목</dt>
                                <dd>
                                    jsp파일을 못찼습니다.
                                </dd>
                            </dl>
                            <dl>
                                <dt>이메일</dt>
                                <dd>
                                    abc@nate.com
                                </dd>
                            </dl>
                            <dl>
                                <dt>이메일답변여부</dt>
                                <dd>
                                    답변요청
                                </dd>
                            </dl>
                            <dl>
                                <dt>등록일자</dt>
                                <dd>
                                    2011-08-08 11:11:11
                                </dd>
                            </dl>
                            <dl>
                                <dt>작성자</dt>
                                <dd>
                                    박성환
                                </dd>
                            </dl>
                            <dl>
                                <dt>전화</dt>
                                <dd>
                                    000-000-0000
                                </dd>
                            </dl>
                            <dl>
                                <dt>작성일</dt>
                                <dd>
                                    2011-08-08
                                </dd>
                            </dl><dl>
                                <dt>조회</dt>
                                <dd>
                                    100
                                </dd>
                            </dl>
                            <dl>
                                <dt>처리상태</dt>
                                <dd>
                                    접수대기
                                </dd>
                            </dl>
                            <dl>
                                <dt>첨부파일</dt>
                                <dd>
                                    <span className="file_attach">
                                        <Link to="">file_name.hwp</Link> <span>[3626] byte</span>
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        <div className="qna_q">
                            <span>Q</span>
                            안녕하세요 웹호스팅에 올렸더니 jsp파일에서 이런에러로그가 남았는데요 jsp파일을 못찾는것같습니다? xml을 수정해야하나요?<br/>
                            심각: Servlet.service() for servlet action threw exception<br/>
                            javax.servlet.ServletException: Could not get RequestDispatcher for [/WEB-INF/jsp/egovframework//main/main.jsp]: check that 
                            this file exists within your WAR<br/>
                            at org.springframework.web.servlet.view.InternalResourceView.renderMergedOutputModel(InternalResourceView.java:217)
                        </div>
                        <div className="qna_a">
                            <span>A</span>
                            <ul>
                                <li>
                                    <span>chanjin님의 답변 2011-08-08 12:33:33</span>
                                    심각: Servlet.service() for servlet action threw exception은 jsp파일을 열어서 보셔야합니다.
                                    javax.servlet.ServletException: Could not get RequestDispatcher for [/WEB-INF/jsp/egovframework//main/main.jsp]: check that 
                                    this file exists within your WAR
                                    <Link to="#" className="btn delete">Delete</Link>
                                </li>
                                <li>
                                    <span>sunrise님의 답변 2011-08-07 11:11:11</span>
                                    tomcat서버를 재시동해보세요. 전 그렇게 하니깐 되던데요.
                                    <Link to="#" className="btn delete">Delete</Link>
                                </li>
                                <li>
                                    <span>auto님의 답변 2011-08-07 11:11:11</span>
                                    제가 살펴볼께요 메일로 주세요. test@naver.com
                                    <Link to="#" className="btn delete">Delete</Link>
                                </li>
                            </ul>
                        </div>

                        {/* <!-- 답변달기 --> */}
                        <div className="replay">
                            <div className="left_col">
                                <label htmlFor="replay_write">답변달기</label>
                                <div>
                                    <textarea className="f_txtar w_full" name="" id="replay_write" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="right_col">
                                <a href="#!" className="btn ">등록</a>
                            </div>
                        </div>
                        {/* <!--// 답변달기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EgovQnaDetail;