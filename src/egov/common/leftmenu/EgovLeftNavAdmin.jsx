import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'context/url';

function EgovLeftNavAdmin() {
  return (
    <div className="nav">
      <div className="inner">
        <h2>사이트관리</h2>
        <ul className="menu4">
          <li>
            <NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">
              일정관리
            </NavLink>
          </li>
          <li>
            <NavLink to={URL.ADMIN_BOARD} activeClassName="cur">
              게시판생성관리
            </NavLink>
          </li>
          <li>
            <NavLink to={URL.ADMIN_USAGE} activeClassName="cur">
              게시판사용관리
            </NavLink>
          </li>
          <li>
            <NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">
              공지사항관리
            </NavLink>
          </li>
          <li>
            <NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">
              사이트갤러리관리
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EgovLeftNavAdmin;
