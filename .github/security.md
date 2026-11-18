# 보안 정책 / Security Policy

표준프레임워크 센터는 본 프로젝트의 보안 이슈를 중요하게 다루며, 책임 있는 제보를 환영합니다.  
The eGovFrame Center takes security issues seriously and welcomes responsible disclosure.

의심되는 보안 취약점은 공개 GitHub Issue, Pull Request, Discussion 또는 기타 공개 채널에 게시하지 말아 주시기 바랍니다.  
Please do not disclose suspected security vulnerabilities through public GitHub Issues, Pull Requests, Discussions, or any other public channels.

---

## 지원 대상 버전 / Supported Versions

다음 버전은 현재 본 보안 정책의 적용 대상입니다.  
The following versions are currently covered by this security policy.

| 버전 / Version | 지원 여부 / Supported |
| --- | --- |
| `main` | 지원 / Supported |
| 이전 브랜치 또는 레거시 릴리스 / Previous branches or legacy releases | 미지원 / Not supported |

보안 수정은 현재 유지보수 중인 코드 라인을 기준으로 검토 및 반영됩니다.  
Security fixes are reviewed and applied based on the currently maintained code line.

---

## 취약점 제보 방법 / Reporting a Vulnerability

이 저장소에서 보안 취약점을 발견하셨다고 판단되는 경우, 비공개 채널을 통해 제보해 주시기 바랍니다.  
If you believe you have discovered a security vulnerability in this repository, please report it through a private channel.

### 우선 권장하는 방법 / Preferred Reporting Method

가능한 경우, 본 저장소의 GitHub Private Vulnerability Reporting 기능을 이용해 제보해 주시기 바랍니다.  
If available, please use this repository’s GitHub Private Vulnerability Reporting feature to submit your report.

### 대체 방법 / Alternative Reporting Method

비공개 제보 기능을 사용할 수 없는 경우에는 아래 이메일로 제보해 주시기 바랍니다.  
If private reporting is not available, please report the issue by email.

- **egovframesupport@gmail.com**

---

## 제보 시 포함 사항 / What to Include in a Report

신속한 검토와 대응을 위해 가능한 범위에서 아래 정보를 함께 제공해 주시기 바랍니다.  
To help us review and address the issue efficiently, please include the following information whenever possible.

- 취약점에 대한 명확한 설명  
  A clear description of the vulnerability
- 영향받는 컴포넌트, 패키지, 모듈 또는 파일  
  The affected component, package, module, or file
- 영향받는 브랜치, 버전 또는 배포 조건  
  The affected branch, version, or deployment condition
- 재현에 필요한 환경, 설정 또는 전제조건  
  Environment, configuration, or preconditions required for reproduction
- 단계별 재현 절차  
  Step-by-step reproduction instructions
- 가능한 경우 PoC 코드, 요청 예시 또는 페이로드  
  Proof-of-concept code, sample requests, or payloads if available
- 예상되는 보안 영향  
  The expected security impact
- 알고 있는 경우 권고하는 완화 방안 또는 수정 방향  
  Suggested mitigations or remediation ideas, if known

취약점이 검토되고 필요한 조치가 마련되기 전에는 관련 세부 내용을 공개하지 말아 주시기 바랍니다.  
Please do not publicly disclose technical details before the issue has been reviewed and appropriate action has been prepared.

---

## 협조적 공개 원칙 / Coordinated Disclosure

제보자는 협조적 취약점 공개 원칙을 따라 주시기 바랍니다.  
We ask reporters to follow the principles of coordinated vulnerability disclosure.

다음 중 하나가 충족되기 전까지는 기술적 세부사항, 공격 절차, PoC 코드 또는 영향받는 경로 등을 공개하지 말아 주시기 바랍니다.  
Please do not disclose technical details, exploitation procedures, proof-of-concept code, or affected paths until one of the following conditions is met.

- 제보 내용에 대한 검토가 완료된 경우  
  The report has been reviewed
- 수정 또는 완화 방안이 준비된 경우  
  A fix or mitigation has been prepared
- 공개 시점에 대해 상호 협의가 이루어진 경우  
  A disclosure timeline has been mutually agreed upon

표준프레임워크 센터는 유효한 제보에 대해 합리적인 범위 내에서 신속히 조사하고 대응할 수 있도록 노력합니다.  
The eGovFrame Center will make reasonable efforts to investigate and respond promptly to valid reports.

---

## 대응 절차 / Response Process

