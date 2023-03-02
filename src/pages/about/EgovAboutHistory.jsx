import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutHistory() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사이트 소개</Link></li>
                        <li>연혁</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}
                    
                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">사이트 소개</h1>

                        <p className="txt_1">표준프레임워크 경량환경 포털사이트를 소개합니다.</p>
                        
                        <h2 className="tit_4">전자정부표준프레임워크 연혁</h2>

                        <h3 className="tit_5">연혁</h3>

                        <p className="msg_1">표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 2010년 11월 4일 「표준프레임워크센터」가 <br/>
                            설립되었으며 정책지원, 글로벌 확산 등을 담당할 NIA 인력과 R&D, 기술지원 등을 담당할 외부 민간 전문가로 <br/>
                            구성되었습니다.</p>
                    
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutHistory;