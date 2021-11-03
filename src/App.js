import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import URL from 'context/url';
import CODE from 'context/code';

//COMMON
import EgovHeader from 'egov/common/EgovHeader';
import EgovFooter from 'egov/common/EgovFooter';
import EgovInfoPopup from 'egov/common/EgovInfoPopup';
import EgovError from 'egov/common/EgovError';

import EgovMain from 'egov/main/EgovMain';
import EgovLogin from 'egov/login/EgovLogin';

//ABOUT
import EgovAboutSite from 'egov/about/EgovAboutSite';
import EgovAboutHistory from 'egov/about/EgovAboutHistory';
import EgovAboutOrganization from 'egov/about/EgovAboutOrganization';
import EgovAboutLocation from 'egov/about/EgovAboutLocation';

//INTRO
import EgovIntroWork from 'egov/intro/EgovIntroWork';
import EgovIntroService from 'egov/intro/EgovIntroService';

//SUPPORT
import EgovSupportDownloadList from 'egov/support/download/EgovDownloadList';
import EgovSupportDownloadDetail from 'egov/support/download/EgovDownloadDetail';
import EgovSupportDownloadCreate from 'egov/support/download/EgovDownloadCreate';
import EgovSupportQnaList from 'egov/support/qna/EgovQnaList';
import EgovSupportQnaDetail from 'egov/support/qna/EgovQnaDetail';
import EgovSupportApply from 'egov/support/apply/EgovSupportApply';

//INFORM
import EgovDailyList from 'egov/inform/daily/EgovDailyList';
import EgovDailyDetail from 'egov/inform/daily/EgovDailyDetail';
import EgovWeeklyList from 'egov/inform/weekly/EgovWeeklyList';

import EgovNoticeList from 'egov/inform/notice/EgovNoticeList';
import EgovNoticeDetail from 'egov/inform/notice/EgovNoticeDetail';
import EgovNoticeEdit from 'egov/inform/notice/EgovNoticeEdit';

import EgovGalleryList from 'egov/inform/gallery/EgovGalleryList';
import EgovGalleryDetail from 'egov/inform/gallery/EgovGalleryDetail';
import EgovGalleryEdit from 'egov/inform/gallery/EgovGalleryEdit';

//ADMIN
import EgovAdminScheduleList from 'egov/admin/schedule/EgovAdminScheduleList';
import EgovAdminScheduleDetail from 'egov/admin/schedule/EgovAdminScheduleDetail';
import EgovAdminScheduleEdit from 'egov/admin/schedule/EgovAdminScheduleEdit';

import EgovAdminTemplateList from 'egov/admin/template/EgovAdminTemplateList';
import EgovAdminTemplateEdit from 'egov/admin/template/EgovAdminTemplateEdit';

import EgovAdminBoardList from 'egov/admin/board/EgovAdminBoardList';
import EgovAdminBoardEdit from 'egov/admin/board/EgovAdminBoardEdit';

import EgovAdminUsageList from 'egov/admin/usage/EgovAdminUsageList';
import EgovAdminUsageEdit from 'egov/admin/usage/EgovAdminUsageEdit';

import EgovAdminNoticeList from 'egov/admin/notice/EgovAdminNoticeList';
import EgovAdminNoticeDetail from 'egov/admin/notice/EgovAdminNoticeDetail';
import EgovAdminNoticeEdit from 'egov/admin/notice/EgovAdminNoticeEdit';

import EgovAdminGalleryList from 'egov/admin/gallery/EgovAdminGalleryList';
import EgovAdminGalleryDetail from 'egov/admin/gallery/EgovAdminGalleryDetail';
import EgovAdminGalleryEdit from 'egov/admin/gallery/EgovAdminGalleryEdit';

import './js/ui';

import './css/base.css';
import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './css/response.css';

