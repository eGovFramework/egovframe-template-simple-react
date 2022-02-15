import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutOrganization() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사이트 소개</Link></li>
                        <li>조직소개</li>
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

                        <h2 className="tit_4">조직소개</h2>

                        <h3 className="tit_5">조직</h3>

                        <p className="msg_1">오픈커뮤니티의 초기 정착을 위해 표준프레임워크 개발 참여자와 국내 주요 오픈커뮤니티의 운영자·전문가를 리딩<br />
                            그룹(PMC, 커미터)으로 구성 오픈커뮤니티의 지속적인 확대·발전을 위해 프로젝트 활동에 적극적으로 참여하는 <br />
                            커뮤니티 회원이 리딩그룹의 역할을 획득할 수 있도록 투명하고 공정한 의사결정 체계를 수립</p>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutOrganization;