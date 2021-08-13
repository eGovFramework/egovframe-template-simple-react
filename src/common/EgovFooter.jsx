import React from 'react';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                <h1>
                    <a href="">
                        <img className="w" src="/assets/images/logo_footer_w.png" alt="" />
                        <img className="m" src="/assets/images/logo_footer_m.png" alt="" />
                    </a>
                </h1>
                <div className="info">
                    <p>
                        대표문의메일 : egovframesupport@gmail.com  <span className="m_hide">|</span><br className="m_show" />  대표전화 : 1566-3598 (070-4448-2678)<br />
                        호환성확인 : 070-4448-3673  |  교육문의 : 070-4448-2764
                    </p>
                    <p className="copy">Copyright © 2021 Ministry Of The Interior And Safety. All Rights Reserved.</p>
                </div>
                <div className="right_col">
                    <a href="">
                        <img className="w" src="/assets/images/banner_w_01.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_01.png" alt="" />
                    </a>
                    <a href="">
                        <img className="w" src="/assets/images/banner_w_02.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_02.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;