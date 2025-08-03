// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호할 경로를 정규식으로 정의
// 예: /dashboard, /dashboard/profile, /settings 등 /dashboard로 시작하는 모든 경로
const PROTECTED_PATHS = /^\/(main|settings|profile)(\/.*)?$/;

export function middleware(request: NextRequest) {
  if (!process.env.JWT_TOKEN_KEY) {
    console.log("jwt env not exists");
  }

  const jwtToken = request.cookies.get(process.env.JWT_TOKEN_KEY!)?.value;

  //현재 요청된 경로
  const { pathname } = request.nextUrl;
  console.log("middleware", pathname);
  const isProtectedRoute = PROTECTED_PATHS.test(pathname);

  // 4. 보호된 경로인데 토큰이 없는 경우 (인증되지 않은 사용자)
  if (isProtectedRoute && !jwtToken) {
    // 로그인 페이지로 리다이렉트 (새로운 URL 객체를 만들고 리다이렉트)
    const loginUrl = new URL("/auth/login", request.url);
    // 리다이렉트 후 다시 현재 페이지로 돌아올 수 있도록 콜백 URL 추가 (선택 사항)
    loginUrl.searchParams.set("callbackUrl", pathname);
    console.log("callback");
    return NextResponse.redirect(loginUrl);
  }

  // 5. 로그인 페이지이지만 토큰이 이미 있는 경우 (이미 로그인된 사용자)
  // 로그인 페이지나 회원가입 페이지에 접근하려 하지만 이미 토큰이 있다면 대시보드로 리다이렉트
  if ((pathname === "/auth/login" || pathname === "/auth/signin") && jwtToken) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // 6. 나머지 요청은 통과
  return NextResponse.next();
}

// 미들웨어를 실행할 경로를 정의
// matcher는 정규식을 사용하여 경로를 필터링합니다.
// 여기에 포함된 경로에 대해서만 미들웨어가 실행됩니다.
// 가능한 한 구체적으로 지정하여 불필요한 미들웨어 실행을 줄이는 것이 좋습니다.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|signin|login).*)",
    // "/signin" 경로는 제외되어 있으므로 미들웨어가 실행되지 않습니다.
  ],
};
