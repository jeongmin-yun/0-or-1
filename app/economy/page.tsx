"use client";

import TopNavigation from "@/components/TopNavigation";
import Link from "next/link";
import { economy } from "@/lib/economy";

export default function EconomyPage() {
  return (
   <main className="min-h-screen bg-slate-950 text-white">

  <TopNavigation />

  <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="mb-14">

  <h1 className="text-7xl font-black text-cyan-400">
    PICKS
  </h1>

  <h2 className="mt-4 text-6xl font-black">
    📈 경제
  </h2>

  <p className="text-slate-400 text-xl mt-3">
    경제 이슈를 예측하고 가상 포인트를 투자하세요.
  </p>

</div>

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