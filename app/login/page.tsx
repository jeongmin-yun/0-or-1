"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const user = login(id, password);

    if (!user) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    alert(`${user.nickname}님 환영합니다!`);

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-[480px]">

        <h1 className="text-4xl font-black text-center mb-10">
          로그인
        </h1>

        <input
          className="w-full border rounded-xl p-4 mb-4"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-xl p-4 mb-8"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-xl font-bold text-lg"
        >
          로그인
        </button>

        <div className="text-center mt-8">

          <Link
            href="/signup"
            className="text-cyan-500 font-bold"
          >
            회원가입 하기
          </Link>

        </div>

      </div>

    </main>
  );
}