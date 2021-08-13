import React from 'react';

import { default as EgovLeftNav } from 'common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'common/EgovPaging';

function EgovAdminNoticeList() {
    return(
        <div class="container">
            <div class="c_wrap">
                {/* <!-- Location --> */}
                <div class="location">
                    <ul>
                        <li><a class="home" href="">Home</a></li>
                        <li><a href="">사이트관리</a></li>
                        <li>공지사항 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div class="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div class="contents TEMPLATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div class="top_tit">
                            <h1 class="tit_1">사이트관리</h1>
                        </div>

                        <h2 class="tit_2">공지사항 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        {/* <!--// 게시판목록 --> */}

                        <div class="board_bot">
                            {/* <!-- Paging --> */}
                            <EgovPaging></EgovPaging>
                            {/* <!--/ Paging --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovAdminNoticeList;