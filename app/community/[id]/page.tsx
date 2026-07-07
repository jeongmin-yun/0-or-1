"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { getLoginUser } from "@/lib/auth";
import { getPost, getPosts, updatePosts } from "@/lib/community";

export default function CommunityDetailPage() {

  const params = useParams();

  const user = getLoginUser();

  const [comment, setComment] = useState("");

  const id = Number(params.id);

  const posts = getPosts();

  const post = posts.find((p) => p.id === id);

  if (!post) {

    return (

      <main className="min-h-screen flex justify-center items-center">

        게시글이 없습니다.

      </main>

    );

  }

  if (!sessionStorage.getItem(`view-${id}`)) {

    post.views++;

    updatePosts(posts);

    sessionStorage.setItem(`view-${id}`, "1");

  }

  return (

    <main className="min-h-screen bg-slate-100">

      <div className="max-w-5xl mx-auto py-12 px-8">

        <Link
          href="/community"
          className="text-cyan-500 font-bold"
        >
          ← 게시판
        </Link>

        <div className="bg-white rounded-3xl shadow p-10 mt-8">

          <h1 className="text-5xl font-black">

            {post.title}

          </h1>

          <div className="flex justify-between mt-5 text-slate-500">

            <span>

              작성자 : {post.writer}

            </span>

            <span>

              조회수 : {post.views}

            </span>

          </div>

          <div className="mt-2 text-slate-500">

            {post.date}

          </div>

          <hr className="my-8"/>

          <div className="leading-9 whitespace-pre-wrap text-lg">

            {post.content}

          </div>

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-black mb-6">

            댓글

          </h2>

          {user && (

            <>

              <textarea

                value={comment}

                onChange={(e)=>setComment(e.target.value)}

                placeholder="댓글을 입력하세요."

                className="w-full border rounded-2xl p-4 h-32"

              />

              <button

                onClick={()=>{

                  if(comment.trim()===""){

                    alert("댓글을 입력하세요.");

                    return;

                  }

                  post.comments.push({

                    id:Date.now(),

                    writer:user.nickname,

                    content:comment,

                    date:new Date().toLocaleString()

                  });

                  updatePosts(posts);

                  location.reload();

                }}

                className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-bold"

              >

                댓글 등록

              </button>

            </>

          )}

          <div className="space-y-5 mt-8">

            {post.comments.length===0? (

              <p className="text-slate-500">

                아직 댓글이 없습니다.

              </p>

            ):(

              post.comments.map((c)=>(

                <div

                  key={c.id}

                  className="border rounded-2xl p-5"

                >

                  <div className="flex justify-between">

                    <strong>

                      {c.writer}

                    </strong>

                    <span className="text-slate-500">

                      {c.date}

                    </span>

                  </div>

                  <p className="mt-3 whitespace-pre-wrap">

                    {c.content}

                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </main>

  );

}