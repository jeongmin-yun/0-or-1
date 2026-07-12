"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function TopNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup"
  ) {
    return null;
  }

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-4">

      <button
        onClick={() => router.back()}
        className="bg-white text-slate-900 px-5 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-100 transition"
      >
        ← 뒤로가기
      </button>

    </div>
  );
}