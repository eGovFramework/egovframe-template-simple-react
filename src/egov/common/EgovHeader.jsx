import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';

import URL from 'context/url';
import CODE from 'context/code';

function EgovHeader({ loginUser, onChangeLogin }) {
    console.group("EgovHeader");
    console.log("[Start] EgovHeader ------------------------------");

    const history = useHistory();

    const logInHandler = () => { // 로그인 정보 없을 시
        history.push(URL.LOGIN);
    }
    const logOutHandler = () => {// 로그인 정보 존재할 때
        const logOutUrl = '/uat/uia/actionLogoutAPI.do';
        const requestOptions = {
            credentials: 'include',
        }
        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode == CODE.RCV_SUCCESS) {
                    onChangeLogin({ loginVO: {} });
                    window.alert("로그아웃되었습니다!");
                    history.push(URL.MAIN);
                }
            }
        );
    }

    console.log("------------------------------EgovHeader [End]");
    console.groupEnd("EgovHeader");

    return (
        // <!-- header -->
        <div className="header">
            <div className="inner">
                <Link to={URL.MAIN} className="ico lnk_go_template" target="_blank">홈페이지 템플릿 소개 페이지로 이동</Link>

                <h1 className="logo">
                    <Link to={URL.MAIN} className="w"><img src="/assets/images/logo_w.png" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                    <Link to={URL.MAIN} className="m"><img src="/assets/images/logo_m.png" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                </h1>

                <div className="gnb">
                    <h2 className="blind">주메뉴</h2>
                    <ul>
                        <li><NavLink to={URL.ABOUT} activeClassName="cur">사이트소개</NavLink></li>
                        <li><NavLink to={URL.INTRO} activeClassName="cur">정보마당</NavLink></li>
                        <li><NavLink to={URL.SUPPORT} activeClassName="cur">고객지원</NavLink></li>
                        <li><NavLink to={URL.INFORM} activeClassName="cur">알림마당</NavLink></li>
                        {loginUser?.id &&
                            <li><NavLink to={URL.ADMIN} activeClassName="cur">사이트관리</NavLink></li>
                        }
                    </ul>
                </div>

                {/* <!-- PC web에서 보여지는 영역 --> */}
                <div className="user_info">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {loginUser?.id &&
                        <>
                            <span className="person">{loginUser?.name} </span> 님이, 관리자로 로그인하셨습니다.
                            <button onClick={logOutHandler} className="btn">로그아웃</button>
                        </>
                    }
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!loginUser?.id &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                </div>
                {/* <!--// PC web에서 보여지는 영역 --> */}

                {/* <!-- right area --> */}
                <div className="right_a">
                    <button type="button" className="btn btnAllMenu" title="전체메뉴 닫힘">전체메뉴</button>
                    <button type="button" className="btn mobile btnAllMenuM" title="전체메뉴 닫힘">전체메뉴</button>
                </div>
            </div>

            {/* <!-- All menu : web --> */}
            <div className="all_menu WEB">
                <h2 className="blind">전체메뉴</h2>
                <div className="inner">
                    <div className="col">
                        <h3>사이트소개</h3>
                        <ul>
                            <li><NavLink to={URL.ABOUT_SITE} activeClassName="cur">소개</NavLink></li>
                            <li><NavLink to={URL.ABOUT_HISTORY} activeClassName="cur">연혁</NavLink></li>
                            <li><NavLink to={URL.ABOUT_ORGANIZATION} activeClassName="cur">조직소개</NavLink></li>
                            <li><NavLink to={URL.ABOUT_LOCATION} activeClassName="cur">찾아오시는 길</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>정보마당</h3>
                        <ul>
                            <li><NavLink to={URL.INTRO_WORKS} activeClassName="cur">주요사업 소개</NavLink></li>
                            <li><NavLink to={URL.INTRO_SERVICE} activeClassName="cur">대표서비스 소개</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>고객지원</h3>
                        <ul>
                            <li><NavLink to={URL.SUPPORT_DOWNLOAD} activeClassName="cur">자료실</NavLink></li>
                            <li><NavLink to={URL.SUPPORT_QNA} activeClassName="cur">묻고 답하기</NavLink></li>
                            <li><NavLink to={URL.SUPPORT_APPLY} activeClassName="cur">서비스 신청</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>알림마당</h3>
                        <ul>
                            <li><NavLink to={URL.INFORM_DAILY}>오늘의 행사</NavLink></li>
                            <li><NavLink to={URL.INFORM_WEEKLY} activeClassName="cur">금주의 행사</NavLink></li>
                            <li><NavLink to={URL.INFORM_NOTICE} activeClassName="cur">공지사항</NavLink></li>
                            <li><NavLink to={URL.INFORM_GALLERY} activeClassName="cur">사이트 갤러리</NavLink></li>
                        </ul>
                    </div>
                    {loginUser?.id &&
                        <div className="col">
                            <h3>사이트관리</h3>
                            <ul>
                                <li><NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">일정관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_BOARD} activeClassName="cur">게시판생성관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_USAGE} activeClassName="cur">게시판사용관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">공지사항관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">사이트갤러리관리</NavLink></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            {/* <!-- All menu : mobile --> */}
            <div className="all_menu Mobile">
                <div className="user_info_m">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {loginUser?.id &&
                        <>
                            <span className="person">{loginUser?.name} </span>이 로그인하셨습니다.
                            <button onClick={logOutHandler} className="btn logout">로그아웃</button>
                        </>
                    }

                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!loginUser?.id &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                    <button className="btn noscript close" type="button">전체메뉴 닫기</button>
                </div>
                <div className="menu">
                    <h3><Link to={URL.ABOUT}>사이트소개</Link></h3>
                    <ul>
                        <li><NavLink to={URL.ABOUT_SITE} activeClassName="cur">소개</NavLink></li>
                        <li><NavLink to={URL.ABOUT_HISTORY} activeClassName="cur">연혁</NavLink></li>
                        <li><NavLink to={URL.ABOUT_ORGANIZATION} activeClassName="cur">조직소개</NavLink></li>
                        <li><NavLink to={URL.ABOUT_LOCATION} activeClassName="cur">찾아오시는 길</NavLink></li>
                    </ul>
                    <h3><Link to={URL.INTRO}>정보마당</Link></h3>
                    <ul>
                        <li><NavLink to={URL.INTRO_WORKS} activeClassName="cur">주요사업 소개</NavLink></li>
                        <li><NavLink to={URL.INTRO_SERVICE} activeClassName="cur">대표서비스 소개</NavLink></li>
                    </ul>
                    <h3><Link to={URL.SUPPORT}>고객지원</Link></h3>
                    <ul>
                        <li><NavLink to={URL.SUPPORT_DOWNLOAD} activeClassName="cur">자료실</NavLink></li>
                        <li><NavLink to={URL.SUPPORT_QNA} activeClassName="cur">묻고 답하기</NavLink></li>
                        <li><NavLink to={URL.SUPPORT_APPLY} activeClassName="cur">서비스 신청</NavLink></li>
                    </ul>
                    <h3><Link to={URL.INFORM}>알림마당</Link></h3>
                    <ul>
                        <li><NavLink to={URL.INFORM_DAILY}>오늘의 행사</NavLink></li>
                        <li><NavLink to={URL.INFORM_WEEKLY} activeClassName="cur">금주의 행사</NavLink></li>
                        <li><NavLink to={URL.INFORM_NOTICE} activeClassName="cur">공지사항</NavLink></li>
                        <li><NavLink to={URL.INFORM_GALLERY} activeClassName="cur">사이트 갤러리</NavLink></li>
                    </ul>
                    {loginUser?.id &&
                        <>
                            <h3><Link to={URL.ADMIN}>사이트관리</Link></h3>
                            <ul>
                                <li><NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">일정관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_BOARD} activeClassName="cur">게시판생성관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_USAGE} activeClassName="cur">게시판사용관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">공지사항관리</NavLink></li>
                                <li><NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">사이트갤러리관리</NavLink></li>
                            </ul>
                        </>
                    }
                </div>
            </div>
            {/* <!--// All menu --> */}
        </div>
        // <!--// header -->
    );
}

export default EgovHeader;