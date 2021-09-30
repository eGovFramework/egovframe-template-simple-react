import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavAbout() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>사이트 소개</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.ABOUT_SITE} activeClassName="cur">소개</NavLink></li>
                    <li><NavLink to={URL.ABOUT_HISTORY} activeClassName="cur">연혁</NavLink></li>
                    <li><NavLink to={URL.ABOUT_ORGANIZATION} activeClassName="cur">조직소개</NavLink></li>
                    <li><NavLink to={URL.ABOUT_LOCATION} activeClassName="cur">찾아오시는 길</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavAbout;