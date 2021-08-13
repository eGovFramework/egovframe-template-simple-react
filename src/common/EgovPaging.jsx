import React from 'react';

function EgovPaging() {
    return (
        <div className="paging">
            <ul>
                <li className="btn"><a href="" className="first">처음</a></li>
                <li className="btn"><a href="" className="prev">이전</a></li>
                <li><a href="" className="cur">1</a></li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li><a href="">4</a></li>
                <li><a href="">5</a></li>
                <li className="btn"><a href="" className="next">다음</a></li>
                <li className="btn"><a href="" className="last">마지막</a></li>
            </ul>
        </div>
    );
}

export default EgovPaging;