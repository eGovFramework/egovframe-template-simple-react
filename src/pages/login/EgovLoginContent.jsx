import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";

import URL from "@/constants/url";
import CODE from "@/constants/code";
import { getLocalItem, setLocalItem, setSessionItem } from "@/utils/storage";
import { hashPassword } from "@/utils/passwordHash";
import SnsNaverBt from "@/components/sns/SnsNaverBt";
import SnsKakaoBt from "@/components/sns/SnsKakaoBt";
import { useAuth } from "@/contexts/AuthContext";

function EgovLoginContent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useAuth();

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    userSe: "USR",
  });
  // eslint-disable-next-line no-unused-vars
  const [loginVO, setLoginVO] = useState({});

  const [saveIDFlag, setSaveIDFlag] = useState(false);

  const checkRef = useRef();
  const idRef = useRef(null); //id입력 부분에서 엔터키 이벤트 발생 확인
  const passwordRef = useRef(null); //비밀번호 입력 부분

  const KEY_ID = "KEY_ID";
  const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";

  const handleSaveIDFlag = () => {
    setLocalItem(KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  useEffect(() => {
    let idFlag = getLocalItem(KEY_SAVE_ID_FLAG);
    if (idFlag === null) {
      setSaveIDFlag(false);

      idFlag = false;
    } else {
      setSaveIDFlag(idFlag);
    }
    if (idFlag === false) {
      setLocalItem(KEY_ID, "");
      checkRef.current.className = "f_chk";
    } else {
      checkRef.current.className = "f_chk on";
    }
  }, []);

  useEffect(() => {
    const savedId = getLocalItem(KEY_ID);
    if (savedId) {
      setUserInfo((prev) => ({ ...prev, id: savedId }));
    }
  }, []);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target === idRef.current && passwordRef.current.value === "") {
        //엔터 키 이벤트 발생한 입력 필드가 아이디인지 확인하기
        alert("비밀번호 입력 여부를 확인하여 주세요");
        passwordRef.current.focus();
      } else {
        submitFormHandler(e);
      }
    }
  };
  const submitFormHandler = async () => {
    if (!userInfo.id?.trim()) {
      alert("아이디를 입력해 주세요.");
      idRef.current.focus();
      return;
    }
    if (!userInfo.password) {
      alert("비밀번호를 입력해 주세요.");
      passwordRef.current.focus();
      return;
    }
    if (userInfo.password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      passwordRef.current.focus();
      return;
    }

    // 비밀번호를 1차 SHA-256 해시로 변환해 전송 — DevTools/네트워크에 평문 노출 차단.
    const hashedPassword = await hashPassword(userInfo.id, userInfo.password);

    const loginUrl = "/auth/login-jwt";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...userInfo, password: hashedPassword }),
    };

    EgovNet.requestFetch(loginUrl, requestOptions, (resp) => {
      if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        // JWT는 httpOnly 쿠키로 수신 — sessionStorage에 토큰 저장하지 않음
        // uniqId는 게시물 작성자 본인 확인 UI에 필요 (비밀 정보 아님)
        const { id, name, userSe, uniqId } = resp.resultVO || {};
        const resultVO = { id, name, userSe, uniqId };
        setSessionItem("loginUser", resultVO);
        props.onChangeLogin(resultVO);
        refresh(); // AuthContext 갱신 — /auth/me 재호출로 권한 정보 동기화
        if (saveIDFlag) setLocalItem(KEY_ID, resultVO?.id);
        navigate(URL.MAIN);
        // PC와 Mobile 열린메뉴 닫기
        document.querySelector(".all_menu.WEB").classList.add("closed");
        document.querySelector(".btnAllMenu").classList.remove("active");
        document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
        document.querySelector(".all_menu.Mobile").classList.add("closed");
      } else {
        alert(resp.resultMessage);
      }
    });
  };

  return (
    <div className="contents" id="contents">
      {/* <!-- 본문 --> */}
      <div className="Plogin">
        <h1>로그인</h1>
        <p className="txt">
          전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.
          <br />
          로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.
        </p>

        <div className="login_box">
          <form name="" method="" action="">
            <fieldset>
              <legend>로그인</legend>
              <span className="group">
                <input
                  type="text"
                  name=""
                  title="아이디"
                  placeholder="아이디"
                  value={userInfo?.id}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, id: e.target.value })
                  }
                  ref={idRef}
                  onKeyDown={activeEnter}
                />
                <input
                  type="password"
                  name=""
                  title="비밀번호"
                  placeholder="비밀번호"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                  ref={passwordRef}
                  onKeyDown={activeEnter}
                />
              </span>
              <div className="chk">
                <label className="f_chk" htmlFor="saveid" ref={checkRef}>
                  <input
                    type="checkbox"
                    name=""
                    id="saveid"
                    onChange={handleSaveIDFlag}
                    checked={saveIDFlag}
                  />{" "}
                  <em>ID저장</em>
                </label>
              </div>
              <button type="button" onClick={submitFormHandler}>
                <span>LOGIN</span>
              </button>
            </fieldset>
          </form>
        </div>

        <ul className="list">
          <li>
            비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서
            사용하실 수 있습니다.
          </li>
          <li>
            쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기
            쉬우므로 주기적으로 변경하셔서 사용하는 것이 좋습니다.
          </li>
        </ul>
        <div className="btn_social">
          <SnsNaverBt />
          <SnsKakaoBt />
        </div>
      </div>
      {/* <!--// 본문 --> */}
    </div>
  );
}

export default EgovLoginContent;
