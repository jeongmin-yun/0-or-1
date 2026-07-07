"use client";

interface Props {

  probability: number;

  confidence: number;

  recommendation: string;

  reasons: string[];

  recentGoals: number;

  averageRating: number;

}

export default function AIReport({

  probability,

  confidence,

  recommendation,

  reasons,

  recentGoals,

  averageRating,

}: Props) {

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-black mb-8">

        🤖 AI Report

      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        <div>

          <div className="rounded-2xl bg-slate-800 p-6">

            <p className="text-slate-400">

              AI 추천

            </p>

            <h2 className="text-5xl font-black mt-4 text-cyan-400">

              {recommendation}

            </h2>

            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span>

                  성공 확률

                </span>

                <strong>

                  {probability}%

                </strong>

              </div>

              <div className="h-3 rounded-full bg-slate-700">

                <div

                  className="h-3 rounded-full bg-cyan-400"

                  style={{

                    width: `${probability}%`,

                  }}

                />

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-slate-800 p-6 mt-6">

            <p className="text-slate-400 mb-4">

              추천 이유

            </p>

            <ul className="space-y-3">

              {reasons.map((reason,index)=>(

                <li

                  key={index}

                  className="flex gap-3"

                >

                  <span>

                    ✅

                  </span>

                  <span>

                    {reason}

                  </span>

                </li>

              ))}

            </ul>

          </div>

        </div>

        <div>

          <div className="space-y-5">

            <div className="rounded-2xl bg-slate-800 p-5 flex justify-between">

              <span>

                AI 신뢰도

              </span>

              <strong className="text-green-400 text-2xl">

                {confidence}%

              </strong>

            </div>

            <div className="rounded-2xl bg-slate-800 p-5 flex justify-between">

              <span>

                최근 득점

              </span>

              <strong className="text-2xl">

                {recentGoals}골

              </strong>

            </div>

            <div className="rounded-2xl bg-slate-800 p-5 flex justify-between">

              <span>

                평균 평점

              </span>

              <strong className="text-2xl">

                {averageRating}

              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}