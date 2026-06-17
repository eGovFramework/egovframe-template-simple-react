import { Link } from "react-router-dom";

import logoFooterImg from "/assets/images/logo_footer_w.png";
import logoFooterImgMobile from "/assets/images/logo_footer_m.png";
import bannerImg_01 from "/assets/images/banner_w_01.png";
import bannerImgMobile_01 from "/assets/images/banner_m_01.png";
import bannerImg_02 from "/assets/images/banner_w_02.png";
import bannerImgMobile_02 from "/assets/images/banner_m_02.png";

function EgovFooter() {
  return (
    <div className="footer">
      <div className="inner">
        <h1>
          <Link to="">
            <img className="w" src={logoFooterImg} alt="" />
            <img className="m" src={logoFooterImgMobile} alt="" />
          </Link>
        </h1>
        <div className="info">
          <p>
            대표문의메일 : egovframeexample@gmail.com{" "}
            <span className="m_hide">|</span>
            <br className="m_show" /> 대표전화 : 0000-0000 (000-0000-0000)
            <br />
            호환성확인 : 000-0000-0000 | 교육문의 : 0000-0000-0000
          </p>
          <p className="copy">
            Copyright © 2021 Ministry Of The Interior And Safety. All Rights
            Reserved.
          </p>
        </div>
        <div className="right_col">
          <Link to="">
            <img className="w" src={bannerImg_01} alt="" />
            <img className="m" src={bannerImgMobile_01} alt="" />
          </Link>
          <Link to="">
            <img className="w" src={bannerImg_02} alt="" />
            <img className="m" src={bannerImgMobile_02} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EgovFooter;
