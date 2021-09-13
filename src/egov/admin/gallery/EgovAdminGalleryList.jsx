import React from 'react';
import { Link } from 'react-router-dom';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';

function EgovAdminGalleryList() {
    return (
        <div class="container">
            <div class="c_wrap">
                {/* <!-- Location --> */}
                <div class="location">
                    <ul>
                        <li><Link to="" class="home">Home</Link></li>
                        <li><Link to="">사이트관리</Link></li>
                        <li>사이트갤러리 관리</li>
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

                        <h2 class="tit_2">사이트갤러리 관리</h2>

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

export default EgovAdminGalleryList;