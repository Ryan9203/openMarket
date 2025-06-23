# Open Market – Frontend Project

사용자가 상품을 탐색하고 구매할 수 있는 **간단한 오픈마켓 플랫폼**의 프론트엔드입니다.  
HTML, CSS, JavaScript만을 사용하여 구현되었으며, 외부 API와 연동되어 상품 데이터를 받아옵니다.

---

## 📌 주요 기능

- 메인 페이지에서 상품 리스트 표시
- 상품 클릭 시 상세 페이지 이동
- 상품 수량 선택 및 총합 가격 계산
- 404 에러 페이지 구현

---

## 🔧 기술 스택

- HTML5  
- CSS3  
- REST API 연동 (Fetch API 사용)

---

## 🗂️ 폴더 구조

open-market/

├── index.html              # 메인(상품 리스트) 페이지

├── login.html              # 로그인 페이지

├── signup.html             # 회원가입 페이지

├── product-detail.html     # 상품 상세 페이지

├── error-404.html          # 404 에러 페이지

├── /images                 # UI 및 아이콘 이미지

├── /JS

│   ├── main.js             # 메인 상품 목록 출력 로직

│   ├── product-detail.js   # 상세 페이지 로직

│   ├── login.js            # 로그인 로직 미완성

│   └── signup.js           # 회원가입 로직 미완성

└── /css

    └──  style.css               # 전체 공통 스타일

---

## 🚀 시작 방법

1. 이 저장소를 클론하거나 다운로드합니다:
`git clone https://github.com/yourusername/open-market.git
cd open-market``

2. index.html 파일을 브라우저로 열어 실행할 수 있습니다.

3. 서버가 필요하지 않으며, 모든 파일은 로컬에서도 실행 가능합니다. 단, 일부 브라우저는 CORS 정책으로 인해 fetch 요청이 차단될 수 있으므로 Live Server 등의 로컬 서버 환경에서 실행하는 것이 좋습니다.

---

## 🔐 API 정보

Base URL: https://api.wenivops.co.kr/services/open-market/
상품 목록: GET /products/
상품 상세: GET /products/:id/
로그인: POST /accounts/login/
회원가입: POST /accounts/buyer/signup/
토큰 갱신: POST /accounts/token/refresh/

※ 모든 인증은 JWT 기반입니다.

---

## ✅ 앞으로의 개발 예정 사항

1. 로그인 - (미완성 / 학습)
2. 회원가입 - (미완성 / 학습)
3. 로그인 상태 유지 (로컬스토리지/세션스토리지) - (미완성 / 학습)
4. 마이페이지 뷰 및 로그아웃 기능 - (미완성 / 학습)
