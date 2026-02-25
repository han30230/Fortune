# Fortune 프로젝트 폴더 구조

> Cursor에서 **Explorer(탐색기)** 가 안 보이면: `Ctrl+Shift+E` 또는 메뉴 **View → Explorer**  
> 이 폴더를 Cursor로 열려면: **File → Open Folder** → `C:\Users\sangh\Documents\Fortune` 선택

```
C:\Users\sangh\Documents\Fortune\
├── api/
│   └── index.js              ← Vercel 서버리스 진입점
├── client/                   ← React 프론트엔드 (Vite)
│   ├── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── components/       ← UI 컴포넌트 (SajuForm, PillarCard, Interpretation 등)
│   │   ├── pages/           ← Home, not-found
│   │   ├── hooks/           ← use-saju, use-toast 등
│   │   └── lib/
│   └── replit_integrations/
├── server/                   ← Express 백엔드
│   ├── index.ts             ← 앱 진입점 (createApp)
│   ├── routes.ts            ← API 라우트
│   ├── static.ts            ← 정적 파일 서빙
│   ├── storage.ts
│   ├── db.ts
│   ├── vite.ts              ← 개발 시 Vite 연동
│   └── replit_integrations/
├── shared/                   ← 클라이언트·서버 공용
│   ├── schema.ts            ← DB 스키마, Zod
│   ├── routes.ts            ← API 경로/타입
│   └── models/
├── script/
│   └── build.ts             ← 빌드 스크립트 (Vite + esbuild)
├── attached_assets/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── drizzle.config.ts
├── vercel.json              ← Vercel 배포 설정
├── .replit                  ← Replit 설정
├── .gitignore
└── PROJECT_STRUCTURE.md     ← 이 파일
```

## Cursor에서 폴더/파일 보이게 하기

1. **폴더 열기**: `File` → `Open Folder` → `C:\Users\sangh\Documents\Fortune` 선택  
2. **왼쪽 탐색기 표시**: `Ctrl+Shift+E` 또는 상단 메뉴 `View` → `Explorer`  
3. **사이드바가 완전히 안 보일 때**: `Ctrl+B`로 사이드바 토글

이후 왼쪽에 **Fortune** 폴더 트리가 보입니다.
