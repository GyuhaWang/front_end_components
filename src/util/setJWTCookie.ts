import { cookies } from "next/headers";

/**
 * Spring Boot의 Set-Cookie 헤더 문자열에서 JWT 토큰 쿠키를 파싱하여 Next.js의 쿠키 저장소에 설정합니다.
 *
 * @param setCookieHeaderString Spring Boot 응답 헤더의 'Set-Cookie' 전체 문자열 (예: 'jwt-token=eyJ...; Path=/; Max-Age=...; HttpOnly; SameSite=Lax')
 * @returns 설정 성공 여부
 */
export async function setJwtCookie(
  setCookieHeaderString: string
): Promise<boolean> {
  if (!process.env.JWT_TOKEN_KEY) {
    console.error("환경 변수 JWT_TOKEN_KEY가 설정되지 않았습니다.");
    return false;
  }

  // Set-Cookie 헤더 문자열을 세미콜론 기준으로 분리합니다.
  const parts = setCookieHeaderString.split(";").map((part) => part.trim());

  let name: string | undefined;
  let value: string | undefined;
  let path: string = "/"; // 기본값 설정
  let maxAge: number | undefined;
  let expires: Date | undefined;
  let httpOnly: boolean = false; // 기본값 설정
  let secure: boolean = false; // 기본값 설정
  let sameSite: "Lax" | "Strict" | "None" | undefined = undefined;

  parts.forEach((part) => {
    // JWT 토큰 이름과 값 파싱
    if (part.startsWith(`${process.env.JWT_TOKEN_KEY}=`)) {
      name = process.env.JWT_TOKEN_KEY!;
      value = part.substring(name.length + 1);
    }
    // Path 파싱
    else if (part.toLowerCase().startsWith("path=")) {
      path = part.substring("path=".length);
    }
    // Max-Age 파싱
    else if (part.toLowerCase().startsWith("max-age=")) {
      const ageStr = part.substring("max-age=".length);
      maxAge = parseInt(ageStr, 10);
      if (isNaN(maxAge)) maxAge = undefined;
    }
    // Expires 파싱
    else if (part.toLowerCase().startsWith("expires=")) {
      const dateStr = part.substring("expires=".length);
      const parsedDate = new Date(dateStr);
      if (!isNaN(parsedDate.getTime())) {
        // 유효한 날짜인지 확인
        expires = parsedDate;
      }
    }
    // HttpOnly 파싱
    else if (part.toLowerCase() === "httponly") {
      httpOnly = true;
    }
    // Secure 파싱
    else if (part.toLowerCase() === "secure") {
      secure = true;
    }
    // SameSite 파싱
    else if (part.toLowerCase().startsWith("samesite=")) {
      const siteValue = part.substring("samesite=".length).toLowerCase();
      if (
        siteValue === "lax" ||
        siteValue === "strict" ||
        siteValue === "none"
      ) {
        sameSite = (siteValue.charAt(0).toUpperCase() + siteValue.slice(1)) as
          | "Lax"
          | "Strict"
          | "None"; // 첫 글자 대문자로 변환
      }
    }
  });

  // 필수 값 (이름과 값)이 없으면 실패
  if (!name || !value) {
    console.error(
      `JWT 토큰 이름(${process.env.JWT_TOKEN_KEY}) 또는 값이 Set-Cookie 헤더에서 발견되지 않았습니다.`
    );
    return false;
  }

  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: name,
      value: value,
      httpOnly: httpOnly,
      secure: secure,
      path: path,
      maxAge: maxAge,
      sameSite: sameSite,
    });

    return true;
  } catch (error) {
    console.error("JWT 쿠키 설정 중 오류 발생:", error);
    return false;
  }
}
