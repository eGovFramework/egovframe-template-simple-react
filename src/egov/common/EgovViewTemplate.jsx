import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'egov/common/EgovPaging';
import EgovAttachFile from 'egov/common/EgovAttachFile';

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