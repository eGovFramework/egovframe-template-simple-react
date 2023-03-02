import React from 'react';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavIntro';

function EgovIntroService() {
    return (
        <div className="container">
        <div className="c_wrap">
            {/* <!-- Location --> */}
            <div className="location">
                <ul>
                    <li><a className="home" href="#!">Home</a></li>
                    <li><a href="#!">정보마당</a></li>
                    <li>대표서비스 소개</li>
                </ul>
            </div>
            {/* <!--// Location --> */}

            <div className="layout">
                {/* <!-- Navigation --> */}
                <EgovLeftNav></EgovLeftNav>
                {/* <!--// Navigation --> */}
                
                <div className="contents SERVICE_INTRO" id="contents">
                    {/* <!-- 본문 --> */}

                    <h1 className="tit_3">정보마당</h1>

                    <p className="txt_1">대표제품의 소개와 대표서비스의 소개를 보실 수 있는 페이지입니다.</p>
                    
                    <h2 className="tit_4">대표서비스 소개</h2>

                    <p className="txt_1">
                        전자정부 표준 프레임워크 실행환경은 5개 서비스 그룹으로 구성되며 34개 서비스를 제공한다.<br/>
                        실행환경 서비스 구조는 아래 그림과 같다.
                    </p>

                    <h3 className="tit_5">화면처리</h3>

                    <div className="msg">
                        <p>화면처리 서비스그룹은 업무처리 서비스와 사용자간의 인터페이스를 담당하는 서비스로 사용자 화면 구성 및<br/>사용자 입력 정보 검증 등의 기능을 지원한다.</p>
                        <ul>
                            <li>Ajax Support: Ajax는 대화식 웹 애플리케이션의 제작을 위해 HTML과 CSS, DOM, 자바 스크립트, XML, XSLT 등과 같은 조합을 이용하는 웹 개발 기법으로 Ajax 기능 지원을 위한 Custom Tag Library를 제공한다.</li>
                            <li>Internationalization: Internationalization은 다양한 지역과 언어 환경을 지원할 수 있는 서비스로, 서버 설정 및 클라이언트 브라우저 환경에 따라 자동화된 다국어 기능을 제공한다.</li>
                            <li>MVC :  MVC 디자인 패턴을 적용하여 사용자 화면을 개발할 수 있도록 MVC 기반 구조를 제공한다.</li>
                            <li>Security : 웹 응용프로그램 작성 시 발생될 수 있는 웹 보안상의 취약점(XSS, SQL Injection 등)에 대응하기 위한 기능을 제공한다.</li>
                            <li>UI Adaptor : 화면 레이어의 구현 방식에 따라 업무로직 레이어가 변경되는 것을 막기 위해서, 업무처리 Layer에서 사용할 데이터 타입을 정의하고, 화면 레이어에서 사용하는 in/out parameter를 해당 구현 
                                방식에 맞게 변환해주는 기능 제공한다.</li>
                        </ul>
                    </div>

                    <h3 className="tit_5">업무처리</h3>

                    <div className="msg second">
                        <p>업무처리 서비스는 업무 프로그램의 업무 로직을 담당하는 서비스로 업무 흐름제어, 트랜잭션 관리, 에러 처리 등의<br/>
                            기능을 제공한다.</p>
                        <ul>
                            <li>Process Control : 비지니스 로직과 업무 흐름의 분리를 지원하며, XML 등의 외부 설정으로 업무흐름 구성을 제공하고, 미리 정의된 프로세스를 실행하는 기능을 제공한다.
                                </li>
                            <li>Exception Handling : 응용 프로그래밍의 수행 과정에서 발생하는 예외사항(Exception)을 처리하기 위해 표준화된 방법을 제공한다.</li>
                        </ul>
                    </div>

                    {/* <!--// 본문 --> */}
                </div>
            </div>
        </div>
    </div>
    );
}

export default EgovIntroService;