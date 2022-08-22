import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import URL from 'constants/url';
import CODE from 'constants/code';

//COMMON
import EgovHeader from 'components/EgovHeader';
import EgovFooter from 'components/EgovFooter';
import EgovInfoPopup from 'components/EgovInfoPopup';
import EgovError from 'components/EgovError';

import EgovMain from 'pages/main/EgovMain';
import EgovLogin from 'pages/login/EgovLogin';

//ABOUT
import EgovAboutSite from 'pages/about/EgovAboutSite';
import EgovAboutHistory from 'pages/about/EgovAboutHistory';
import EgovAboutOrganization from 'pages/about/EgovAboutOrganization';
import EgovAboutLocation from 'pages/about/EgovAboutLocation';

//INTRO
import EgovIntroWork from 'pages/intro/EgovIntroWork';
import EgovIntroService from 'pages/intro/EgovIntroService';

//SUPPORT
import EgovSupportDownloadList from 'pages/support/download/EgovDownloadList';
import EgovSupportDownloadDetail from 'pages/support/download/EgovDownloadDetail';
import EgovSupportDownloadCreate from 'pages/support/download/EgovDownloadCreate';
import EgovSupportQnaList from 'pages/support/qna/EgovQnaList';
import EgovSupportQnaDetail from 'pages/support/qna/EgovQnaDetail';
import EgovSupportApply from 'pages/support/apply/EgovSupportApply';

//INFORM
import EgovDailyList from 'pages/inform/daily/EgovDailyList';
import EgovDailyDetail from 'pages/inform/daily/EgovDailyDetail';
import EgovWeeklyList from 'pages/inform/weekly/EgovWeeklyList';

import EgovNoticeList from 'pages/inform/notice/EgovNoticeList';
import EgovNoticeDetail from 'pages/inform/notice/EgovNoticeDetail';
import EgovNoticeEdit from 'pages/inform/notice/EgovNoticeEdit';

import EgovGalleryList from 'pages/inform/gallery/EgovGalleryList';
import EgovGalleryDetail from 'pages/inform/gallery/EgovGalleryDetail';
import EgovGalleryEdit from 'pages/inform/gallery/EgovGalleryEdit';

//ADMIN
import EgovAdminScheduleList from 'pages/admin/schedule/EgovAdminScheduleList';
import EgovAdminScheduleDetail from 'pages/admin/schedule/EgovAdminScheduleDetail';
import EgovAdminScheduleEdit from 'pages/admin/schedule/EgovAdminScheduleEdit';

import EgovAdminTemplateList from 'pages/admin/template/EgovAdminTemplateList';
import EgovAdminTemplateEdit from 'pages/admin/template/EgovAdminTemplateEdit';

import EgovAdminBoardList from 'pages/admin/board/EgovAdminBoardList';
import EgovAdminBoardEdit from 'pages/admin/board/EgovAdminBoardEdit';

import EgovAdminUsageList from 'pages/admin/usage/EgovAdminUsageList';
import EgovAdminUsageEdit from 'pages/admin/usage/EgovAdminUsageEdit';

import EgovAdminNoticeList from 'pages/admin/notice/EgovAdminNoticeList';
import EgovAdminNoticeDetail from 'pages/admin/notice/EgovAdminNoticeDetail';
import EgovAdminNoticeEdit from 'pages/admin/notice/EgovAdminNoticeEdit';

import EgovAdminGalleryList from 'pages/admin/gallery/EgovAdminGalleryList';
import EgovAdminGalleryDetail from 'pages/admin/gallery/EgovAdminGalleryDetail';
import EgovAdminGalleryEdit from 'pages/admin/gallery/EgovAdminGalleryEdit';

import initPage from 'js/ui';

const Routes = (props) => {
  const [loginVO, setLoginVO] = useState({});

  useEffect(() => {
    initPage();
  });

  return (
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
  )
}

export default Routes;
