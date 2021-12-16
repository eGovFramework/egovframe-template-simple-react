# 표준프레임워크 심플홈페이지 FrontEnd

## 환경 설정 
nodeJs : v14.16
npm : 7.20.0

## BackEnd 구동

[심플홈페이지Backend](https://github.com/eGovFramework/egovframe-template-simple-backend.git) 소스를 받아 구동한다.

## FrontEnd 구동

FrontEnd 서버를 구동하기전 node modules를 설치해 준다.
> npm install 

구동된 BackEnd 서버의 URL을 본 어플리케이션의 .env.development 파일의  REACT_APP_EGOV_CONTEXT_URL에 설정해 준다.\
(단, 개발환경에서는 사용하는 환경변수 정보는 .env.development, build 시 사용하는 환경변수는 .env.production 에 기입해 준다.)\
ex) REACT_APP_EGOV_CONTEXT_URL=localhost:8080
> npm start


=======================================================

참조

1. [Available scripts in CRA](./doc/create_react_app_script.md)
2. [개발환경 초기 설정](./doc/Development_Env_Setting.md)

