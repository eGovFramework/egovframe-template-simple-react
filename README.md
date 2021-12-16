# 표준프레임워크 심플홈페이지 FrontEnd

## 환경 설정

> 프로젝트에서 사용된 환경 프로그램 정보는 다음과 같다.

| 프로그램 명 | 버전 명 |
| :---------- | ------: |
| Node.js     |  v14.16 |
| NPM         | v7.20.0 |

<br />

## BackEnd 구동

> [심플 홈페이지 Backend](https://github.com/eGovFramework/egovframe-template-simple-backend.git) 소스를 받아 구동한다.

<br />

## FrontEnd 구동

> 아래 1 ~ 3의 과정을 따라서 진행한다.

<br />

### 1. 프로젝트 복제 및 모듈 설치

```bash
# 프로젝트 저장소를 로컬로 복제
git clone https://github.com/hmmhmmhm/egovframe-template-simple-react.git

# 복제된 프로젝트 폴더로 이동
cd egovframe-template-simple-react

# 모듈 종속성 갱신 없이 프로젝트에 모듈을 설치
npm ci
```

<br />

### 2. 백엔드 프로젝트 설정

- 구동된 BackeEnd 서버의 URL을 본 어플리케이션의 `.env.development` 파일의 `REACT_APP_EGOV_CONTEXT_URL`에 설정해 준다. <br />
  (단, 개발환경에서는 사용하는 환경변수 정보는 `.env.development`, build 시 사용하는 환경변수는 `.env.production` 에 기입해 준다.)

```bash
# .env.development 예시
REACT_APP_EGOV_CONTEXT_URL=localhost:8080
```

<br />

### 3. 프로젝트 실행 및 기타 명령어

```bash
# 테스트용 리액트 서버를 실행할 때 아래 명령어를 사용한다.
npm start

# 리액트를 테스트할 때 아래 명령어를 사용한다.
npm test

# 리액트를 빌드할 때 아래 명령어를 사용한다.
npm run build
```

<br />

---

<br />

### 참조

> 보다 상세한 설명은 아래의 문서를 확인한다.

1. [Available scripts in RCA](./doc/create_react_app_script.md)
2. [개발환경 초기 설정](./doc/Development_Env_Setting.md)
