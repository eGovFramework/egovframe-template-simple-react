import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovRadioButtonGroup from "@/components/EgovRadioButtonGroup";

function EgovAdminMemberEdit(props) {
  console.group("EgovAdminMemberEdit");
  console.log("[Start] EgovAdminMemberEdit ------------------------------");
  console.log("EgovAdminMemberEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  const checkRef = useRef([]);

  console.log("EgovAdminMemberEdit [location] : ", location);
  const uniqId = location.state?.uniqId || "";
  const mberSttusRadioGroup = [
    { value: "P", label: "가능" },
    { value: "A", label: "대기" },
    { value: "D", label: "탈퇴" },
  ];
  //const groupCodeOptions = [{ value: "GROUP_00000000000000", label: "ROLE_ADMIN" }, { value: "GROUP_00000000000001", label: "ROLE_USER" }];
  //백엔드에서 보내온 값으로 변경(위 1줄 대신 아래 1줄 추가)
  let [groupCodeOptions, setGroupCodeOptions] = useState([]);
  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [memberDetail, setMemberDetail] = useState({});

  const initMode = () => {
    switch (props.mode) {
      case CODE.MODE_CREATE:
        setModeInfo({
          ...modeInfo,
          modeTitle: "등록",
          editURL: "/members/insert",
        });
        break;

      case CODE.MODE_MODIFY:
        setModeInfo({
          ...modeInfo,
          modeTitle: "수정",
          editURL: `/members/update`,
        });
        break;
      default:
        navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
    }
    retrieveDetail();
  };

  const retrieveDetail = () => {
    let retrieveDetailURL = "";
    if (modeInfo.mode === CODE.MODE_CREATE) {
      // 조회/등록이면 초기값 지정
      setMemberDetail({
        tmplatId: "TMPLAT_MEMBER_DEFAULT", //Template 고정
        groupId: "GROUP_00000000000001", //그룹ID 초기값
        mberSttus: "P", //로그인가능여부 초기값
        checkIdResult: "중복ID를 체크해 주세요.",
      });
      retrieveDetailURL = `/members/insert`;
    }
    if (modeInfo.mode === CODE.MODE_MODIFY) {
      // 수정이면 초기값 지정 안함
      retrieveDetailURL = `/members/update/${uniqId}`;
    }
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
      groupCodeOptions = []; //중복 option 값 제거
      //백엔드에서 받은 권한 그룹 options 값 바인딩(아래)
      resp.result.groupId_result.forEach((item) => {
        groupCodeOptions.push({ value: item.code, label: item.codeNm });
      });
      setGroupCodeOptions(groupCodeOptions); //html 렌더링
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
        if (
          formData.get("groupId") === null ||
          formData.get("groupId") === ""
        ) {
          alert("권한 그룹은 필수 값입니다.");
          return false;
        }
        if (
          formData.get("mberSttus") === null ||
          formData.get("mberSttus") === ""
        ) {
          alert("회원상태값은 필수 값입니다.");
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
              alert("회원 정보가 등록되었습니다.");
              navigate({ pathname: URL.ADMIN_MEMBERS });
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
            navigate({ pathname: URL.ADMIN_MEMBERS });
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

  const deleteMember = (uniqId) => {
    const deleteMemberURL = `/members/${uniqId}`;

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    EgovNet.requestFetch(deleteMemberURL, requestOptions, (resp) => {
      console.log("====>>> member delete= ", resp);
      if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        alert("회원이 삭제되었습니다.");
        navigate(URL.ADMIN_MEMBERS, { replace: true });
      } else {
        alert("ERR : " + resp.resultMessage);
      }
    });
  };

  useEffect(() => {
    initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminMemberEdit [End]");
  console.groupEnd("EgovAdminMemberEdit");

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
            <li>회원 관리</li>
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
              <dl>
                <dt>
                  회원 권한<span className="req">필수</span>
                </dt>
                <dd>
                  <label className="f_select w_200" htmlFor="groupId">
                    <select
                      id="groupId"
                      name="groupId"
                      title="회원권한유형선택"
                      onChange={(e) =>
                        setMemberDetail({
                          ...memberDetail,
                          groupId: e.target.value,
                        })
                      }
                      value={memberDetail.groupId}
                    >
                      {groupCodeOptions.map((option) => {
                        return (
                          <option value={option.value} key={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </dd>
              </dl>
              <dl>
                <dt>
                  회원상태<span className="req">필수</span>
                </dt>
                <dd>
                  <EgovRadioButtonGroup
                    name="mberSttus"
                    radioGroup={mberSttusRadioGroup}
                    setValue={memberDetail.mberSttus}
                    setter={(v) =>
                      setMemberDetail({ ...memberDetail, mberSttus: v })
                    }
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
                        deleteMember(memberDetail.uniqId);
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="right_col btn1">
                  <Link
                    to={URL.ADMIN_MEMBERS}
                    className="btn btn_blue_h46 w_100"
                  >
                    목록
                  </Link>
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

export default EgovAdminMemberEdit;
