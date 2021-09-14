import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SERVER_URL } from 'context/config';

import CODE from 'context/code';
//import * as EgovNet from 'context/egovFetch';

class EgovLoginContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 'default'
            , password: 'default'
            , userSe: 'USR'
            , loginVO: null
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
        this.submitFormHandler = this.submitFormHandler.bind(this);
    }

    inputFormHandler(e) {
        console.log("=====> inputFormHandler");
        //e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    submitFormHandler(e) {
        console.log("=====> submitFormHandler");
        e.preventDefault();
        //this.setState({ [e.target.name]: e.target.value });
        //fetch('list.json')

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            origin : SERVER_URL,
            credentials : 'include',
            body: JSON.stringify({
                id: this.state.id,
                password: this.state.password,
                userSe: this.state.userSe
            })
        }

        console.log("requestOptions.body : ", requestOptions.body);
        fetch(SERVER_URL + '/uat/uia/actionLoginAPI.do', requestOptions)
            .then(function (response) {
                console.log("===>>> response = ", response);
                console.log("===>>> response.headers = ", response.headers);
                //console.log("===>>> json 1 = "+response.json());
                return response.json();
            })
            .then(function (json) {
                console.log("===>>> json = " ,json);
                
                var resultVO = json.resultVO;
                var resultCode = json.resultCode;

                if(resultCode === CODE.SUCCESS){
                    this.setState({ loginVO: resultVO });
                    this.props.onChangeLogin({ loginVO: resultVO });
                    this.props.history.push('/');
                } else {
                    alert(json.resultMessage)
                }

            }.bind(this))
            .catch(error => {
                if(error === 'TypeError: Failed to fetch'){
                    alert("서버와의 연결이 원활하지 않습니다. 서버를 확인하세요.");
                }
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    componentDidMount() {
        console.log("===>>> componentDidMount 1");

        console.log("===>>> componentDidMount 2");
    }

    render() {
        return (
            <div className="contents" id="contents">
                {/* <!-- 본문 --> */}
                <div className="Plogin">
                    <h1>로그인</h1>
                    <p className="txt">전자정부표준프레임워크 경량환경 홈페이지 로그인 페이지입니다.<br />로그인을 하시면 모든 서비스를 제한없이 이용하실 수 있습니다.</p>

                    <div className="login_box">
                        <form name="" method="" action="" >
                            <fieldset>
                                <legend>로그인</legend>
                                <span className="group">
                                    <input type="text" name="" title="아이디" placeholder="아이디" 
                                        onChange={ e => this.setState({id: e.target.value})}/>
                                    <input type="password" name="" title="비밀번호" placeholder="비밀번호" 
                                        onChange={ e => this.setState({password: e.target.value})}/>
                                </span>
                                <div className="chk">
                                    <label className="f_chk" htmlFor="saveid">
                                        <input type="checkbox" name="" id="saveid" /> <em>ID저장</em>
                                    </label>
                                </div>
                                {/* <button type="button" onClick={submitFormHandler}><span>LOGIN</span></button> */}
                                <button type="button" onClick={this.submitFormHandler}><span>LOGIN</span></button>
                            </fieldset>
                        </form>
                    </div>

                    <ul className="list">
                        <li>비밀번호는 6~12자의 영문 대/소문자, 숫자, 특수문자를 혼합해서 사용하실 수 있습니다.</li>
                        <li>쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우, 도용되기 쉬우므로 주기적으로
                            변경하셔서 사용하는 것이 좋습니다.</li>
                    </ul>
                </div>
                {/* <!--// 본문 --> */}
            </div>
        );
    }
}

export default withRouter(EgovLoginContent);