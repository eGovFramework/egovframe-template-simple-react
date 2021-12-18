import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';
import URL from 'constants/url';
import CODE from 'constants/code';

import { default as EgovLeftNav } from 'components/leftmenu/EgovLeftNavInform';
import EgovPaging from 'components/EgovPaging';
import EgovAttachFile from 'components/EgovAttachFile';

function EgovViewTemplate(props) {
    console.group("EgovViewTemplate");
    console.log("[Start] EgovViewTemplate ------------------------------");
    console.log("EgovViewTemplate [props] : ", props);

    const history = useHistory();
    console.log("EgovViewTemplate [history] : ", history);

    useEffect(() => {
        return () => {
        }
    }, []);

    console.log("------------------------------EgovViewTemplate [End]");
    console.groupEnd("EgovViewTemplate");
    return (
        <div className="container">
            <div className="c_wrap">

            </div>
        </div>
    );
}

export default EgovViewTemplate;