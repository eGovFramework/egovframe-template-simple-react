import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavSupport() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>고객지원</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SUPPORT_DOWNLOAD} activeClassName="cur">자료실</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_QNA} activeClassName="cur">묻고답하기</NavLink></li>
                    <li><NavLink to={URL.SUPPORT_APPLY} activeClassName="cur">서비스신청</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavSupport;