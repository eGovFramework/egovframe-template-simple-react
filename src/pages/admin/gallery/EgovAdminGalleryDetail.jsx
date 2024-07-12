import React, { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';
import { GALLERY_BBS_ID } from 'config';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavAdmin';
import EgovAttachFile from 'components/EgovAttachFile';
import EgovImageGallery from 'components/EgovImageGallery';

function EgovAdminGalleryDetail(props) {
    console.group("EgovAdminGalleryDetail");
    console.log("------------------------------");
    console.log("EgovAdminGalleryDetail [props] : ", props);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("EgovAdminGalleryDetail [location] : ", location);

    const bbsId = location.state.bbsId || GALLERY_BBS_ID;
    const nttId = location.state.nttId;
    const searchCondition = location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    
    const retrieveDetail = () => {
        const retrieveDetailURL = `/board/${bbsId}/${nttId}`;
        const requestOptions = {
            method: "GET",
            headers: {
                
                'Content-type': 'application/json'
            }
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
        const deleteBoardURL = `/board/${bbsId}/${nttId}`;
        
        const requestOptions = {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                
            }
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("게시글이 삭제되었습니다.")
                    navigate(URL.ADMIN_GALLERY ,{ replace: true });
                } else {
                    // alert("ERR : " + resp.message);
                    navigate({pathname: URL.ERROR}, {state: {msg : resp.resultMessage}});
                }

            }
        );
    }

    useEffect(function () {
        retrieveDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.groupEnd("EgovAdminGalleryDetail");

    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>사이트관리</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterNm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>조회수</dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="board_article">
                                <textarea name="" cols="30" rows="10" readOnly="readonly" defaultValue={boardDetail && boardDetail.nttCn}></textarea>
                            </div>

                            <EgovImageGallery boardFiles={boardAttachFiles} />

                            <div className="board_attach">
                                {/* 답글이 아니고 게시판 파일 첨부 가능 상태에서만 첨부파일 컴포넌트 노출 */}
                                {(boardDetail.parnts === '0') && masterBoard.fileAtchPosblAt === 'Y' && <EgovAttachFile boardFiles={boardAttachFiles} />}
                            </div>


                            <div className="board_btn_area">
							{masterBoard.bbsUseFlag === 'Y' &&
                                <div className="left_col btn3">
                                    <Link to={{pathname: URL.ADMIN_GALLERY_MODIFY}} 
                                        state={{
                                            nttId: nttId, 
                                            bbsId: bbsId
                                        }} 
                                        className="btn btn_skyblue_h46 w_100">수정</Link>
                                    <a href="#!" className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                    }}>삭제</a>
									{masterBoard.replyPosblAt === 'Y' &&
                                    <Link to={{pathname: URL.ADMIN_GALLERY_REPLY}} 
                                        state={{
                                            nttId: nttId, 
                                            bbsId: bbsId
                                        }} 
                                        className="btn btn_skyblue_h46 w_100">답글작성</Link>
									}
                                </div>
							}
                                <div className="right_col btn1">
                                    <Link to={{pathname: URL.ADMIN_GALLERY}} 
                                        state={{
                                            nttId: nttId,
                                            bbsId: bbsId,
                                            searchCondition: searchCondition
                                        }}
                                        className="btn btn_blue_h46 w_100">목록</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- 게시판 상세보기 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovAdminGalleryDetail;