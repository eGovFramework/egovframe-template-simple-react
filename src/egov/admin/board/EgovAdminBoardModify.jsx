import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
//import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminBoardModify() {
    const { boardId } = useParams();
    return (
        <div class="container">
            <div class="c_wrap">
                {/* <!-- Location --> */}
                <div class="location">
                    <ul>
                        <li><Link to="" class="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>게시판생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div class="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div class="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div class="top_tit">
                            <h1 class="tit_1">사이트관리</h1>
                        </div>

                        <h2 class="tit_2">{boardId}게시판 정보수정 및 상세보기</h2>

                        <div class="board_view2">
                            <dl>
                                <dt><label htmlFor="bbsNm">게시판명</label><span class="req">필수</span></dt>
                                <dd>
                                    <input class="f_input2 w_full" type="text" name="" value="보도자료" title="" id="bbsNm" placeholder="" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="bbsIntrcn">게시판 소개</label><span class="req">필수</span></dt>
                                <dd>
                                    <textarea class="f_txtar w_full h_100" name="" id="bbsIntrcn" cols="30" rows="10" placeholder="">보도자료 게시판입니다.</textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 유형<span class="req">필수</span></dt>
                                <dd>
                                    공지게시판
                                </dd>
                            </dl>
                            <dl>
                                <dt>게시판 속성<span class="req">필수</span></dt>
                                <dd>
                                    일반게시판
                                </dd>
                            </dl>
                            <dl>
                                <dt>답장가능여부<span class="req">필수</span></dt>
                                <dd>
                                    불가능
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부가능여부<span class="req">필수</span></dt>
                                <dd>
                                    <span class="f_rdo on"><input type="radio" name="replyPosblAt" title="가능" checked="checked" /><em>가능</em></span>
                                    <span class="f_rdo"><input type="radio" name="replyPosblAt" title="불가능" /><em>불가능</em></span>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label htmlFor="schdulDeptName">첨부파일가능파일 숫자</label><span class="req">필수</span></dt>
                                <dd>
                                    <label class="f_select " htmlFor="posblAtchFileNumber">
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
                                <dt><label htmlFor="schdulNm">템플릿 정보</label><span class="req">필수</span></dt>
                                <dd>
                                    <span class="f_search2">
                                        <input type="text" name="" value="게시판 기본템플릿" title="" id="" placeholder="" />
                                        <button type="button">조회</button>
                                    </span>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div class="board_btn_area">
                                <div class="left_col btn1">
                                    <Link to="" class="btn btn_skyblue_h46 w_100">저장</Link>
                                    <Link to="" class="btn btn_skyblue_h46 w_100">삭제</Link>
                                </div>

                                <div class="right_col btn1">
                                    <Link to="" class="btn btn_blue_h46 w_100">목록</Link>
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

export default EgovAdminBoardModify;