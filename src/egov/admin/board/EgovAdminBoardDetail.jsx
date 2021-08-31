import React from 'react';
import { Link } from 'react-router-dom';

//import URL from 'context/url';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavAdmin';
//import EgovPaging from 'common/EgovPaging';

function EgovAdminBoardDetail() {
    console.log("EgovAdminBoardDetail create: ");
    //let { boardId } = useParams();
    //console.log("EgovAdminBoardDetail : ", boardId);
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

                    <div className="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">게시판 정보수정 및 상세보기</h2>

                        <div className="board_view2">
                            <dl>
                                <dt><label for="bbsNm">게시판명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" value="보도자료" title="" id="bbsNm" placeholder="" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="bbsIntrcn">게시판 소개</label><span className="req">필수</span></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" name="" id="bbsIntrcn" cols="30" rows="10" placeholder="">보도자료 게시판입니다.</textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 유형<span className="req">필수</span></dt>
                                <dd>
                                    공지게시판
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 속성<span className="req">필수</span></dt>
                                <dd>
                                    일반게시판
                                </dd>
                            </dl>
                            <dl>
                                <dt>답장가능여부<span className="req">필수</span></dt>
                                <dd>
                                    불가능
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부가능여부<span className="req">필수</span></dt>
                                <dd>
                                    <span className="f_rdo on"><input type="radio" name="replyPosblAt" title="가능" checked="checked" /><em>가능</em></span>
                                    <span className="f_rdo"><input type="radio" name="replyPosblAt" title="불가능" /><em>불가능</em></span>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulDeptName">첨부파일가능파일 숫자</label><span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select " for="posblAtchFileNumber">
                                        <select id="posblAtchFileNumber" name="posblAtchFileNumber" title="첨부가능파일 숫자선택">
                                            <option value="0" selected="selected">선택하세요</option>
                                            <option value="1">1개</option>
                                            <option value="2">2개</option>
                                            <option value="3">3개</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulNm">템플릿 정보</label><span className="req">필수</span></dt>
                                <dd>
                                    <span className="f_search2">
                                        <input type="text" name="" value="게시판 기본템플릿" title="" id="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <Link to="" className="btn btn_skyblue_h46 w_100">저장</Link>
                                    <Link to="" className="btn btn_skyblue_h46 w_100">삭제</Link>
                                </div>

                                <div className="right_col btn1">
                                    <Link to="" className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminBoardDetail;