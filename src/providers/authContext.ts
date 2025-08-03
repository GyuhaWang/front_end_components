// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import { useRouter } from "next/navigation";
// import { assert } from "console";

// interface AuthContextType {
//   accessToken: string | null;
//   // 여기에 user 정보 등 추가 가능
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// if (!process.env.JWT_TOKEN_KEY) {
//   assert("JWT 환경변수가 설정되어있지 않습니다.");
// }
// const ACCESS_TOKEN_KEY = process.env.JWT_TOKEN_KEY!;

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [accessToken, setAccessTokenState] = useState<string | null>(null);
//   const router = useRouter();

//   // Access Token을 상태에 설정하는 헬퍼 함수
//   const setAccessToken = useCallback((token: string | null) => {
//     setAccessTokenState(token);
//     if (token) {
//       // Access Token은 세션 스토리지 등 클라이언트 측 메모리에 저장 (XSS 위험 고려)
//       sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
//     } else {
//       sessionStorage.removeItem(ACCESS_TOKEN_KEY);
//     }
//   }, []);

//   // 초기 로드 시 Access Token 불러오기
//   useEffect(() => {
//     const storedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
//     if (storedToken) {
//       setAccessTokenState(storedToken);
//     }
//   }, [setAccessToken]);

//   // Access Token 만료 시 재발급 로직 (주기적 또는 API 호출 실패 시)
//   const refreshAccessToken = useCallback(async () => {
//     const refreshToken = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("refresh-token="))
//       ?.split("=")[1];
//     if (!refreshToken) {
//       console.error("No refresh token found. User needs to re-login.");
//       setAccessToken(null);
//       router.push("/login"); // 리프레시 토큰 없으면 로그인 페이지로 리다이렉트
//       return null;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/api/refresh-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ refreshToken }),
//         }
//       );

//       if (!response.ok) {
//         console.error("Failed to refresh token:", await response.text());
//         setAccessToken(null);
//         router.push("/login"); // 토큰 재발급 실패 시 로그인 페이지로
//         return null;
//       }

//       const data: { accessToken: string; refreshToken: string } =
//         await response.json();
//       setAccessToken(data.accessToken); // 새로운 Access Token 설정
//       // Refresh Token은 HTTP-Only 쿠키로 자동 업데이트되므로 여기서 직접 처리할 필요 없음
//       return data.accessToken;
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       setAccessToken(null);
//       router.push("/login");
//       return null;
//     }
//   }, [setAccessToken, router]);

//   // 주기적으로 Access Token 유효성 검사 또는 API 요청 실패 시 재발급 시도
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Access Token 만료 1분 전 재발급 시도 (예시)
//       // 실제로는 Access Token의 만료 시간을 파싱하여 남은 시간을 계산해야 함
//       // 또는 API 호출 실패 시 401 Unauthorized 에러를 받으면 재발급 시도
//       if (accessToken) {
//         // 간단한 예시: 만료되기 전에 주기적으로 재발급 시도
//         // 실제 구현에서는 토큰 디코딩하여 exp 클레임 확인
//       } else {
//         // Access Token이 없으면 refresh token으로 재발급 시도
//         // refreshAccessToken();
//       }
//     }, 60 * 1000); // 1분마다 체크

//     return () => clearInterval(interval);
//   }, [accessToken, refreshAccessToken]);

//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
