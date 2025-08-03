"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL}/authenticate/signIn`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberId,
            memberPassword,
            memberName,
            email,
            address,
            phone,
            enabled: true,
            rolename: "ROLE_ADMIN",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || "아이디 또는 비밀번호가 올바르지 않습니다."
        );
        return;
      }

      const data = await response.json();
      localStorage.setItem("jwtToken", data.accessToken);
      router.push("/dashboard");
    } catch (err) {
      setError("서버에 연결할 수 없습니다. 네트워크를 확인해주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>로그인</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="memberId" style={styles.label}>
            아이디:
          </label>
          <input
            type="text"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="memberPassword" style={styles.label}>
            비밀번호:
          </label>
          <input
            type="password"
            id="memberPassword"
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="memberName" style={styles.label}>
            이름:
          </label>
          <input
            type="text"
            id="memberName"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            이메일:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="address" style={styles.label}>
            주소:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="phone" style={styles.label}>
            전화번호:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  } as React.CSSProperties,
  header: {
    color: "#333",
    marginBottom: "20px",
  } as React.CSSProperties,
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  } as React.CSSProperties,
  inputGroup: {
    marginBottom: "15px",
  } as React.CSSProperties,
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#555",
    fontWeight: "bold",
  } as React.CSSProperties,
  input: {
    width: "calc(100% - 20px)",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  } as React.CSSProperties,
  errorText: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
  } as React.CSSProperties,
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  } as React.CSSProperties,
  buttonHover: {
    backgroundColor: "#005bb5",
  } as React.CSSProperties,
};
