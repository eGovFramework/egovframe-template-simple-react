import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavAdmin() {
    return (
        <div className="nav">
            <div className="inner">
                <h2>사이트관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.ADMIN_SCHEDULE} className={({ isActive }) => (isActive ? "cur" : "")}>일정관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_BOARD} className={({ isActive }) => (isActive ? "cur" : "")}>게시판생성관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_USAGE} className={({ isActive }) => (isActive ? "cur" : "")}>게시판사용관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_NOTICE} className={({ isActive }) => (isActive ? "cur" : "")}>공지사항관리</NavLink></li>
                    <li><NavLink to={URL.ADMIN_GALLERY} className={({ isActive }) => (isActive ? "cur" : "")}>사이트갤러리관리</NavLink></li>
					<li><NavLink to={URL.ADMIN_MANAGER} className={({ isActive }) => (isActive ? "cur" : "")}>사이트관리자 암호변경</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default React.memo(EgovLeftNavAdmin);