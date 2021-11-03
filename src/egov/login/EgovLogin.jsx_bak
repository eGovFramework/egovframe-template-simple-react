import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import EgovLoginContent from 'egov/login/EgovLoginContent';

import URL from 'context/url';

class EgovLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginVO: null
        }
    }

    render() {
        return (
            <div className="container">
                <div className="c_wrap">
                    {/* <!-- Location --> */}
                    <div className="location">
                        <ul>
                            <li><Link to={URL.MAIN} className="home" href="">Home</Link></li>
                            <li>로그인</li>
                        </ul>
                    </div>
                    {/* <!--// Location --> */}

                    <div className="layout">
                        <EgovLoginContent
                            onChangeLogin={
                                function (_loginVO) {
                                    console.log("EgovLogin is = " , _loginVO);
                                    this.setState(_loginVO);
                                    this.props.onChangeLogin(_loginVO);
                                    console.log("EgovLogin JSON = ", this.state.loginVO);
                                }.bind(this)}></EgovLoginContent>
                    </div>
                </div>
            </div>
        );
    }
}

export default EgovLogin;