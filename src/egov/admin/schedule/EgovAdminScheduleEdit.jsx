import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavAdmin';
import EgovPaging from 'egov/common/EgovPaging';
import EgovAttachFile from 'egov/common/EgovAttachFile';

function EgovAdminScheduleEdit(props) {
    console.group("EgovAdminScheduleEdit");
    console.log("[Start] EgovAdminScheduleEdit ------------------------------");
    console.log("EgovAdminScheduleEdit [props] : ", props);

    const history = useHistory();
    console.log("EgovAdminScheduleEdit [history] : ", history);
    
    const [modeInfo, setModeInfo] = useState({ mode: props.mode });

    const initMode = () => {
        switch (props.mode) {
            case CODE.MODE_CREATE:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "등록",
                    editURL: '/cop/smt/sim/egovIndvdlSchdulManageRegistActorAPI.do'
                });
                break;
            case CODE.MODE_MODIFY:
                setModeInfo({
                    ...modeInfo,
                    modeTitle: "수정",
                    editURL: '/cop/smt/sim/egovIndvdlSchdulManageModifyActorAPI.do'
                });
                break;
        }
        //retrieveDetail();
    }


    useEffect(function () {
        initMode();
        return function () {
        }
    }, []);

    console.log("------------------------------EgovAdminScheduleEdit [End]");
    console.groupEnd("EgovAdminScheduleEdit");
    return (
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>일정관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_SCHDULE_REG" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div>

                        <h2 className="tit_2">일정관리 상세보기</h2>

                        {/* <!-- 게시판 상세보기 --> */}
                        <div className="board_view2">
                            <dl>
                                <dt>일정구분<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" for="schdulSe">
                                        <select id="schdulSe" name="schdulSe" title="일정구분">
                                            <option value="">선택</option>
                                            <option value="1">회의</option>
                                            <option value="2">세미나</option>
                                            <option value="3">강의</option>
                                            <option value="4">교육</option>
                                            <option value="5">기타</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt>중요도<span className="req">필수</span></dt>
                                <dd>
                                    <label className="f_select w_130" for="schdulIpcrCode">
                                        <select id="schdulIpcrCode" name="schdulIpcrCode" title="중요도">
                                            <option value="">선택</option>
                                            <option value="A">높음</option>
                                            <option value="B">보통</option>
                                            <option value="C">낮음</option>
                                        </select>
                                    </label>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulDeptName">부서</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" title="부서" id="schdulDeptName" placeholder="관리자부서" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulNm">일정명</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" title="부서" id="schdulNm" placeholder="일정 테스트" />
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulCn">일정내용</label><span className="req">필수</span></dt>
                                <dd>
                                    <textarea className="f_txtar w_full h_100" name="" id="schdulCns" cols="30" rows="10" placeholder="일정내용"></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt>반복구분<span className="req">필수</span></dt>
                                <dd>
                                    <span className="f_rdo"><input type="radio" name="reptitSeCode" id="reptitSeCode1" title="당일" /><em>당일</em></span>
                                    <span className="f_rdo"><input type="radio" name="reptitSeCode" id="reptitSeCode2" title="반복" /><em>반복</em></span>
                                    <span className="f_rdo"><input type="radio" name="reptitSeCode" id="reptitSeCode3" title="연속" /><em>연속</em></span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜/시간<span className="req">필수</span></dt>
                                <dd className="datetime">
                                    <span className="line_break">
                                        <input className="f_input w_120" type="text" name="" placeholder="" readonly="readonly" />
                                        <a href="" className="btn btn_calendar">달력</a>
                                        <span className="f_inn_txt">~</span>
                                    </span>
                                    <span className="line_break">
                                        <input className="f_input w_120" type="text" name="" placeholder="" readonly="readonly" />
                                        <a href="" className="btn btn_calendar">달력</a>
                                    </span>
                                    <span className="line_break">
                                        <label className="f_select w_80" for="schdulBgndeHH">
                                            <select id="schdulBgndeHH" name="schdulBgndeHH" title="분">
                                                <option value="00">00</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                            </select>
                                        </label>
                                        <span className="f_inn_txt">시</span>
                                        <label className="f_select w_80" for="schdulBgndeMM">
                                            <select id="schdulBgndeMM" name="schdulBgndeMM">
                                                <option value="00">00</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                            </select>
                                        </label>
                                        <span className="f_inn_txt">분</span>
                                    </span>
                                    <span className="line_break">
                                        <span className="f_inn_txt m_hide">~</span>
                                        <label className="f_select w_80" for="schdulBgndeHH">
                                            <select id="schdulBgndeHH" name="schdulBgndeHH" title="분">
                                                <option value="00">00</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                            </select>
                                        </label>
                                        <span className="f_inn_txt">시</span>
                                        <label className="f_select w_80" for="schdulBgndeMM">
                                            <select id="schdulBgndeMM" name="schdulBgndeMM">
                                                <option value="00">00</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                            </select>
                                        </label>
                                        <span className="f_inn_txt">분</span>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt><label for="schdulChargerName">담당자</label><span className="req">필수</span></dt>
                                <dd>
                                    <input className="f_input2 w_full" type="text" name="" id="schdulChargerName" placeholder="관리자" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>파일첨부<span className="req">필수</span></dt>
                                <dd>
                                    <input type="file" />
                                    <div id="egovComFileList" className="file_add">
                                        <span className="file_attach">
                                            <a href="">file_name.hwp</a> <span>[3626] byte</span>
                                            <button className="btn btn_delete">delete</button>
                                        </span>
                                    </div>
                                </dd>
                            </dl>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <a href="" className="btn btn_skyblue_h46 w_100">삭제</a>
                                    <a href="" className="btn btn_skyblue_h46 w_100">수정</a>
                                </div>

                                <div className="right_col btn1">
                                    <a href="" className="btn btn_blue_h46 w_100">목록</a>
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

export default EgovAdminScheduleEdit;