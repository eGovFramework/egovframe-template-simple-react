# 테스트 계획서 (TEST_PLAN)

## 프로젝트 개요
- **프로젝트명**: eGovFrame React 템플릿
- **테스트 대상**: React 기반 전자정부 프레임워크 템플릿
- **테스트 스택**: **Vitest**, React Testing Library, Playwright(E2E)
- **런타임/빌드**: Node.js 18+, npm

## 테스트 전략
### 1) 단위 테스트 (Unit)
- **도구**: **Vitest**, React Testing Library
- **대상**: 컴포넌트/훅/유틸
- **커버리지 목표**: Statements/Lines/Functions **≥ 80%**, Branches **≥ 75%**

### 2) 통합 테스트 (Integration)
- 컴포넌트 간 상호작용, 라우팅, 상태 관리, API 경계부

### 3) E2E (End-to-End)
- **도구**: Playwright
- **대상**: 핵심 사용자 시나리오
- **환경**: 로컬/스테이징

## 테스트 범위 체크리스트
### 컴포넌트
- [ ] Header
- [ ] Navigation
- [ ] Footer
- [ ] Main 페이지
- [ ] 공통 UI

### 기능
- [ ] 라우팅
- [ ] 상태 관리
- [ ] API 호출
- [ ] 폼 검증
- [ ] 에러 핸들링

### 접근성
- [ ] ARIA 레이블
- [ ] 키보드 내비게이션
- [ ] 스크린 리더 호환

## 실행 방법
### 단위/통합
```bash
npm test                 # Vitest 실행
npm run test:watch       # 변경 감시
npm run test:coverage    # 커버리지 포함 실행
```

### E2E (Playwright)
```bash
npm run test:e2e
npm run test:e2e:ui
```

### 품질/빌드
```bash
npm run build
npm run lint
```

## 테스트 결과
### 현재 상태 (2024-08-27)
- **총 테스트 수**: 22개
- **통과율**: 100% (22/22)
- **E2E 설정**: 완료

### 커버리지 목표
| 구분 | 목표 |
|------|------|
| Statements | ≥ 80% |
| Branches | ≥ 75% |
| Functions | ≥ 80% |
| Lines | ≥ 80% |

## 빌드 성공

## 참고
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Playwright: https://playwright.dev/
- 전자정부 프레임워크: https://www.egovframe.go.kr/