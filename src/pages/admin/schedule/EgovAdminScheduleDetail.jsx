import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { default as EgovLeftNav } from "@/components/leftmenu/EgovLeftNavAdmin";
import EgovAttachFile from "@/components/EgovAttachFile";

function EgovAdminScheduleDetail(props) {
  console.group("EgovAdminScheduleDetail");
  console.log("[Start] EgovAdminScheduleDetail ------------------------------");
  console.log("EgovAdminScheduleDetail [props] : ", props);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("EgovAdminScheduleDetail [location] : ", location);

  const [scheduleDetail, setScheduleDetail] = useState({});
  const [boardAttachFiles, setBoardAttachFiles] = useState();
  const [user, setUser] = useState({});

  const retrieveDetail = () => {
    const retrieveDetailURL = `/schedule/${location.state?.schdulId}`;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    EgovNet.requestFetch(retrieveDetailURL, requestOptions, function (resp) {
      let rawScheduleDetail = resp.result.scheduleDetail;
      rawScheduleDetail.startDateTime = convertDate(
        rawScheduleDetail.schdulBgnde
      );
      rawScheduleDetail.endDateTime = convertDate(
        rawScheduleDetail.schdulEndde
      );
      rawScheduleDetail.reptitSeCodeNm = getCodeName(
        resp.result.reptitSeCode,
        resp.result.scheduleDetail.reptitSeCode
      );
      rawScheduleDetail.schdulIpcrCodeNm = getCodeName(
        resp.result.schdulIpcrCode,
        resp.result.scheduleDetail.schdulIpcrCode
      );
      rawScheduleDetail.schdulSeNm = getCodeName(
        resp.result.schdulSe,
        resp.result.scheduleDetail.schdulSe
      );
      setScheduleDetail(rawScheduleDetail);
      setUser(resp.result.user);
      setBoardAttachFiles(resp.result.resultFiles);
    });
  };
  const convertDate = (str) => {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let date = str.substring(6, 8);
    let hour = str.substring(8, 10);
    let minute = str.substring(10, 12);
    return {
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
      dateForm:
        year +
        "년 " +
        month +
        "월 " +
        date +
        "일 " +
        hour +
        "시 " +
        minute +
        "분 ",
    };
  };

  const getCodeName = (codeArr, code) => {
    return codeArr.map((codeObj) => {
      if (codeObj.code === code?.trim()) return codeObj.codeNm;
      else return "";
    });
  };

  const onClickDeleteSchedule = (schdulId) => {
    const deleteBoardURL = `/schedule/${schdulId}`;

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    EgovNet.requestFetch(deleteBoardURL, requestOptions, (resp) => {
      console.log("====>>> Schdule delete= ", resp);
      if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
        alert("게시글이 삭제되었습니다.");
        navigate(URL.ADMIN_SCHEDULE, { replace: true });
      } else {
        // alert("ERR : " + resp.message);
        navigate(
          { pathname: URL.ERROR },
          { state: { msg: resp.resultMessage } }
        );
      }
    });
  };

  useEffect(function () {
    retrieveDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("------------------------------EgovAdminScheduleDetail [End]");
  console.groupEnd("EgovAdminScheduleDetail");
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
            <li>일정관리</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          <EgovLeftNav></EgovLeftNav>
          {/* <!--// Navigation --> */}

          <div className="contents SITE_GALLARY_VIEW" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">사이트관리</h1>
            </div>

            <h2 className="tit_2">일정관리 상세보기</h2>

            {/* <!-- 게시판 상세보기 --> */}
            <div className="board_view2">
              <dl>
                <dt>일정구분</dt>
                <dd>{scheduleDetail.schdulSeNm}</dd>
              </dl>
              <dl>
                <dt>중요도</dt>
                <dd>{scheduleDetail.schdulIpcrCodeNm}</dd>
              </dl>
              <dl>
                <dt>부서</dt>
                <dd>{scheduleDetail.schdulDeptName}</dd>
              </dl>
              <dl>
                <dt>일정명</dt>
                <dd>{scheduleDetail.schdulNm}</dd>
              </dl>
              <dl>
                <dt>일정내용</dt>
                <dd>{scheduleDetail.schdulCn}</dd>
              </dl>
              <dl>
                <dt>반복구분</dt>
                <dd>{scheduleDetail.reptitSeCodeNm}</dd>
              </dl>
              <dl>
                <dt>날짜/시간</dt>
                <dd>
                  {" "}
                  {scheduleDetail.startDateTime?.dateForm} ~{" "}
                  {scheduleDetail.endDateTime?.dateForm}
                </dd>
              </dl>
              <dl>
                <dt>담당자</dt>
                <dd>{scheduleDetail.schdulChargerName}</dd>
              </dl>

              <EgovAttachFile boardFiles={boardAttachFiles} />

              {/* <!-- 버튼영역 --> */}
              <div className="board_btn_area">
                {user.id && (
                  <div className="left_col btn1">
                    <Link
                      to={{ pathname: URL.ADMIN_SCHEDULE_MODIFY }}
                      state={{
                        schdulId: location.state?.schdulId,
                      }}
                      className="btn btn_skyblue_h46 w_100"
                    >
                      수정
                    </Link>
                    <button
                      className="btn btn_skyblue_h46 w_100"
                      onClick={() => {
                        onClickDeleteSchedule(location.state?.schdulId);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
                <div className="right_col btn1">
                  <Link
                    to={URL.ADMIN_SCHEDULE}
                    className="btn btn_blue_h46 w_100"
                  >
                    목록
                  </Link>
                </div>
              </div>
              {/* <!--// 버튼영역 --> */}
            </div>
            {/* <!-- 게시판 상세보기 --> */}

            {/* <!--// 본문 --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovAdminScheduleDetail;
