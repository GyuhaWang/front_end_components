"use server";

export async function connectCheck() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/`
    );
    if (!response.ok) {
      return response.status;
    }
    console.log(response);
    return response.status;
  } catch (e) {
    return 500;
  }
}

export async function protectedCheck() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/api/protected/resource`
    );
    if (!response.ok) {
      return response.status;
    }
    console.log(response);
    return response.status;
  } catch (e) {
    return 500;
  }
}
