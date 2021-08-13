import React, { Component, useEffect, useState } from 'react';
import EgovLoginContent from 'egov/login/EgovLoginContent'

//function EgovLogin() {
class EgovLogin extends Component {
    //const [loginVO,setloginVO] = useState({name:"", id:""});

    // return (
    //     <div className="container">
    //         <div className="c_wrap">
    //             {/* <!-- Location --> */}
    //             <div className="location">
    //                 <ul>
    //                     <li><a className="home" href="">Home</a></li>
    //                     <li>로그인</li>
    //                 </ul>
    //             </div>
    //             {/* <!--// Location --> */}

    //             <div className="layout">
    //                 <EgovLoginContent
    //                     onChangeLogin={
    //                         function (_loginVO) {
    //                             console.log("EgovLogin is = " + _loginVO);
    //                             // this.setState(_loginVO);
    //                             // this.props.onChangeLogin(_loginVO);
    //                             // console.log("EgovLogin JSON = " + JSON.stringify(this.state.loginVO));
    //                         }.bind(this)}></EgovLoginContent>
    //             </div>
    //         </div>
    //     </div>
    // );

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
                            <li><a className="home" href="">Home</a></li>
                            <li>로그인</li>
                        </ul>
                    </div>
                    {/* <!--// Location --> */}

                    <div className="layout">
                        <EgovLoginContent
                            onChangeLogin={
                                function (_loginVO) {
                                    console.log("EgovLogin is = " + _loginVO);
                                    this.setState(_loginVO);
                                    this.props.onChangeLogin(_loginVO);
                                    console.log("EgovLogin JSON = " + JSON.stringify(this.state.loginVO));
                                }.bind(this)}></EgovLoginContent>
                    </div>
                </div>
            </div>
        );
    }
}

export default EgovLogin;