비공개 제보를 받은 후 일반적으로 다음 절차에 따라 대응합니다.  
After receiving a private report, we generally follow the process below.

1. 영업일 기준 5일 이내 접수 확인  
   Acknowledge receipt within 5 business days
2. 제보 내용 검토 및 유효성 확인  
   Review the report and validate the issue
3. 필요한 경우 추가 정보 요청  
   Request additional information if needed
4. 영향도 및 대응 방향 검토  
   Assess impact and determine a response plan
5. 가능한 경우 수정, 완화책 또는 우회방안 마련  
   Prepare a fix, mitigation, or workaround where possible
6. 필요 시 공개 시점 협의  
   Coordinate disclosure timing when appropriate

실제 대응 및 수정 일정은 취약점의 심각도, 복잡도 및 유지보수 여건에 따라 달라질 수 있습니다.  
Actual response and remediation timelines may vary depending on severity, complexity, and maintenance conditions.

---

## 적용 범위 / Scope

본 정책은 현재 유지보수 중인 이 저장소의 코드베이스에 존재하는 보안 취약점에 적용됩니다.  
This policy applies to security vulnerabilities in the currently maintained codebase of this repository.

예를 들어 다음과 같은 항목은 보안 이슈 범위에 포함될 수 있습니다.  
Examples of issues that may fall within scope include:

- 인증 및 인가 로직의 취약점  
  Authentication and authorization flaws
- 접근제어 또는 권한 처리 오류  
  Access control or permission handling errors
- 인젝션 또는 원격 악용으로 이어질 수 있는 입력값 검증 실패  
  Input validation failures leading to injection or remote exploitation
- 민감정보 노출  
  Exposure of sensitive information
- 유지보수 중인 코드의 안전하지 않은 기본 설정  
  Insecure defaults in maintained code
- 프로젝트의 통합 또는 사용 방식으로 인해 발생하는 보안 위험  
  Security risks caused by the project’s integration or usage patterns

다만 아래 항목은 일반적으로 보안 제보 범위에 포함되지 않습니다. 단, 유지보수 중인 프로젝트 코드에 직접적인 보안 영향을 주는 경우는 예외로 할 수 있습니다.  
The following are generally out of scope, unless they directly create a security impact in maintained project code.

- 일반적인 보안 강화 권고  
  General hardening recommendations
- 실제 취약점으로 입증되지 않은 모범사례 수준의 제안  
  Best-practice suggestions not demonstrated as actual vulnerabilities
- 지원 종료 버전 또는 레거시 버전에만 해당하는 문제  
  Issues affecting only unsupported or legacy versions
- 프로젝트 고유의 추가 위험이 없는 서드파티 의존성 자체의 취약점  
  Third-party dependency vulnerabilities without additional project-specific risk
- 일반 기능 오류 또는 비보안성 버그  
  Functional defects or non-security bugs

---

## 공개 이슈 등록 관련 / Public Issue Reporting

의심되는 보안 취약점은 공개 GitHub Issue로 등록하지 말아 주시기 바랍니다.  
Please do not report suspected security vulnerabilities through public GitHub Issues.

공개 이슈는 다음과 같은 경우에만 사용해 주시기 바랍니다.  
Public issues should only be used for the following:

- 본 보안 정책에 대한 질문  
  Questions about this security policy
- 민감하지 않은 보안 절차 관련 문의  
  Non-sensitive questions about security processes
- 취약점 수정 및 공개 이후의 후속 논의  
  Follow-up discussion after a vulnerability has been fixed and disclosed

---

## 제보자 표시 및 공개 / Reporter Credit and Disclosure

책임 있는 제보에 감사드립니다.  
We appreciate responsible vulnerability reporting.

적절하다고 판단되고 제보자의 동의가 있는 경우, 공개 Advisory, 릴리스 노트 또는 관련 문서에 제보자를 명시할 수 있습니다.  
Where appropriate and with the reporter’s consent, we may acknowledge the reporter in a public advisory, release note, or related documentation.

필요한 경우, 취약점 공개 및 식별자 부여 절차는 별도로 검토될 수 있습니다.  
Where appropriate, vulnerability disclosure and identifier assignment procedures may be reviewed separately.

---

## 정책 변경 / Policy Updates

본 보안 정책은 유지보수 상태, 제보 절차 또는 저장소 운영 방식의 변경에 따라 수정될 수 있습니다.  
This security policy may be updated from time to time to reflect changes in maintenance status, reporting procedures, or repository operations.
