# 표준프레임워크 심플홈페이지 FrontEnd

![react](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![javascript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![nodejs](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![workflow](https://github.com/eGovFramework/egovframe-template-simple-react/actions/workflows/node.js.yml/badge.svg)

※ 본 프로젝트는 기존 JSP 뷰 방식에서 벗어나 BackEnd와 FrontEnd를 분리하기 위한 예시 파일로 참고만 하시길 바랍니다.

## 프로젝트 소개

### 프로젝트 개요

단순 홈페이지 기능 구현 시 필수적인 부분만 사용 가능하도록 경량화 된 실행환경 제공  
메인 페이지, 사용자 관리, 공지사항 관리, 게시판 관리, 안내 관리 기능을 제공

### 메뉴 구성

![menu_sht_v4](https://github.com/user-attachments/assets/4aad1e74-873a-4ed9-8df9-97958bcccbc8)

## 참고 화면 및 메뉴 설명

### 메인 화면

![sh1](https://github.com/user-attachments/assets/41757fa0-b976-435a-81ac-e163e2846998)

1. 최초 관리자 계정 설정은 **[ 로그인계정 : admin , 로그인암호 : 1 ]** 로 설정되어 있다.
2. 메인 화면 우측 상단의 **회원가입** 버튼을 통해 사용자 계정을 생성 가능하다.
3. 기본 기능이나 예시 메뉴를 실무적으로 추가 커스터마이징하여 활용할 수 있다.

### 로그인 화면

![login](https://github.com/user-attachments/assets/383f7e62-1b31-4726-8c65-785b00c9ec45)

1. 최초 관리자 계정을 통한 로그인이 가능하다.
2. **회원가입** 버튼을 통해 생성한 사용자 계정을 통한 로그인이 가능하다. (사용자 계정은 일부 메뉴 접근이 제한된다)
3. 로그인 창 하단의 소셜 로그인 버튼으로 네이버 및 카카오 계정으로 로그인이 가능하다. 이 경우의 권한은 사용자 계정과 동일하다.
4. 소셜 로그인 기능의 사용을 위해서는 사전에 **[네이버 개발자 센터](https://developers.naver.com/main/)** 및 **[카카오 개발자 센터](https://developers.kakao.com/)** 에서 Client ID와 Client Secret을 발급 받은 후 Callback URL을 프론트엔드와 백엔드 환경 설정 파일에 등록해야 한다.
5. 프론트엔드 환경 설정 파일은 본 애플리케이션의 `.env.development` (개발 환경) 및 `.env.production` (빌드 시 사용) 을 참고한다.
6. 백엔드 환경 설정 파일은 [심플 홈페이지 Backend](https://github.com/eGovFramework/egovframe-template-simple-backend.git) 의 `application.properties` 를 참고한다.
7. 네이버 소셜 로그인에 대한 상세 사항은 **[네이버 로그인 API 문서](https://developers.naver.com/docs/login/api/api.md)** 를 참조 가능하다.
8. 카카오 소셜 로그인에 대한 상세 사항은 **[카카오 로그인 API 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaologin)** 를 참조 가능하다.

### 사이트 소개 화면

![sh2](https://github.com/user-attachments/assets/f7b8a9c7-e6a5-48e2-9cbc-4f590e19365b)

- **해당 화면 및 세부 메뉴 화면은 구성을 위한 샘플페이지가 제공되며 기능은 구현되지 않은 상태입니다.**

1. 세부메뉴 : 사이트소개, 연혁, 조직소개, 찾아오시는 길
2. 기능설명 : 예시 메뉴에 해당하는 항목으로 샘플 페이지 형태로 존재한다.
3. 활용방법 : 각 샘플 페이지에 대한 콘텐츠를 새로 구성하여 활용할 수 있다.

### 정보마당 화면

![sh3](https://github.com/user-attachments/assets/ce639fea-4b3f-4dcb-b00d-39175a9fff91)

- **해당 화면 및 세부 메뉴 화면은 구성을 위한 샘플페이지가 제공되며 기능은 구현되지 않은 상태입니다.**

1. 세부메뉴 : 주요사업 소개, 대표서비스 소개
2. 기능설명 : 예시 메뉴에 해당하는 항목으로 샘플 페이지 형태로 존재한다.
3. 활용방법 : 각 샘플 페이지에 대한 콘텐츠를 새로 구성하여 활용할 수 있다.

### 고객지원 화면

![sh4](https://github.com/user-attachments/assets/177a38d3-d94f-41f3-ac99-0fe0a7a3f806)

- **해당 화면 및 세부 메뉴 화면은 구성을 위한 샘플페이지가 제공되며 기능은 구현되지 않은 상태입니다.**

1. 세부메뉴 : 자료실, 묻고답하기, 서비스신청
2. 기능설명 : 예시 메뉴에 해당하는 항목으로 샘플 페이지 형태로 존재한다.
3. 활용방법 : 각 샘플 페이지에 기능을 추가 개발 후 구성하여 활용할 수 있다.

### 알림마당 화면

![sh5](https://github.com/user-attachments/assets/d45ebbf2-3d0a-4450-a9ea-247495520bc7)

1. 세부메뉴 : 오늘의행사, 금주의행사, 공지사항, 사이트갤러리
2. 기능설명 : 공통컴포넌트 일정관리(부서일정)와 게시판 기능을 커스터마이징하여 사용한다.
3. 활용방법 : 관리자가 등록한 일정정보를 조회하거나 게시물을 조회할 수 있다.

### 사이트관리 화면

![sh6](https://github.com/user-attachments/assets/29c8e651-5d1b-4ad3-bc27-c16a511c5008)

1. 세부메뉴 : 일정관리, 게시판생성관리, 게시판사용관리, 공지사항관리, 사이트갤러리관리, 사이트관리자 암호변경, 회원관리
2. 기능설명 : 공통컴포넌트 일정관리(부서일정)과 게시판 기능을 커스터마이징하여 사용한다.
3. 활용방법 : 관리자로 로그인 한 후 일정정보를 등록하거나 게시물을 등록할 수 있다. (게시판 설정 가능)

## 환경 설정

프로젝트에서 사용된 환경 프로그램 정보는 다음과 같다.

| 프로그램 명 | 버전 명  |
| :---------- | :------- |
| Node.js     | v18.12.0 |
| NPM         | v8.19.2  |

## BackEnd 구동

[심플 홈페이지 Backend](https://github.com/eGovFramework/egovframe-template-simple-backend.git) 소스를 받아 구동한다.

## FrontEnd 구동

아래 1 ~ 3의 과정을 따라서 진행한다.

### 1. 프로젝트의 생성

Git에서 복제하여 설치 시 1-1. 을 참고한다.

#### 1-1. Git에서 프로젝트 복제 및 모듈 설치

Git에서 clone 한다.

```bash
# 프로젝트 저장소를 로컬로 복제
git clone https://github.com/[계정명]/egovframe-template-simple-react.git

# 복제된 프로젝트 디렉토리로 이동
cd egovframe-template-simple-react

# node modules를 설치해 준다.
npm install
```

### 2. 백엔드 프로젝트 설정

구동된 BackEnd 서버의 URL을 본 어플리케이션의 .env.development 파일의 VITE_EGOV_CONTEXT_URL에 설정해 준다.
(단, 개발환경에서는 사용하는 환경변수 정보는 .env.development, build 시 사용하는 환경변수는 .env.production 에 기입해 준다.)

```bash
# .env.development 예시
VITE_APP_EGOV_CONTEXT_URL=localhost:8080
```

### 3. 프로젝트 실행 및 기타 명령어

```bash
# 테스트용 리액트 서버를 실행할 때 아래 명령어를 사용한다.
npm run dev
```

```bash
# 빌드할 때에는 아래 명령어를 사용한다.
npm run build
```

```bash
# 로컬에서 미리보기할 때는 아래 명령어를 사용한다.
npm run preview
```

```bash
# 테스트 대상 파일 경로는 vite.config.js에 명시되어 있으며 디폴트로 EgovMain.jsx의 테스트를 실행한다.
# watch 모드로 테스트를 실행할 경우에는 아래 명령어를 사용한다.
npm run test

# 일회성 테스트를 실행할 경우에는 아래 명령어를 사용한다.
npm run test:run
```

---

### 참조

보다 상세한 설명은 아래의 문서를 확인한다.

1. [vite 공식 가이드 문서(한글)](https://vitejs-kr.github.io/guide/)
2. [개발환경 초기 설정](./Docs/development-env-setting.md)
