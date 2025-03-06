import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //Link, 제거

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";

function EgovMypageEdit(props) {
  console.group("EgovMypageEdit");
  console.log("[Start] EgovMypageEdit ------------------------------");
  console.log("EgovMypageEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovMypageEdit [location] : ", location);
  //const uniqId = location.state?.uniqId || "";
  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [memberDetail, setMemberDetail] = useState({});

  const initMode = () => {
    switch (props.mode) {
      case CODE.MODE_CREATE:
        setModeInfo({
          ...modeInfo,
          modeTitle: "등록",
          editURL: "/etc/member_insert",
        });
        break;

      case CODE.MODE_MODIFY:
        setModeInfo({
          ...modeInfo,
          modeTitle: "수정",
          editURL: `/mypage/update`,
        });
        break;
      default:
        navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
    }
    retrieveDetail();
  };

  const retrieveDetail = () => {
    if (modeInfo.mode === CODE.MODE_CREATE) {
      // 조회/등록이면 조회 안함
      setMemberDetail({
        tmplatId: "TMPLAT_MYPAGE_DEFAULT", //Template 고정
        groupId: "GROUP_00000000000001", //그룹ID 초기값
        mberSttus: "P", //로그인가능여부 초기값
        checkIdResult: "중복ID를 체크해 주세요.",
      });
      return;
    }

    const retrieveDetailURL = `/mypage/update`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };

    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      // 수정모드일 경우 조회값 세팅
      if (modeInfo.mode === CODE.MODE_MODIFY) {
        setMemberDetail(resp.result.mberManageVO);
      }
    });
  };
  const checkIdDplct = () => {
    return new Promise((resolve) => {
      let checkId = memberDetail["mberId"];
      if (checkId === null || checkId === undefined) {
        alert("회원ID를 입력해 주세요");
        return false;
      }
      const checkIdURL = `/etc/member_checkid/${checkId}`;
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      EgovNet.requestFetch(checkIdURL, reqOptions, function (resp) {
        if (
          Number(resp.resultCode) === Number(CODE.RCV_SUCCESS) &&
          resp.result.usedCnt > 0
        ) {
          setMemberDetail({
            ...memberDetail,
            checkIdResult: "이미 사용중인 아이디입니다. [ID체크]",
            mberId: checkId,
          });
          resolve(resp.result.usedCnt);
        } else {
          setMemberDetail({
            ...memberDetail,
            checkIdResult: "사용 가능한 아이디입니다.",
            mberId: checkId,
          });
          resolve(0);
        }
      });
    });
  };

  const formValidator = (formData) => {
    return new Promise((resolve) => {
      if (formData.get("mberId") === null || formData.get("mberId") === "") {
        alert("회원ID는 필수 값입니다.");
        return false;
      }
      checkIdDplct().then((res) => {
        if (res > 0) {
          return false;
        }
        if (
          formData.get("password") === null ||
          formData.get("password") === ""
        ) {
          alert("암호는 필수 값입니다.");
          return false;
        }
        if (formData.get("mberNm") === null || formData.get("mberNm") === "") {
          alert("회원명은 필수 값입니다.");
          return false;
        }
        resolve(true);
      });
    });
  };

  const formObjValidator = (checkRef) => {
    if (checkRef.current[0].value === "") {
      alert("회원ID는 필수 값입니다.");
      return false;
    }
    if (checkRef.current[1].value === "") {
      memberDetail.password = ""; //수정 시 암호값을 입력하지 않으면 공백으로처리
    }
    if (checkRef.current[2].value === "") {
      alert("회원명은 필수 값입니다.");
      return false;
    }
    return true;
  };

  const updateMember = () => {
    let modeStr = modeInfo.mode === CODE.MODE_CREATE ? "POST" : "PUT";

    let requestOptions = {};

    if (modeStr === "POST") {
      const formData = new FormData();
      for (let key in memberDetail) {
        formData.append(key, memberDetail[key]);
        //console.log("boardDetail [%s] ", key, boardDetail[key]);
      }

      formValidator(formData).then((res) => {
        if (res) {
          requestOptions = {
            method: modeStr,
            headers: {},
            body: formData,
          };

          EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
            if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
              alert("회원 정보가 등록되었습니다. 로그인 후 이용해 주세요.");
              navigate({ pathname: URL.MAIN });
            } else {
              navigate(
                { pathname: URL.ERROR },
                { state: { msg: resp.resultMessage } }
              );
            }
          });
        }
      });
    } else {
      if (formObjValidator(checkRef)) {
        requestOptions = {
          method: modeStr,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...memberDetail }),
        };

        EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
          if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
            alert("회원 정보가 수정되었습니다.");
            navigate({ pathname: URL.MYPAGE_MODIFY });
          } else {
            navigate(
              { pathname: URL.ERROR },
              { state: { msg: resp.resultMessage } }
            );
          }
        });
      }
    }
  };

  const deleteMember = () => {
    if (formObjValidator(checkRef)) {
      const deleteMypageURL = `/mypage/delete`; // /${uniqId} 제거 서버단에서 토큰 값 사용.
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...memberDetail }),
      };

      EgovNet.requestFetch(deleteMypageURL, requestOptions, (resp) => {
        console.log("====>>> member delete= ", resp);
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          setSessionItem("loginUser", { id: "" });
          setSessionItem("jToken", null);
          // PC와 Mobile 열린메뉴 닫기
          document.querySelector(".all_menu.WEB").classList.add("closed");
          document.querySelector(".btnAllMenu").classList.remove("active");
          document.querySelector(".btnAllMenu").title = "전체메뉴 닫힘";
          document.querySelector(".all_menu.Mobile").classList.add("closed");
          alert("회원이 탈퇴되었습니다. 로그아웃 됩니다.");
          navigate(URL.MAIN, { replace: true });
        } else {
          alert("ERR : " + resp.resultMessage);
        }
      });
    }
  };

  useEffect(() => {
    initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovMypageEdit [End]");
  console.groupEnd("EgovMypageEdit");

  return (
    <div className="container">
      <div className="c_wrap">
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <a className="home" href="#!">
                Home
              </a>
            </li>
            <li>마이페이지</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          {/* <EgovLeftNav></EgovLeftNav> *}
                    {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">마이페이지</h1>
            </div>

            {modeInfo.mode === CODE.MODE_CREATE && (
              <h2 className="tit_2">회원 생성</h2>
            )}

            {modeInfo.mode === CODE.MODE_MODIFY && (
              <h2 className="tit_2">회원 수정</h2>
            )}

            <div className="board_view2">
              <dl>
                <dt>
                  <label htmlFor="mberId">회원ID</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  {/* 등록 일때 변경 가능 */}
                  {modeInfo.mode === CODE.MODE_CREATE && (
                    <>
                      <input
                        className="f_input2 w_full"
                        type="text"
                        name="mberId"
                        title=""
                        id="mberId"
                        placeholder=""
                        defaultValue={memberDetail.mberId}
                        onChange={(e) =>
                          setMemberDetail({
                            ...memberDetail,
                            mberId: e.target.value,
                          })
                        }
                        ref={(el) => (checkRef.current[0] = el)}
                        required
                      />
                      <button
                        className="btn btn_skyblue_h46"
                        onClick={() => {
                          checkIdDplct();
                        }}
                      >
                        {memberDetail.checkIdResult}
                      </button>
                    </>
                  )}
                  {/* 수정/조회 일때 변경 불가 */}
                  {modeInfo.mode === CODE.MODE_MODIFY && (
                    <input
                      className="f_input2 w_full"
                      type="text"
                      name="mberId"
                      title=""
                      id="mberId"
                      placeholder=""
                      defaultValue={memberDetail.mberId}
                      ref={(el) => (checkRef.current[0] = el)}
                      readOnly
                      required
                    />
                  )}
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="password">회원암호</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  {/* 등록 일때 변경 가능 */}
                  {modeInfo.mode === CODE.MODE_CREATE && (
                    <input
                      className="f_input2 w_full"
                      type="password"
                      name="password"
                      title=""
                      id="password"
                      placeholder=""
                      defaultValue={memberDetail.password}
                      onChange={(e) =>
                        setMemberDetail({
                          ...memberDetail,
                          password: e.target.value,
                        })
                      }
                      ref={(el) => (checkRef.current[1] = el)}
                      required
                    />
                  )}
                  {/* 수정/조회 일때 */}
                  {modeInfo.mode === CODE.MODE_MODIFY && (
                    <input
                      className="f_input2 w_full"
                      type="password"
                      name="password"
                      title=""
                      id="password"
                      placeholder="빈값이면 기존 암호가 변경되지 않고 그대로 유지됩니다."
                      defaultValue=""
                      onChange={(e) =>
                        setMemberDetail({
                          ...memberDetail,
                          password: e.target.value,
                        })
                      }
                      ref={(el) => (checkRef.current[1] = el)}
                    />
                  )}
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="bbsNm">회원명</label>
                  <span className="req">필수</span>
                </dt>
                <dd>
                  <input
                    className="f_input2 w_full"
                    type="text"
                    name="mberNm"
                    title=""
                    id="mberNm"
                    placeholder=""
                    defaultValue={memberDetail.mberNm}
                    onChange={(e) =>
                      setMemberDetail({
                        ...memberDetail,
                        mberNm: e.target.value,
                      })
                    }
                    ref={(el) => (checkRef.current[2] = el)}
                    required
                  />
                </dd>
              </dl>

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1">
                  <button
                    className="btn btn_skyblue_h46 w_100"
                    onClick={() => updateMember()}
                  >
                    저장
                  </button>
                  {modeInfo.mode === CODE.MODE_MODIFY && (
                    <button
                      className="btn btn_skyblue_h46 w_100"
                      onClick={() => {
                        deleteMember();
                      }}
                    >
                      탈퇴
                    </button>
                  )}
                  {/* memberDetail.uniqId 제거 서버단에서 토큰값 사용 */}
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

export default EgovMypageEdit;
