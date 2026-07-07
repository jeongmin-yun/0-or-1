"use client";

import Link from "next/link";
import { social } from "@/lib/social";

export default function SocialPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="max-w-7xl mx-auto px-8 py-16">

        <Link
          href="/"
          className="text-cyan-400 font-bold"
        >
          ← 홈으로
        </Link>

        <h1 className="text-6xl font-black mt-8 mb-4">
          📰 사회
        </h1>

        <p className="text-slate-400 text-xl mb-14">
          사회 · 정치 · 기후 등 다양한 이슈를 예측해보세요.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {social.map((item) => (

            <Link
              key={item.id}
              href={`/social/${item.id}`}
            >

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  hover:border-cyan-400
                  rounded-3xl
                  p-8
                  transition
                "
              >

                <div className="flex justify-between mb-6">

                  <span className="bg-purple-500 px-3 py-1 rounded-full text-sm font-bold">
                    SOCIAL
                  </span>

                  <span className="text-cyan-400 font-bold">
                    {item.category}
                  </span>

                </div>

                <h2 className="text-3xl font-black mb-3">
                  {item.title}
                </h2>

                <p className="text-slate-400 mb-8">
                  {item.description}
                </p>

                <div className="flex justify-between mb-3">

                  <span className="text-green-400 font-bold">
                    YES {item.yes}%
                  </span>

                  <span className="text-red-400 font-bold">
                    NO {item.no}%
                  </span>

                </div>

                <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex mb-6">

                  <div
                    className="bg-green-400"
                    style={{
                      width: `${item.yes}%`,
                    }}
                  />

                  <div
                    className="bg-red-400"
                    style={{
                      width: `${item.no}%`,
                    }}
                  />

                </div>

                <div className="flex justify-between text-slate-400">

                  <span>
                    참여자 {item.people.toLocaleString()}명
                  </span>

                  <span>
                    {item.category}
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}