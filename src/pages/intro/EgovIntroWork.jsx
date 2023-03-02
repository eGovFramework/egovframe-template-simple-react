import React from 'react';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavIntro';

function EgovIntroWork() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="#!">Home</a></li>
                        <li><a href="#!">정보마당</a></li>
                        <li>주요사업 소개</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}
                    
                    <div className="contents BUSINESS_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">정보마당</h1>

                        <p className="txt_1">대표제품의 소개와 대표서비스의 소개를 보실 수 있는 페이지입니다.</p>
                        
                        <h2 className="tit_4">주요사업 소개</h2>

                        <h3 className="tit_5">개요</h3>

                        <p className="msg_1">전자정부 표준프레임워크는 실행환경, 개발환경, 관리환경, 운영환경 등 4개의 표준프레임워크 환경과 공통<br/>
                            컴포넌트로 구성된다. 전자정부 및 공공사업에서 웹 어플리케이션 시스템 구축 시 어플리케이션 아키텍처와 기본 <br/>
                            기능 및 공통컴포넌트를 표준으로 제공하는 개발프레임워크로서 다음과 같이 실행, 개발, 운영, 관리환경과 공통<br/>
                            컴포넌트로 구성됨</p>
                        
                        <h3 className="tit_5">실행 환경</h3>

                        <p className="msg_1">전자정부 사업에서 개발하는 업무 프로그램의 실행에 필요한 공통모듈 등 업무 프로그램 개발 시 화면,서버 프로<br/>
                            그램, 데이터 개발을 표준화가 용이하도록 지원하는 응용프로그램 환경</p>

                        <p className="img">
                            <img className="w" src="/assets/images/img_business_intro.png" alt=""/>
                            <img className="m" src="/assets/images/img_business_intro_m.png" alt=""/>
                        </p>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovIntroWork;