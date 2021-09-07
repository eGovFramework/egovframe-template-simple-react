import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import qs from 'qs';
import URL from 'context/url';
import { DEFAULT_BBS_ID } from 'context/config';
import * as EgovNet from 'context/egovFetch';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'common/EgovAttachFile';

function EgovNoticeModify() {
    return (
<div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">알림마당</Link></li>
                        <li>공지사항</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">알림마당</h1>                            
                        </div>
                        
                        <h2 className="tit_2">공지사항</h2>

                        <div className="board_view2">
                            <dl>
                                <dt><label for="bbsNm">제목<span className="req">필수</span></label></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" value="RE: " title="" id="bbsNm" placeholder=""/>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="bbsIntrcn">내용<span className="req">필수</span></label></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_200" name="" id="bbsIntrcn" cols="30" rows="10" placeholder=""></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부</dt>
                                <dd>
                                    <input type="file"/>
                                </dd>
                            </dl>
                            
                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100">저장</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href="" className="btn btn_blue_h46 w_100">목록</a>
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

export default EgovNoticeModify;