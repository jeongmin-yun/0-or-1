"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignup = () => {
    if (!id || !nickname || !password || !passwordCheck) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = signup({
      id,
      nickname,
      password,
      point: 100000,
    });

    if (!success) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    alert("회원가입 완료!\n가입 축하 포인트 100,000P 지급!");

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-[480px]">

        <h1 className="text-4xl font-black text-center mb-10">
          회원가입
        </h1>

        <input
          className="w-full border rounded-xl p-4 mb-4"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          className="w-full border rounded-xl p-4 mb-4"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-xl p-4 mb-4"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-xl p-4 mb-8"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-xl font-bold text-lg"
        >
          회원가입
        </button>

        <div className="text-center mt-8">

          <Link
            href="/login"
            className="text-cyan-500 font-bold"
          >
            이미 계정이 있으신가요? 로그인
          </Link>

        </div>

      </div>

    </main>
  );
}