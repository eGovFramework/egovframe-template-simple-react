import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'egov/common/EgovPaging';
import EgovAttachFile from 'egov/common/EgovAttachFile';

import debug from 'debug';
const log = debug('egov:EgovViewTemplate');

const EgovViewTemplate = (props) => {
  log({ props });

  const history = useHistory();
  log({ history });

  return (
    <div className="container">
      <div className="c_wrap"></div>
    </div>
  );
};

export default EgovViewTemplate;
