import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavInform() { 
    console.groupCollapsed("EgovLeftNavInform");
    console.log("[Start] EgovLeftNavInform ------------------------------");
    console.log("------------------------------EgovLeftNavInform [End]");
    console.groupEnd("EgovLeftNavInform");
    return (
        <div className="nav">
            <div className="inner">
                <h2>알림마당</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INFORM_DAILY} activeClassName="cur">오늘의행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_WEEKLY} activeClassName="cur">금주의행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_NOTICE} activeClassName="cur">공지사항</NavLink></li>
                    <li><NavLink to={URL.INFORM_GALLERY} activeClassName="cur">사이트갤러리</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavInform;