"use client";

interface Props {
  probability: number;
  people: number;
  confidence: number;
}

export default function MarketStats({
  probability,
  people,
  confidence,
}: Props) {

  return (

    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <p className="text-slate-400 text-sm">
          현재 확률
        </p>

        <h2 className="text-5xl font-black mt-3 text-cyan-400">
          {probability}%
        </h2>

      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <p className="text-slate-400 text-sm">
          참여자
        </p>

        <h2 className="text-5xl font-black mt-3">
          {people.toLocaleString()}
        </h2>

      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <p className="text-slate-400 text-sm">
          AI 신뢰도
        </p>

        <h2 className="text-5xl font-black mt-3 text-green-400">
          {confidence}%
        </h2>

      </div>

    </div>

  );

}