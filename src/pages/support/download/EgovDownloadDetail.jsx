import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';
import URL from 'constants/url';

function EgovDownloadDetail() {
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

                    <div className="contents PDS_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">고객지원</h1>                            
                        </div>
                        
                        <h2 className="tit_2">자료실</h2>

                        {/* <!-- 상세 --> */}
                        <div className="board_view3">
                            <p className="tit">egovframe installer v1.03</p>

                            <div className="info">
                                <dl>
                                    <dt>작성자</dt>
                                    <dd>innovate</dd>
                                </dl>
                                <dl>
                                    <dt>작성일</dt>
                                    <dd>2011-08-01 23:22:11</dd>
                                </dl>
                            </div>

                            <div className="info2">
                                <div className="left_col">
                                    <img src="/assets/images/sample_pds_list.png" alt=""/>
                                    <a href="#!" className="btn btn_down"><span>다운로드</span></a>
                                </div>
                                <div className="right_col">
                                    <dl>
                                        <dt>운영체제</dt>
                                        <dd>Win95/Win98/WinME/WinNT/Win2000/WinXP/WinVISTA/Win7/</dd>
                                    </dl>
                                    <dl>
                                        <dt>권장사양</dt>
                                        <dd>펜티엄3</dd>
                                    </dl>
                                    <dl>
                                        <dt>파일정보</dt>
                                        <dd>7MB (총 1 개)/ egovframework-common-all.zip [15,083,713 byte]</dd>
                                    </dl>
                                    <dl>
                                        <dt>등록일자</dt>
                                        <dd>2011-08-08 11:11:11</dd>
                                    </dl>
                                    <dl>
                                        <dt>언어</dt>
                                        <dd>영어</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        {/* <!--// 상세 --> */}

                        <h3 className="tit_5">자료 상세설명</h3>

                        <p className="pds_des">안녕하세요.. 공통컴포넌트 전체 소스입니다. 관련된 내용은 다음 가이드를 참조하십시오. http://www.egovframe.go.kr/wiki/doku.php?id=
                            egovframework:com:v3:init_guide 감사합니다.</p>

                        {/* <!-- 버튼영역 --> */}
                        <div className="board_btn_area">
                            <div className="left_col btn1">
                            </div>

                            <div className="right_col btn1">
                                <Link to={URL.SUPPORT_DOWNLOAD} className="btn btn_blue_h46 w_100">목록</Link>
                            </div>
                        </div>
                        {/* <!--// 버튼영역 --> */}

                        <div className="bottom_navi">
                            <dl>
                                <dt>이전글</dt>
                                <dd><Link to="">egovframe installer v1.03</Link></dd>
                            </dl>
                            <dl>
                                <dt>다음글</dt>
                                <dd><Link to="">egovframe installer v1.03</Link></dd>
                            </dl>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovDownloadDetail;