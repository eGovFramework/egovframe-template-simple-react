import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavIntro() {
    
    return (
        <div className="nav">
            <div className="inner">
                <h2>정보마당</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.INTRO_WORKS} activeClassName="cur">주요사업 소개</NavLink></li>
                    <li><NavLink to={URL.INTRO_SERVICE} activeClassName="cur">대표서비스 소개</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavIntro;