import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavAbout() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>사이트 소개</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.ABOUT_SITE} className={({ isActive }) => (isActive ? "cur" : "")}>소개</NavLink></li>
                    <li><NavLink to={URL.ABOUT_HISTORY} className={({ isActive }) => (isActive ? "cur" : "")}>연혁</NavLink></li>
                    <li><NavLink to={URL.ABOUT_ORGANIZATION} className={({ isActive }) => (isActive ? "cur" : "")}>조직소개</NavLink></li>
                    <li><NavLink to={URL.ABOUT_LOCATION} className={({ isActive }) => (isActive ? "cur" : "")}>찾아오시는 길</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavAbout;