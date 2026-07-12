"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoginUser, logout } from "@/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function loadUser() {
      const loginUser = await getLoginUser();
      setUser(loginUser);
    }

    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur text-white">
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-4xl font-black text-cyan-400"
        >
          PICKS
        </Link>

        <nav className="flex gap-8 text-sm font-semibold">
          <Link href="/">홈</Link>
          <Link href="/sports">스포츠</Link>
          <Link href="/social">사회</Link>
          <Link href="/economy">경제</Link>
          <Link href="/report">리포트</Link>
          <Link href="/community">커뮤니티</Link>
          <Link href="/ranking">랭킹</Link>

          {user && (
            <Link href="/mypage">마이페이지</Link>
          )}

          {user?.id === "admin" && (
            <Link href="/admin">관리자</Link>
          )}
        </nav>

        {pathname === "/" && (
          !user ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl font-bold transition"
              >
                로그인
              </Link>

              <Link
                href="/signup"
                className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-5 py-2 rounded-xl font-bold transition"
              >
                회원가입
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">{user.nickname}</p>
                <p className="text-yellow-400 font-black">
                  {user.point.toLocaleString()}P
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl font-bold"
              >
                로그아웃
              </button>
            </div>
          )
        )}
      </div>
    </header>
  );
}