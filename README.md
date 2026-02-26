# motivation-Maker-web
[Live Demo](https://spark-motivate.vercel.app/)

motivation-Maker-web은 기존 모바일 앱 서비스의 가치를 웹 환경으로 확장하여, 사용자가 감명 깊게 읽은 동기부여 문구를 언제 어디서든 다시 확인하고 관리할 수 있도록 설계된 서비스입니다.

Key Value
 - Cross-Platform Experience: 동일한 NestJS 백엔드를 공유하여 모바일(App)과 웹(Web) 간의 데이터 동기화를 구현, 끊김 없는 사용자 경험을 제공합니다.
 - Personalized Archive: 단순 조회를 넘어, 사용자별 즐겨찾기 기능을 통해 나만의 동기부여 아카이브를 구축할 수 있습니다.
 - Global Accessibility: 다국어 지원 기능을 통해 글로벌 사용자들이 각자의 언어로 최적화된 동기부여 메시지를 접할 수 있도록 설계했습니다.

## Features
 - 인증 시스템: 로그인 및 회원가입 UI/UX 제공
 - 문구 큐레이션: 실시간 동기부여 문구 조회 및 다국어 실시간 번역 지원
 - 아카이브: 사용자별 즐겨찾기(스크랩) 추가 및 제거 기능
 - 세션 유지: 리로드 시에도 로그아웃되지 않도록 브라우저 저장소를 활용한 세션 관리

## Tech Stack
Frontend
- Framework: Next.js (App Router)
- Library: React
- Network: Axios
- Language: TypeScript
- Styling: Tailwind CSS

Deployment & Storage
- Frontend Deployment: Vercel
- Persistence: localStorage (사용자 데이터 및 설정 저장)

## Troubleshooting
1. localStorage를 이용한 자동 로그아웃 방지

문제: 초기 설계 시 Redux를 사용했으나, 페이지 새로고침(Reload) 시 In-memory 상태가 초기화되어 로그인이 해제되는 현상 발생.

원인: Redux는 브라우저 메모리상에서 상태를 관리하므로, 새로고침 시 데이터가 휘발됨. 프로젝트 규모에 비해 복잡한 보일러플레이트 코드가 생산성 저하를 유발함.

해결: Redux를 완전히 제거하고, React 내장 Hook과 localStorage를 직접 연동하는 방식으로 구조를 개선

성과: 
 - 불필요한 외부 라이브러리 의존성 제거로 번들 사이즈 감소
 - 로그인 상태 및 토큰 관리 로직이 단순해져 유지보수 효율성 증대
 - 새로고침 시에도 localStorage를 통해 유저 세션이 안정적으로 유지

2. 배포 환경에서의 CORS 에러 (Next.js - NestJS 연동)

문제: 로컬 환경에서는 정상 작동하던 API 호출이 Vercel 배포 후 Access-Control-Allow-Origin 에러와 함께 차단됨

원인: NestJS 백엔드의 CORS 허용 목록(Origin)에 Vercel의 자동 생성 도메인이 누락

해결: 백엔드 환경 변수에 정확한 Vercel 도메인을 추가

## Technical Decisions
1. [보안 강화] XSS 공격 방지를 위한 인증 구조 설계
문제 상황: Refresh Token을 localStorage로 두게 될 경우, JS로 접근이 가능하여 XSS(Cross-Site Scripting) 공격에 노출될 경우 사용자의 인증 토큰이 탈취될 위험이 있음

해결책: Refresh Token을 httpOnly 및 Secure 옵션이 적용된 쿠키에 저장하도록 설계. 또한 client가 아닌 server에 둠으로써 쉽게 접근하지 못하도록 방지함.

전략: 상대적으로 노출되어도 위험도가 낮은 Access Token은 localStorage에 저장하여 자동 로그인 로직을 구현하되, 보안이 중요한 Refresh Token은 서버 측에서 관리하는 이중 인증 구조를 채택함.


## Screenshot
**로그인 / 회원가입**

<img width="400" height="400" alt="스크린샷 2026-02-26 150114" src="https://github.com/user-attachments/assets/0d3d9008-99ab-489e-b297-1fdde0975a6b" />
<img width="400" height="400" alt="스크린샷 2026-02-26 150123" src="https://github.com/user-attachments/assets/50a4c9e8-4796-4604-a3ce-fc4f567c67ed" />

회원가입 화면에서 id, 비밀번호, 언어 등을 설정할 수 있습니다


**모티베이션 문구 화면**

<img width="400" height="400" alt="스크린샷 2026-02-26 145723" src="https://github.com/user-attachments/assets/04130abc-4337-4ec3-970d-a4caea3e2052" />


**언어 변경**

<img width="400" height="400" alt="스크린샷 2026-02-26 145735" src="https://github.com/user-attachments/assets/41da0dba-5957-458b-9ada-a6f5e967df12" />

언어 변경시 실시간 번역 기능 지원합니다


**즐겨찾기 화면**

<img width="400" height="400" alt="스크린샷 2026-02-26 145815" src="https://github.com/user-attachments/assets/d2db9e95-0cb6-4f51-9d7b-b0f29d0be73d" />

즐겨찾기 등록하면 "즐겨찾기 화면"에서 문구들을 볼수있습니다

## Related Repositories
- Frontend Application: https://github.com/aoyagi0105/motivation-Maker.git
- Backend API: https://github.com/aoyagi0105/motivation-Maker-backend.git


## Environment Variables
프로젝트 실행을 위해 `.env.local` 파일에 아래 설정이 필요합니다.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## Getting Started
```bash
npm run dev
```
