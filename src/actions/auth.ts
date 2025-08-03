"use server";

import { setJwtCookie } from "@/util/setJWTCookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const requestUrl = `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/auth`;

export async function loginAction(formData: FormData) {
  console.log("request url", requestUrl);
  if (!process.env.JWT_TOKEN_KEY) {
    console.log("jwt env not found");
  }
  const email = formData.get("username");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "아이디와 비밀번호를 입력해주세요." };
  }

  try {
    const response = await fetch(`${requestUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Spring Boot에서 전달하는 에러 메시지를 사용
      return {
        error:
          errorData.message ||
          "로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.",
      };
    }

    const jwtCookieString = response.headers
      .getSetCookie()
      .find((cookie) => cookie.startsWith(`${process.env.JWT_TOKEN_KEY}=`));
    if (jwtCookieString) {
      await setJwtCookie(jwtCookieString);
    } else {
      // jwt token not found
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." };
  }
}

export async function logoutAction() {
  if (!process.env.JWT_TOKEN_KEY) {
    console.log("jwt env not found");
  }
  // try {
  //   await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/api/logout`, {
  //     method: "POST",
  //   });
  // } catch (error) {
  //   console.error("Logout API call error:", error);
  // }
  (await cookies()).delete(process.env.JWT_TOKEN_KEY!);
  redirect("/login");
}

export async function getSession() {
  if (!process.env.JWT_TOKEN_KEY) {
    console.log("jwt env not found");
  }

  const jwtToken = (await cookies()).get(process.env.JWT_TOKEN_KEY!)?.value;

  return jwtToken
    ? { isLoggedIn: true, token: jwtToken }
    : { isLoggedIn: false, token: null };
}
