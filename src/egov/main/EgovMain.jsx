import React from 'react';

function EgovMain() {
    return (
        <div className="container P_MAIN">
            <div className="c_wrap">
                <div className="colbox">
                    <div className="left_col">
                        <img src="assets/images/img_simple_main.png" alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다." />
                    </div>

                    <div className="right_col">
                        <div className="mini_board">
                            <ul className="tab">
                                <li><a href="" className="on">공지사항</a></li>
                                <li><a href="">갤러리</a></li>
                            </ul>
                            <div className="list">
                                <div className="notice">
                                    <h2 className="blind">공지사항</h2>
                                    <ul>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</a><span>2021.07.01</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</a><span>2021.07.01</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</a><span>2021.07.01</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</a><span>2021.07.01</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 공지사항입니다.</a><span>2021.07.01</span></li>
                                    </ul>
                                    <a href="" className="more">더보기</a>
                                </div>

                                <div className="gallary">
                                    <h2 className="blind">갤러리</h2>
                                    <ul>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 갤러리입니다.</a><span>2021.07.02</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 갤러리입니다.</a><span>2021.07.02</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 갤러리입니다.</a><span>2021.07.02</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 갤러리입니다.</a><span>2021.07.02</span></li>
                                        <li><a href="">전자정부표준프레임워크 심플 홈페이지 갤러리입니다.</a><span>2021.07.02</span></li>
                                    </ul>
                                    <a href="" className="more">더보기</a>
                                </div>
                            </div>
                        </div>

                        <div className="banner">
                            <a href="" className="bn1">
                                <strong>자료실</strong>
                                <span>다양한 자료를<br />다운로드 받으실 수 있습니다.</span>
                            </a>
                            <a href="" className="bn2">
                                <strong>표준프레임워크센터</strong>
                                <span>표준프레임워크센터의<br />약도 등의 정보를 제공합니다.</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="banner_bot">
                    <div className="b1">
                        <div>
                            <h2>주요사업 소개</h2>
                            <p>표준프레임워크가 제공하는<br />
                                주요 사업을 소개합니다.</p>
                        </div>
                        <a href="">자세히 보기</a>
                    </div>
                    <div className="b2">
                        <div>
                            <h2>대표서비스 소개</h2>
                            <p>표준프레임워크 실행환경의<br />
                                서비스 그룹에서 제공하는<br />
                                대표서비스입니다.</p>
                        </div>
                        <a href="">자세히 보기</a>
                    </div>
                    <div className="b3">
                        <div>
                            <h2>서비스 신청</h2>
                            <p>표준프레임워크 경량환경<br />
                                홈페이지의 다양한 서비스를<br />
                                신청 하실 수 있습니다.</p>
                        </div>
                        <a href="">자세히 보기</a>
                    </div>
                    <div className="b4">
                        <div>
                            <h2>일정 현황</h2>
                            <p>표준프레임워크 경량환경<br />
                                홈페이지의 전체적인 일정<br />
                                현황을 조회하실 수 있습니다.</p>
                        </div>
                        <a href="">자세히 보기</a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EgovMain;