# 개발환경 초기화 Initialization

본 문서는 CRA(create-react-app)를 통해 처음 프로젝트를 생성하려고 할때 필요한 내용을 기술하였음.

## React 개발환경 초기화

### 1. 프로젝트 생성

```bash
npx create-react-app <프로젝트명>
cd <프로젝트명>
```

### 2. 생성 확인

```bash
npm start
```

### 3. 필요없는 파일 및 소스 삭제

구현에 필요 없는 파일 및 소스들을 삭제한다



## 개발 세팅

### 환경변수 설정

- 최상위 디렉토리에 ```.env.development``` 파일을 만들어 준다.

- ```REACT_APP```으로 시작하는 key 값과 Value 값을 정해주고

js 에서 `process.env.<키명> 으로 불러와 지는지 확인 한다.





