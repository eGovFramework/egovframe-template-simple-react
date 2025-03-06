import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";

function EgovAdminPasswordUpdate(props) {
  console.group("EgovAdminPasswordUpdate");
  console.log("[Start] EgovAdminPasswordUpdate ------------------------------");
  console.log("EgovAdminPasswordUpdate [props] : ", props);

  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const formValidator = (formData) => {
    if (
      formData.get("old_password") === null ||
      formData.get("old_password") === ""
    ) {
      alert("기존 암호는 필수 값입니다.");
      return false;
    }
    if (
      formData.get("new_password") === null ||
      formData.get("new_password") === ""
    ) {
      alert("신규 암호는 필수 값입니다.");
      return false;
    }
    if (formData.get("new_password") === formData.get("old_password")) {
      alert("신규 암호는 기존 암호와 동일하게 사용할 수 없습니다.");
      return false;
    }
    return true;
  };

  const updateAdminPassword = () => {
    if (newPassword !== confirmPassword) {
      return alert("신규 암호와 입력 확인값이 일치하지 않습니다");
    }

    const editURL = "/admin/password";

    let requestOptions = {};
    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);
    if (formValidator(formData)) {
      requestOptions = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      };
      EgovNet.requestFetch(editURL, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          alert("OK 다음 로그인 시 신규 암호를 사용하세요.");
          navigate({ pathname: URL.MAIN }, { replace: true });
        } else {
          alert("Fail 변경되지 않았습니다. 다시 시도해 주세요.");
          navigate(
            { pathname: URL.ERROR },
            { state: { msg: resp.resultMessage } }
          ); //에러메세지 변수명 변경
        }
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminPasswordUpdate [End]");
  console.groupEnd("EgovAdminPasswordUpdate");

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
            <li>
              <Link to={URL.ADMIN}>사이트관리</Link>
            </li>
            <li>사이트관리자 암호변경</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>
            <h2 className="tit_2">사이트관리자 암호변경</h2>
            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="oldPassword">기존 암호</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="oldPassword"
                    title=""
                    id="oldPassword"
                    placeholder=""
                    defaultValue={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="newPassword">신규 암호</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="newPassword"
                    title=""
                    id="newPassword"
                    placeholder=""
                    defaultValue={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="confirmPassword">입력 확인</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="password"
                    name="confirmPassword"
                    title=""
                    id="confirmPassword"
                    placeholder=""
                    defaultValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </dd>
              </dl>
              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">
                  <button
                    className="btn btn_skyblue_h46 w_100"
                    onClick={() => updateAdminPassword()}
                  >
                    변경
                  </button>
                </div>
              </div>
              {/* <!--// 버튼영역 --> */}
            </div>
            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAdminPasswordUpdate;
