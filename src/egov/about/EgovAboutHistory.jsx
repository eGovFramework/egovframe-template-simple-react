import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAbout';

function EgovAboutHistory() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">사이트 소개</Link></li>
                        <li>소개</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div id="contents" className="content">
                        {/* <!-- Location --> */}
                        <div className="location">
                            <ul>
                                <li><a className="home" href="">Home</a></li>
                                <li><a href="">사이트 소개</a></li>
                                <li>전자정부표준프레임워크 소개</li>
                            </ul>
                        </div>
                        {/* <!--// Location --> */}

                        <h1 className="tit_1">사이트 소개</h1>

                        <p className="txt_1">표준프레임워크 경량환경 포털사이트를 소개합니다.</p>

                        <h2 className="tit_2">전자정부표준프레임워크 연혁</h2>

                        <h3 className="tit_4">연혁</h3>

                        <p className="msg_1">표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 2010년 11월 4일 「표준프레임워크센터」가
                            설립되었으며 정책지원, 글로벌 확산 등을 담당할 NIA 인력과 R&D, 기술지원 등을 담당할 외부 민간 전문가로
                            구성되었습니다.</p>

                        {/* <!--// 게시판 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutHistory;