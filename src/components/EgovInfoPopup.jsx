import React from 'react';

function EgovInfoPopup(){
    return (
        <div className="wrap_pop TEMPLATE_INTRO">
        <div className="pop_inner">
            <div className="pop_header">
                <h1>홈페이지 템플릿 소개</h1>
                <button className="btn close" type="button">닫기</button>
            </div>
    
            <div className="pop_container">
                <ul className="list_1">
                    <li>경량환경 템플릿은 개발자가 프레임워크 쉽게 이해하고 활용할 수 있도록 지원합니다.</li>
                    <li>홈페이지 템플릿은 공통컴포넌트를 기반으로 아래 그림과 같이 메뉴가 구성됩니다.</li>
                    <li>관리자로 로그인하면 관리자용 메뉴를 추가로 사용할 수 있습니다.</li>
                    <li>사이트소개, 정보마당, 고객지원 메뉴는 구성을 위한 샘플페이지가 제공되며 기능은 구현되지 않은 상태입니다.</li>
                </ul>
                <div className="img">
                    <img src="/assets/images/img_template_intro.png" alt=""/>
                </div>

            </div>
        </div>
    </div>
    )
}

export default EgovInfoPopup;