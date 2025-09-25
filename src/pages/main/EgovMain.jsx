import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import URL from "@/constants/url";

import simpleMainIng from "/assets/images/img_simple_main.png";
import initPage from "@/js/ui";
import { fetchMainPage } from "@/api/services/mainPage";
import BoardList from "./fragments/BoardList";
function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  const [noticeBoardList, setNoticeBoardList] = useState([]);
  const [gallaryBoardList, setGallaryBoardList] = useState([]);

  const retrieveList = async () => {
    console.groupCollapsed("EgovMain.retrieveList()");
    try {
      const resp = await fetchMainPage();
      setNoticeBoardList(resp.result.notiList);
      setGallaryBoardList(resp.result.galList);
    } catch (err) {
      console.error("err response : ", err);
    }
    console.groupEnd("EgovMain.retrieveList()");
  };

  useEffect(() => {
    initPage();
    retrieveList();
  }, []);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  return (
    <div className="container P_MAIN">
      <div className="c_wrap">
        <div className="colbox">
          <div className="left_col">
            <img
              src={simpleMainIng}
              alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다."
            />
          </div>

          <div className="right_col">
            <div className="mini_board">
              <ul className="tab">
                <li>
                  <a href="#공지사항" className="on">
                    공지사항
                  </a>
                </li>
                <li>
                  <a href="#갤러리">갤러리</a>
                </li>
              </ul>
              <div className="list">
                <BoardList
                  title="공지사항"
                  items={noticeBoardList}
                  detailUrl={URL.INFORM_NOTICE}
                  moreUrl={URL.INFORM_NOTICE}
                  className="notice"
                />
                <BoardList
                  title="갤러리"
                  items={gallaryBoardList}
                  detailUrl={URL.INFORM_GALLERY}
                  moreUrl={URL.INFORM_GALLERY}
                  className="gallary"
                />
              </div>
            </div>

            <div className="banner">
              <Link to={URL.SUPPORT_DOWNLOAD} className="bn1">
                <strong>자료실</strong>
                <span>
                  다양한 자료를
                  <br />
                  다운로드 받으실 수 있습니다.
                </span>
              </Link>
              <Link to={URL.ABOUT} className="bn2">
                <strong>표준프레임워크센터</strong>
                <span>
                  표준프레임워크센터의
                  <br />
                  약도 등의 정보를 제공합니다.
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="banner_bot">
          <div className="b1">
            <div>
              <h2>주요사업 소개</h2>
              <p>
                표준프레임워크가 제공하는
                <br />
                주요 사업을 소개합니다.
              </p>
            </div>
            <Link to={URL.INTRO_WORKS}>자세히 보기</Link>
          </div>
          <div className="b2">
            <div>
              <h2>대표서비스 소개</h2>
              <p>
                표준프레임워크 실행환경의
                <br />
                서비스 그룹에서 제공하는
                <br />
                대표서비스입니다.
              </p>
            </div>
            <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
          </div>
          <div className="b3">
            <div>
              <h2>서비스 신청</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 다양한 서비스를
                <br />
                신청 하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
          </div>
          <div className="b4">
            <div>
              <h2>일정 현황</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 전체적인 일정
                <br />
                현황을 조회하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.INFORM}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMain;
