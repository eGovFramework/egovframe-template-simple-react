import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as EgovNet from 'context/egovFetch';

import URL from 'context/url';
import CODE from 'context/code';

function EgovLoginContent(props) {
    console.group("EgovLoginContent");
    console.log("[Start] EgovLoginContent ------------------------------");
    console.log("EgovLoginContent [props] : ", props);

    const history = useHistory();
    console.log("EgovLoginContent [history] : ", history);

    const [userInfo, setUserInfo] = useState({ id: 'default', password: 'default', userSe: 'USR' });
    const [loginVO, setLoginVO] = useState({});

    const submitFormHandler = (e) => {
        console.log("EgovLoginContent submitFormHandler()");
        
        const loginUrl = "/uat/uia/actionLoginAPI.do"
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        EgovNet.requestFetch(loginUrl,
            requestOptions,
            (resp) => {
                let resultVO = resp.resultVO;

                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    setLoginVO(resultVO);
                    props.onChangeLogin(resultVO);
                    history.push(URL.MAIN);
                } else {
                    alert(resp.resultMessage)
                }
            })
    }

    console.log("------------------------------EgovLoginContent [End]");
    console.groupEnd("EgovLoginContent");
    
    return (
        <div className="contents" id="contents">
            {/* <!-- 본문 --> */}
            <div className="Plogin">
                <h1>로그인</h1>
                <p className="txt">전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.</p>

                <div className="login_box">
                    <form name="" method="" action="" >
                        <fieldset>
                            <legend>로그인</legend>
                            <span className="group">
                                <input type="text" name="" title="아이디" placeholder="아이디"
                                    onChange={e => setUserInfo({ ...userInfo, id: e.target.value })} />
                                <input type="password" name="" title="비밀번호" placeholder="비밀번호"
                                    onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} />
                            </span>
                            <div className="chk">
                                <label className="f_chk" htmlFor="saveid">
                                    <input type="checkbox" name="" id="saveid" /> <em>ID저장</em>
                                </label>
                            </div>
                            <button type="button" onClick={submitFormHandler}><span>LOGIN</span></button>
                        </fieldset>
                    </form>
                </div>

                <ul className="list">
                    <li>비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
                    <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로
                        변경하셔서 사용하는 것이 좋습니다.</li>
                </ul>
            </div>
            {/* <!--// 본문 --> */}
        </div>
    );
}

export default withRouter(EgovLoginContent);