function App() {
  const [loginVO, setLoginVO] = useState({});
  return (
    <div className="wrap">
      <Switch>
        <Route exact path={URL.ERROR} component={EgovError} />
        <Route>
          <EgovHeader
            loginUser={loginVO}
            onChangeLogin={(user) => setLoginVO(user)}
          ></EgovHeader>
          <Switch>
            {/* MAIN */}
            <Route exact path={URL.MAIN} component={EgovMain} />

            {/* LOGIN */}
            <Route exact path={URL.LOGIN}>
              <EgovLogin
                onChangeLogin={(user) => setLoginVO(user)}
              ></EgovLogin>
            </Route>

            {/* ERROR */}
            <Route path={URL.ERROR} component={EgovError} />

            {/* ABOUT */}
            <Redirect exact from={URL.ABOUT} to={URL.ABOUT_SITE} />
            <Route path={URL.ABOUT_SITE} component={EgovAboutSite} />
            <Route path={URL.ABOUT_HISTORY} component={EgovAboutHistory} />
            <Route path={URL.ABOUT_ORGANIZATION} component={EgovAboutOrganization} />
            <Route path={URL.ABOUT_LOCATION} component={EgovAboutLocation} />

            {/* INTRO */}
            <Redirect exact from={URL.INTRO} to={URL.INTRO_WORKS} />
            <Route exact path={URL.INTRO_WORKS} component={EgovIntroWork} />
            <Route exact path={URL.INTRO_SERVICE} component={EgovIntroService} />

            {/* SUPPORT */}
            <Redirect exact from={URL.SUPPORT} to={URL.SUPPORT_DOWNLOAD} />

            <Route exact path={URL.SUPPORT_DOWNLOAD} component={EgovSupportDownloadList} />
            <Route path={URL.SUPPORT_DOWNLOAD_DETAIL} component={EgovSupportDownloadDetail} />
            <Route path={URL.SUPPORT_DOWNLOAD_CREATE} component={EgovSupportDownloadCreate} />

            <Route exact path={URL.SUPPORT_QNA} component={EgovSupportQnaList} />
            <Route exact path={URL.SUPPORT_QNA_DETAIL} component={EgovSupportQnaDetail} />

            <Route exact path={URL.SUPPORT_APPLY} component={EgovSupportApply} />

            {/* INFORM */}
            <Redirect exact from={URL.INFORM} to={URL.INFORM_DAILY} />

            <Route exact path={URL.INFORM_DAILY} component={EgovDailyList} />
            <Route path={URL.INFORM_DAILY_DETAIL} component={EgovDailyDetail} />
            <Route exact path={URL.INFORM_WEEKLY} component={EgovWeeklyList} />
            <Route path={URL.INFORM_WEEKLY_DETAIL} component={EgovDailyDetail} />

            <Route exact path={URL.INFORM_NOTICE} component={EgovNoticeList} />
            <Route path={URL.INFORM_NOTICE_DETAIL} render={() => <EgovNoticeDetail />} />
            <Route path={URL.INFORM_NOTICE_CREATE} render={() => <EgovNoticeEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.INFORM_NOTICE_MODIFY} render={() => <EgovNoticeEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.INFORM_NOTICE_REPLY} render={() => <EgovNoticeEdit mode={CODE.MODE_REPLY} />} />

            <Route exact path={URL.INFORM_GALLERY} component={EgovGalleryList} />
            <Route path={URL.INFORM_GALLERY_DETAIL} render={() => <EgovGalleryDetail />} />
            <Route path={URL.INFORM_GALLERY_CREATE} render={() => <EgovGalleryEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.INFORM_GALLERY_MODIFY} render={() => <EgovGalleryEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.INFORM_GALLERY_REPLY} render={() => <EgovGalleryEdit mode={CODE.MODE_REPLY} />} />

            {/* ADMIN */}
            <Redirect exact from={URL.ADMIN} to={URL.ADMIN_SCHEDULE} />
            <Route exact path={URL.ADMIN_SCHEDULE} component={EgovAdminScheduleList} />
            <Route path={URL.ADMIN_SCHEDULE_DETAIL} component={EgovAdminScheduleDetail} />
            <Route path={URL.ADMIN_SCHEDULE_CREATE} render={() => <EgovAdminScheduleEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_SCHEDULE_MODIFY} render={() => <EgovAdminScheduleEdit mode={CODE.MODE_MODIFY} />} />

            <Route exact path={URL.ADMIN_TEMPLATE} component={() => <EgovAdminTemplateList />} />
            <Route path={URL.ADMIN_TEMPLATE_CREATE} render={() => <EgovAdminTemplateEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_TEMPLATE_MODIFY} render={() => <EgovAdminTemplateEdit mode={CODE.MODE_MODIFY} />} />

            <Route exact path={URL.ADMIN_BOARD} component={() => <EgovAdminBoardList />} />
            <Route path={URL.ADMIN_BOARD_CREATE} render={() => <EgovAdminBoardEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_BOARD_MODIFY} render={() => <EgovAdminBoardEdit mode={CODE.MODE_MODIFY} />} />

            <Route exact path={URL.ADMIN_USAGE} render={() => <EgovAdminUsageList />} />
            <Route path={URL.ADMIN_USAGE_CREATE} render={() => <EgovAdminUsageEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_USAGE_MODIFY} render={() => <EgovAdminUsageEdit mode={CODE.MODE_MODIFY} />} />

            <Route exact path={URL.ADMIN_NOTICE} render={() => <EgovAdminNoticeList />} />
            <Route path={URL.ADMIN_NOTICE_DETAIL} render={() => <EgovAdminNoticeDetail />} />
            <Route path={URL.ADMIN_NOTICE_CREATE} render={() => <EgovAdminNoticeEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_NOTICE_MODIFY} render={() => <EgovAdminNoticeEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.ADMIN_NOTICE_REPLY} render={() => <EgovAdminNoticeEdit mode={CODE.MODE_REPLY} />} />

            <Route exact path={URL.ADMIN_GALLERY} render={() => <EgovAdminGalleryList />} />
            <Route path={URL.ADMIN_GALLERY_DETAIL} render={() => <EgovAdminGalleryDetail />} />
            <Route path={URL.ADMIN_GALLERY_CREATE} render={() => <EgovAdminGalleryEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_GALLERY_MODIFY} render={() => <EgovAdminGalleryEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.ADMIN_GALLERY_REPLY} render={() => <EgovAdminGalleryEdit mode={CODE.MODE_REPLY} />} />

          </Switch>
          <EgovFooter></EgovFooter>
          <EgovInfoPopup></EgovInfoPopup>
        </Route>
      </Switch>

    </div>
  )
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_EGOV_CONTEXT_URL", process.env.REACT_APP_EGOV_CONTEXT_URL);

export default App;
