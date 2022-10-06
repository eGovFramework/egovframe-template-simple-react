import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNav() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>알림마당</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INFORM_DAILY} className={({ isActive }) => (isActive ? "cur" : "")}>오늘의 행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_WEEKLY} className={({ isActive }) => (isActive ? "cur" : "")}>금주의 행사</NavLink></li>
                    <li><NavLink to={URL.INFORM_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항</NavLink></li>
                    <li><NavLink to={URL.INFORM_GALLERY} className={({ isActive }) => (isActive ? "cur" : "")}>사이트갤러리</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNav;