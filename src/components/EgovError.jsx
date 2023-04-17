import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EgovError(prop) { // index.jsx 라우터에서 보내온 이전 페이지 location 객체를 사용한다.
    const navigate = useNavigate();
	const location = useLocation();    

    let errormessage = location.state.msg || "알 수 없는 에러가 발생했습니다.";

    if(errormessage === "No message available") {
        errormessage = "알 수 없는 에러가 발생했습니다.";
    }

    const goBack = () => {
      //에러페이지로 이동하면 헤더가 없어지기 때문에 에러 이전페이지로 돌아갈 때 로딩한 ui.js가 제대로 작동하지 않는다. 그래서, 이전 URL을 재 로딩하는 코드를 추가한다. 
	  navigate(prop.prevUrl.pathname); // porp 속성 값을 이전 URL로 사용한다.
      navigate(0, { replace: true });// 이전 URL을 현재 페이지 인식하고 재 로딩하는 코드.
    }

    return (
        <div className="ERROR">
            <h1>Error</h1>
            <div className="box">
                <p>
                    {errormessage}
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