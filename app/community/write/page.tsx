"use client";

import TopNavigation from "@/components/TopNavigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getLoginUser } from "@/lib/auth";
import { savePost } from "@/lib/community";

export default function CommunityWritePage() {

  const router = useRouter();

  const user = getLoginUser();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!user) {

    return (

      <main className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow p-10 text-center">

          <h1 className="text-4xl font-black mb-6">

            로그인이 필요합니다.

          </h1>

          <Link
            href="/login"
            className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold"
          >

            로그인

          </Link>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-100">

      <div className="max-w-4xl mx-auto py-12 px-8">

        <Link
          href="/community"
          className="text-cyan-500 font-bold"
        >

          <TopNavigation />

        </Link>

        <h1 className="text-5xl font-black mt-8 mb-10">

          글쓰기

        </h1>

        <div className="bg-white rounded-3xl shadow p-8">

          <input

            value={title}

            onChange={(e) => setTitle(e.target.value)}

            placeholder="제목을 입력하세요."

            className="w-full border rounded-2xl p-4 text-xl"

          />

          <textarea

            value={content}

            onChange={(e) => setContent(e.target.value)}

            placeholder="내용을 입력하세요."

            className="w-full border rounded-2xl p-4 h-80 mt-6"

          />

          <button

            onClick={async () => {

              if (!title.trim()) {

                alert("제목을 입력해주세요.");

                return;

              }

              if (!content.trim()) {

                alert("내용을 입력해주세요.");

                return;

              }

              await savePost({
  id: Date.now(),
  title,
  content,
  writer: user.nickname,
  date: new Date().toLocaleDateString(),
  views: 0,
});

alert("게시글이 등록되었습니다.");

router.push("/community");

            }}

            className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl font-black text-xl"

          >

            등록하기

          </button>

        </div>

      </div>

    </main>

  );

}