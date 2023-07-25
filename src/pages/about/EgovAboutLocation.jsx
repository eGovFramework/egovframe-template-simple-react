import React from 'react';
import { Link } from 'react-router-dom';

import URL from 'constants/url';
import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAbout';

function EgovAboutLocation() {
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                        <li><Link to={URL.ABOUT}>사이트 소개</Link></li>
                        <li>찾아오시는길</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_CONTACT_US" id="contents">
                        {/* <!-- 본문 --> */}

                        <h1 className="tit_3">사이트 소개</h1>

                        <p className="txt_1">표준프레임워크 경량환경 포털사이트를 소개합니다.</p>

                        <h2 className="tit_4">찾아오시는길</h2>

                        <div className="map">
                            <a href="https://naver.me/FHYuP0ok" target="_blank" rel="noreferrer">
                                <img src="/assets/images/map.png" alt="" />
                            </a>
                        </div>

                        <div className="addr">
                            <div className="left_col">
                                <h3>표준프레임워크센터 주소</h3>
                                <dl>
                                    <dt>도로명주소</dt>
                                    <dd>04513 서울특별시 중구 세종대로 39 대한서울상공회의소 7층</dd>
                                </dl>
                                <dl>
                                    <dt>지번주소</dt>
                                    <dd>04513 서울특별시 중구 남대문로4가 45 대한서울상공회의소 7층</dd>
                                </dl>
                            </div>
                            <div className="right_col">
                                <h3>QR코드로 위치알아보기</h3>
                                <p>스마트폰에서 QR코드<br />
                                    리더를 이용해 사진·<br />
                                    지도 등 다양한 정보를<br />
                                    확인하세요.</p>
                                <img className="qr" src="/assets/images/qrcode.png" alt="qr code" />
                            </div>
                        </div>

                        <div className="way">
                            <div className="left_col">
                                <h3>찾아오시는 길</h3>
                                <dl>
                                    <dt>지하철 2호선</dt>
                                    <dd>시청역 9번 출구 5분거리</dd>
                                </dl>
                                <dl>
                                    <dt>지하철 1호선</dt>
                                    <dd>서울역 3번 출구 5분거리</dd>
                                </dl>
                            </div>
                            <div className="right_col">
                                <h3>연락처</h3>
                                <dl>
                                    <dt className="call">전화</dt>
                                    <dd>0000-0000</dd>
                                </dl>
                                <dl>
                                    <dt className="email">이메일</dt>
                                    <dd>egovframeexample@gmail.com</dd>
                                </dl>
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAboutLocation;