"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getRanking } from "@/lib/ranking";

export default function ProfilePage() {
  const params = useParams();
  const ranking = getRanking();

  const user = ranking.find(
    (u) => u.rank === Number(params.id)
  );

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-4xl font-black">
          사용자를 찾을 수 없습니다.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto py-10 px-6">

        <Link
          href="/ranking"
          className="text-blue-600 font-bold"
        >
          ← 랭킹으로
        </Link>

        <div className="bg-white rounded-3xl shadow mt-8 p-10">

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-5xl">
              👤
            </div>

            <div>

              <h1 className="text-5xl font-black">
                {user.nickname}
              </h1>

              <p className="text-gray-500 mt-2">
                TOP {user.rank} 투자자
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-500">
                보유 포인트
              </p>

              <h2 className="text-3xl font-black text-blue-600 mt-2">
                {user.point.toLocaleString()}P
              </h2>

            </div>

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-500">
                승률
              </p>

              <h2 className="text-3xl font-black mt-2">
                {user.winRate}%
              </h2>

            </div>

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-500">
                수익률
              </p>

              <h2 className="text-3xl font-black text-green-600 mt-2">
                +{user.profit}%
              </h2>

            </div>

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-500">
                총 예측
              </p>

              <h2 className="text-3xl font-black mt-2">
                {user.totalPrediction}회
              </h2>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow mt-10 p-8">

          <h2 className="text-3xl font-black mb-6">

            📈 최근 투자 내역

          </h2>

          <div className="space-y-4">

            {user.recent.map((item, index) => (

              <div
                key={index}
                className="border rounded-2xl p-5 bg-gray-50 hover:bg-gray-100 transition"
              >

                {item}

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}