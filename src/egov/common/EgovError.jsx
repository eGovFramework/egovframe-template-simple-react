import React from 'react';
import { useHistory } from 'react-router-dom';
import debug from 'debug';
const log = debug('egov:EgovError');

const EgovError = (props) => {
  const history = useHistory();
  log({ history });

  const errormessage = props.errormessage || '알 수 없는 에러가 발생했습니다.';

  return (
    <div className="ERROR">
      <h1>Error</h1>
      <div className="box">
        <p>{errormessage}</p>
        <div className="btn_area">
          <button className="btn btn_blue_h46 w_130" onClick={() => history.goBack()}>
            이전페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default EgovError;
