"use client";

import Link from "next/link";
import { economy } from "@/lib/economy";

export default function EconomyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

          <Link
            href="/"
            className="text-4xl font-black text-cyan-400"
          >
            0 or 1
          </Link>

          <div className="flex gap-8 font-semibold">

            <Link href="/">홈</Link>

            <Link href="/sports">
              스포츠
            </Link>

            <Link href="/social">
              사회
            </Link>

            <Link
              href="/economy"
              className="text-cyan-400"
            >
              경제
            </Link>

            <Link href="/ranking">
              랭킹
            </Link>

          </div>

          <button className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl font-bold transition">

            로그인

          </button>

        </div>

      </header>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-6xl font-black mb-4">

          📈 경제

        </h1>

        <p className="text-slate-400 text-xl mb-14">

          경제 이슈를 예측하고 가상 포인트를 투자하세요.

        </p>

        <div className="grid lg:grid-cols-2 gap-8">

          {economy.map((match) => (

            <Link
              key={match.id}
              href={`/economy/${match.id}`}
              className="block"
            >

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  hover:border-cyan-400
                  rounded-3xl
                  transition
                  p-8
                  hover:-translate-y-1
                  duration-200
                "
              >

                <div className="flex justify-between mb-6">

                  <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">

                    LIVE

                  </span>

                  <span className="text-cyan-400 font-bold">

                    {match.category}

                  </span>

                </div>

                <h2 className="text-3xl font-black mb-3">

                  {match.title}

                </h2>

                <p className="text-slate-400 mb-8">

                  {match.description}

                </p>

                <div className="flex justify-between mb-3">

                  <span className="text-green-400 font-bold">

                    YES {match.yes}%

                  </span>

                  <span className="text-red-400 font-bold">

                    NO {match.no}%

                  </span>

                </div>

                <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex mb-6">

                  <div
                    className="bg-green-400"
                    style={{ width: `${match.yes}%` }}
                  />

                  <div
                    className="bg-red-400"
                    style={{ width: `${match.no}%` }}
                  />

                </div>

                <div className="flex justify-between text-slate-400">

                  <span>

                    참여자 {match.people.toLocaleString()}명

                  </span>

                  <span>

                    {match.category}

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