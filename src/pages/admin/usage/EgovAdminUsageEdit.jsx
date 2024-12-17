import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovRadioButtonGroup from "@/components/EgovRadioButtonGroup";

function EgovAdminUsageEdit(props) {
  console.group("EgovAdminUsageEdit");
  console.log("[Start] EgovAdminUsageEdit ------------------------------");
  console.log("EgovAdminUsageEdit [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovAdminUsageEdit [location] : ", location);

  const bbsId = location.state?.bbsId || "";
  const trgetId = location.state?.trgetId || "SYSTEM_DEFAULT_BOARD";

  const [modeInfo, setModeInfo] = useState({ mode: props.mode });
  const [boardDetail, setBoardDetail] = useState({});
  const [notUsedBdMstrList, setNotUsedBdMstrList] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [useAtRadioGroup, setUseAtRadioGroup] = useState([
    { value: "Y", label: "사용" },
    { value: "N", label: "미사용" },
  ]);

  const initMode = () => {
    switch (props.mode) {
      case CODE.MODE_CREATE:
        setModeInfo({
          ...modeInfo,
          modeTitle: "등록",
          editURL: "/bbsUseInf",
        });
        break;

      case CODE.MODE_MODIFY:
        setModeInfo({
          ...modeInfo,
          modeTitle: "수정",
          editURL: `/bbsUseInf/${bbsId}`,
        });
        break;
      default:
        navigate({ pathname: URL.ERROR }, { state: { msg: "" } });
    }
    retrieveDetail();
  };

  const retrieveDetail = () => {
    if (modeInfo.mode === CODE.MODE_CREATE) {
      // 등록모드일 경우 사용중이지 않은 MasterBoard만 조회

      setBoardDetail({
        useAt: "Y", //사용여부 초기값
        trgetId: "SYSTEM_DEFAULT_BOARD", //시스템 targetId default값
      });

      //새로 생성된 MstrBoard 리스트 조회
      const retrieveMasterBdURL = "/notUsedBbsMaster";

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      };
      EgovNet.requestFetch(
        retrieveMasterBdURL,
        requestOptions,
        function (resp) {
          setNotUsedBdMstrList(resp.result.resultList);
        }
      );

      return;
    }

    const retrieveDetailURL = `/bbsUseInf/${trgetId}/${bbsId}`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      // 수정모드일 경우 조회값 세팅
      if (modeInfo.mode === CODE.MODE_MODIFY) {
        setBoardDetail(resp.result.bdUseVO);
        setNotUsedBdMstrList(resp.result.resultList);
      }
    });
  };

  const updateBoard = () => {
    let modeStr = modeInfo.mode === CODE.MODE_CREATE ? "POST" : "PUT";

    let requestOptions = {};

    const formData = new FormData();

    if (modeStr === "POST") {
      for (let key in boardDetail) {
        formData.append(key, boardDetail[key]);
        //console.log("boardDetail [%s] ", key, boardDetail[key]);
      }

      requestOptions = {
        method: modeStr,
        headers: {},
        body: formData,
      };
    } else {
      requestOptions = {
        method: modeStr,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...boardDetail }),
      };
    }

    const usageEdit = () => {
      EgovNet.requestFetch(modeInfo.editURL, requestOptions, (resp) => {
        if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
          navigate({ pathname: URL.ADMIN_USAGE });
        } else {
          navigate(
            { pathname: URL.ERROR },
            { state: { msg: resp.resultMessage } }
          );
        }
      });
    };

    if (modeInfo.mode === CODE.MODE_MODIFY) {
      usageEdit();
    } else {
      if (formValidator(formData)) {
        usageEdit();
      }
    }
  };

  const formValidator = (formData) => {
    if (formData.get("bbsId") === null || formData.get("bbsId") === "") {
      alert("게시판명은 필수 값입니다.");
      return false;
    }
    if (modeInfo.mode === CODE.MODE_CREATE) {
      if (
        formData.get("trgetType") === null ||
        formData.get("trgetType") === ""
      ) {
        alert("커뮤니티/동호회명은 필수 값입니다.");
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    initMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminUsageEdit [End]");
  console.groupEnd("EgovAdminUsageEdit");

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
            <li>
              <a href="#!">사이트관리</a>
            </li>
            <li>게시판사용관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents BOARD_USE_LIST" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            <h2 className="tit_2">게시판사용 관리</h2>

            <div className="board_view2">
              {/* 등록일때 일때 */}
              {modeInfo.mode === CODE.MODE_CREATE && (
                <>
                  <dl>
                    <dt>
                      게시판명<span className="req">필수</span>
                    </dt>
                    <dd>
                      <label className="f_select " htmlFor="bbsId">
                        <select
                          id="bbsId"
                          name="bbsId"
                          title="게시판선택"
                          onChange={(e) => {
                            let index = e.nativeEvent.target.selectedIndex;
                            let label = e.nativeEvent.target[index].text;
                            console.log("bbsId onChange : ", e.nativeEvent);
                            setBoardDetail({
                              ...boardDetail,
                              bbsId: e.target.value,
                              bbsNm: label,
                            });
                          }}
                          value={boardDetail.bbsId}
                        >
                          <option value="">선택하세요</option>
                          {notUsedBdMstrList.map((option) => {
                            console.log("notUsedBdMstrList option : ", option);
                            return (
                              <option value={option.bbsId} key={option.bbsId}>
                                {option.bbsNm}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      커뮤니티/동호회명<span className="req">필수</span>
                    </dt>
                    <dd>
                      <label className="f_select " htmlFor="trgetType">
                        <select
                          id="trgetType"
                          name="trgetType"
                          className="select"
                          title=""
                          onChange={(e) =>
                            setBoardDetail({
                              ...boardDetail,
                              trgetType: e.target.value,
                              trgetId: "SYSTEM_DEFAULT_BOARD",
                            })
                          }
                        >
                          <option value="">선택하세요</option>
                          <option value="SYSTEM">시스템 활용</option>
                        </select>
                      </label>
                    </dd>
                  </dl>
                </>
              )}

              {/* 수정/조회 일때 */}
              {modeInfo.mode === CODE.MODE_MODIFY && (
                <>
                  <dl>
                    <dt>게시판명</dt>
                    <dd>{boardDetail && boardDetail.bbsNm}</dd>
                  </dl>
                  <dl>
                    <dt>커뮤니티/동호회명</dt>
                    <dd>{boardDetail && boardDetail.cmmntyNm}</dd>
                  </dl>
                  <dl>
                    <dt>
                      사용여부<span className="req">필수</span>
                    </dt>
                    <dd>
                      <EgovRadioButtonGroup
                        name="useAt"
                        radioGroup={useAtRadioGroup}
                        setValue={boardDetail.useAt}
                        setter={(v) =>
                          setBoardDetail({ ...boardDetail, useAt: v })
                        }
                      />
                    </dd>
                  </dl>
                  <dl>
                    <dt>게시판 ID</dt>
                    <dd>
                      {boardDetail.bbsId === "BBSMSTR_BBBBBBBBBBBB" ? (
                        <Link
                          to={{ pathname: URL.INFORM_GALLERY }}
                          state={{
                            bbsId: boardDetail.bbsId,
                          }}
                        >
                          {`${boardDetail.bbsId}`}
                        </Link>
                      ) : (
                        <Link
                          to={{ pathname: URL.INFORM_NOTICE }}
                          state={{
                            bbsId: boardDetail.bbsId,
                          }}
                        >
                          {`${boardDetail.bbsId}`}
                        </Link>
                      )}
                    </dd>
                  </dl>
                </>
              )}

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                <div className="left_col btn1"></div>

                <div className="right_col btn1">
                  <button
                    className="btn btn_blue_h46 w_100"
                    onClick={() => updateBoard()}
                  >
                    {" "}
                    저장
                  </button>
                  <Link to={URL.ADMIN_USAGE} className="btn btn_blue_h46 w_100">
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

export default EgovAdminUsageEdit;
