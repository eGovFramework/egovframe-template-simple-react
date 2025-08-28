# TypeScript 지원 가이드

전자정부 표준프레임워크 React 템플릿에서 TypeScript를 사용하는 방법을 설명합니다.

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── EgovHeader.jsx   # 공통 헤더
│   ├── EgovFooter.jsx   # 공통 푸터  
│   ├── EgovPaging.jsx   # 페이징 컴포넌트
│   └── TypeScriptExample.tsx  # TypeScript 예제
├── pages/               # 페이지 컴포넌트
├── types/               # TypeScript 타입 정의
│   ├── common.ts        # 공통 타입들
│   ├── api.ts           # API 관련 타입들
│   ├── env.d.ts         # 환경변수 타입
│   └── index.ts         # 타입 export
├── utils/               # 유틸리티 함수들
├── api/                 # API 통신 관련
└── assets/              # 정적 파일들
```

## 1. 개요

이 프로젝트는 **점진적 TypeScript 도입**을 지원하도록 설계하였습니다
- 기존 JavaScript/JSX 파일들은 그대로 유지
- 새로운 파일은 TypeScript로 작성 가능
- 기존 파일을 필요에 따라 TypeScript로 마이그레이션

## 2. TypeScript 설정

### tsconfig.json
프로젝트 루트의 `tsconfig.json`에 TypeScript 설정이 정의되어 있습니다.

주요 설정:
- **Target**: ES2020
- **Module**: ESNext (Vite 호환)
- **JSX**: react-jsx
- **Path Mapping**: `@/*` → `src/*`
- **Strict Mode**: 활성화 (타입 안전성 보장)

### Vite 설정
`vite.config.js`에서 TypeScript 파일을 자동으로 처리합니다:
- `.ts`, `.tsx` 파일 지원
- JSX in TypeScript 지원
- Hot Module Replacement 지원

## TypeScript 사용법

### a. 새 컴포넌트 작성

```tsx
// src/components/MyComponent.tsx
import React from 'react';
import type { EgovComponentProps } from '@/types';

interface MyComponentProps extends EgovComponentProps {
  title: string;
  count?: number;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  count = 0, 
  onClick,
  className = '',
  style = {}
}) => {
  const [localCount, setLocalCount] = React.useState<number>(count);

  return (
    <div className={className} style={style}>
      <h3>{title}</h3>
      <p>Count: {localCount}</p>
      <button onClick={() => setLocalCount(prev => prev + 1)}>
        Increment
      </button>
      {onClick && (
        <button onClick={onClick}>
          Custom Action
        </button>
      )}
    </div>
  );
};

export default MyComponent;
```

### b. 타입 Import 사용

```tsx
import type { 
  PaginationInfo, 
  LoginUser, 
  Board, 
  ListRequestParams 
} from '@/types';

// 또는 개별 import
import type { PaginationInfo } from '@/types/common';
import type { ListRequestParams } from '@/types/api';
```

### c. API 호출 시 타입 사용

```tsx
import type { ListResponse, Board, ListRequestParams } from '@/types';

const fetchBoardList = async (params: ListRequestParams): Promise<ListResponse<Board>> => {
  const response = await fetch('/api/boards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  
  return response.json();
};
```

## 3. 제공되는 타입들

### 공통 타입 (`@/types/common`)
- `PaginationInfo`: 페이징 정보
- `LoginUser`: 로그인 사용자 정보  
- `Board`: 게시판 기본 타입
- `Notice`: 공지사항 타입
- `AttachFile`: 첨부파일 타입
- `EgovComponentProps`: 공통 컴포넌트 Props

### API 타입 (`@/types/api`)
- `HttpMethod`: HTTP 메서드
- `ListRequestParams`: 목록 조회 요청 파라미터
- `ListResponse<T>`: 목록 조회 응답
- `LoginRequest`: 로그인 요청
- `LoginResponse`: 로그인 응답

### 환경변수 타입 (`@/types/env.d.ts`)
- `ImportMetaEnv`: Vite 환경변수 타입 정의

## 🛠️ 스크립트 명령어

```bash
# 개발 서버 실행
npm run dev

# TypeScript 타입 체크 (컴파일 없이)
npm run type-check

# 프로덕션 빌드 (TypeScript 컴파일 포함)
npm run build

# ESLint 실행 (JavaScript + TypeScript)
npm run lint

# ESLint 자동 수정
npm run lint:fix

# 테스트 실행
npm run test
```

## 4. 마이그레이션 가이드

### 기존 JSX 파일을 TSX로 변환하기

a. **파일 확장자 변경**: `.jsx` → `.tsx`

b. **Props 타입 정의**:
   ```tsx
   // Before (JSX)
   function MyComponent(props) {
     return <div>{props.title}</div>;
   }

   // After (TSX)  
   interface MyComponentProps {
     title: string;
   }

   function MyComponent({ title }: MyComponentProps) {
     return <div>{title}</div>;
   }
   ```

c. **useState 타입 추가**:
   ```tsx
   // Before
   const [count, setCount] = useState(0);

   // After
   const [count, setCount] = useState<number>(0);
   ```
d. **이벤트 핸들러 타입**:
   ```tsx
   // Before
   const handleClick = (e) => { ... };

   // After
   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };
   ```



## 예제 컴포넌트

`src/components/TypeScriptExample.tsx` 파일에서 TypeScript 사용 예제를 확인할 수 있습니다.


## ESLint 설정
TypeScript 전용 ESLint 규칙이 적용됩니다:
- `@typescript-eslint/no-unused-vars`: 사용하지 않는 변수 경고
- `@typescript-eslint/no-explicit-any`: any 타입 사용 경고
