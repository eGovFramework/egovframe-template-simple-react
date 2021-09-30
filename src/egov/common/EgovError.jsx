import React from 'react';
import { useHistory } from 'react-router-dom';

function EgovError() {
    const history = useHistory();
    console.log("EgovError [history] : ", history);

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="ERROR">
            <h1>Error</h1>
            <div className="box">
                <p>
                    세션이 만료되었습니다.
                </p>
                <div className="btn_area">
                    <button className="btn btn_blue_h46 w_130"
                        onClick={goBack}>이전페이지</button>
                </div>
            </div>
        </div>
    );
}

export default EgovError;