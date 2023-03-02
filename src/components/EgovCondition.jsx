import React from 'react';
import { Link } from 'react-router-dom';

function EgovCondition() {
    return (
        <div className="condition">
            <ul>
                <li>
                    <label className="f_select" htmlFor="sel1">
                        <select name="" id="sel1" title="조건">
                            <option value="">전체</option>
                            <option value="1">회의</option>
                            <option value="2">세미나</option>
                            <option value="3">강의</option>
                            <option value="4">교육</option>
                            <option value="5">기타</option>
                        </select>
                    </label>
                </li>
                <li>
                    <Link to="" className="prev">이전연도로이동</Link>
                    <span>2021년</span>
                    <Link to="" className="next">다음연도로이동</Link>
                </li>
                <li className="half L">
                    <Link to="" className="prev">이전월로이동</Link>
                    <span>8월</span>
                    <Link to="" className="next">다음월로이동</Link>
                </li>
                <li className="half R">
                    <Link to="" className="prev">이전주로이동</Link>
                    <span>1주</span>
                    <Link to="" className="next">다음주로이동</Link>
                </li>
            </ul>
        </div>
    );
}

export default EgovCondition;