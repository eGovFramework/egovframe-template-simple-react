import React from 'react';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavSupport';

function EgovSupportApply() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><a className="home" href="#!">Home</a></li>
                        <li><a href="#!">고객지원</a></li>
                        <li>서비스신청</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}
                    
                    <div className="contents SITE_INTRO" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">고객지원</h1>

                        <p className="txt_1">프레임워크 경량환경의 원하시는 서비스를 신청하실 수 있습니다.</p>
                        
                        <h2 className="tit_4">서비스 신청</h2>

                        <h3 className="tit_5">주요 서비스 안내</h3>

                        <p className="msg_1">
                            서비스필요시 다음과 같은 절차로 신청하시면 됩니다.<br/><br/>
                            1. 필요한 서비스 확인<br/><br/>
                            2. 자료실에서 필요한 서비스 존재여부 확인<br/><br/>
                            3. 서비스요청을 통해 필요한 서비스 신청<br/><br/>
                            대표 서비스 자세히 보기</p>
                    
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovSupportApply;