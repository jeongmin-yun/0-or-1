"use client";

import TopNavigation from "@/components/TopNavigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getPosts,
  subscribePosts,
  type CommunityPost,
} from "@/lib/community";

export default function CommunityPage() {

  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
  async function load() {
    const list = await getPosts();
    setPosts(list);
  }

  load();

  const channel = subscribePosts(load);

  return () => {
    channel.unsubscribe();
  };
}, []);

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      <TopNavigation />

      <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">
              커뮤니티
            </h1>

            <p className="text-slate-500 mt-3">
              자유롭게 의견을 공유해보세요.
            </p>

          </div>

          <Link
            href="/community/write"
            className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-2xl font-bold"
          >
            글쓰기
          </Link>

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow">

          <div className="grid grid-cols-12 border-b p-5 font-bold">

            <div className="col-span-6">
              제목
            </div>

            <div className="col-span-2 text-center">
              작성자
            </div>

            <div className="col-span-2 text-center">
              조회수
            </div>

            <div className="col-span-2 text-center">
              작성일
            </div>

          </div>

          {posts.length === 0 ? (

            <div className="p-16 text-center text-slate-500">

              아직 작성된 게시글이 없습니다.

            </div>

          ) : (

            posts.map((post) => (

              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="grid grid-cols-12 p-5 border-b hover:bg-slate-50 transition"
              >

                <div className="col-span-6 font-bold">

                  {post.title}

                </div>

                <div className="col-span-2 text-center">

                  {post.writer}

                </div>

                <div className="col-span-2 text-center">

                  {post.views}

                </div>

                <div className="col-span-2 text-center">

                  {post.date}

                </div>

              </Link>

            ))

          )}

        </div>

      </section>

    </main>

  );

}