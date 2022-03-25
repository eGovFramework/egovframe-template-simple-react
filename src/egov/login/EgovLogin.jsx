import React from 'react';
import { Link } from 'react-router-dom';

import EgovLoginContent from 'egov/login/EgovLoginContent';

import URL from 'context/url';
import debug from 'debug';
const log = debug('egov:EgovLogin');

const EgovLogin = (props) => {
  log({ props });

  const onChangeLogin = (user) => {
    props.onChangeLogin(user);
  };

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <Link to={URL.MAIN} className="home">
                Home
              </Link>
            </li>
            <li>로그인</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          <EgovLoginContent onChangeLogin={onChangeLogin}></EgovLoginContent>
        </div>
      </div>
    </div>
  );
};

export default EgovLogin;
