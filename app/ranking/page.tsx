"use client";

import TopNavigation from "@/components/TopNavigation";
import { useEffect, useState } from "react";
import { getLoginUser } from "@/lib/auth";
import Link from "next/link";
import {
  getRanking,
  subscribeRanking,
  RankingUser,
} from "@/lib/ranking";

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const loginUser = getLoginUser();

  useEffect(() => {
  async function load() {
    const data = await getRanking();
    setRanking(data);
  }

  load();

  const channel = subscribeRanking(load);

  return () => {
    channel.unsubscribe();
  };
}, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <TopNavigation />

      <section className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-6xl font-black mt-8 mb-3">
          🏆 명예의 전당
        </h1>

        <div className="text-slate-400 text-xl mb-12">

  <p className="text-slate-500 mb-3">
    총 참가자 : {ranking.length}명
  </p>

  <p>
    예측 정확도와 보유 포인트를 기반으로 실시간 랭킹이 갱신됩니다.
  </p>

</div>

        {ranking.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-12 text-center">
            <p className="text-2xl text-slate-400">
              아직 등록된 사용자가 없습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {ranking.map((user, index) => {

              let medal = "🏅";
              let border = "border-slate-700";

              if (index === 0) {
                medal = "🥇";
                border = "border-yellow-400";
              } else if (index === 1) {
                medal = "🥈";
                border = "border-gray-300";
              } else if (index === 2) {
                medal = "🥉";
                border = "border-orange-400";
              }

              return (
                <div
                  key={user.rank}
                  className={`
                    bg-slate-900
                    rounded-3xl
                    border-2
                    ${border}
                    p-8
                    transition
                    hover:scale-[1.02]
                  `}
                >
                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-6">

                      <div className="text-6xl">
                        {medal}
                      </div>

                      <div>

                        <h2 className="text-4xl font-black">
                          {user.nickname}

{loginUser?.nickname === user.nickname && (
  <span className="ml-3 text-cyan-400 text-xl">
    (나)
  </span>
)}
                        </h2>

                        <p className="text-slate-400 mt-2">
                          현재 {user.rank}위
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-5xl font-black text-yellow-400">
                        {user.point.toLocaleString()}P
                      </p>

                      <p className="text-slate-400 mt-2">
                        보유 포인트
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}