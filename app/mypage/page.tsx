"use client";

import Link from "next/link";
import { getLoginUser } from "@/lib/auth";
import {
  getPredictions,
  type Prediction,
} from "@/lib/prediction";
import { useEffect, useState } from "react";

export default function MyPage() {
  const user = getLoginUser();
  const [predictions, setPredictions] =
  useState<Prediction[]>([]);

useEffect(() => {
  async function loadPredictions() {
    if (!user) return;

    const list = await getPredictions();

    setPredictions(
      list.filter((item) => item.userId === user.id)
    );
  }

  loadPredictions();
}, [user]);
  const total = predictions.length;

const win = predictions.filter(
  (p) => p.status === "WIN"
).length;

const wait = predictions.filter(
  (p) => p.status === "WAIT"
).length;

const winRate =
  total === 0
    ? 0
    : Math.round((win / total) * 100);

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-slate-100">
        <h1 className="text-4xl font-black mb-6">
          로그인이 필요합니다.
        </h1>

        <Link
          href="/login"
          className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          로그인하기
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="max-w-5xl mx-auto py-14 px-8">

        <h1 className="text-5xl font-black mb-10">
          마이페이지
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">

  <div className="bg-white rounded-3xl shadow-lg p-6">
    <p className="text-slate-500">총 예측</p>
    <h2 className="text-4xl font-black">
      {total}
    </h2>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-6">
    <p className="text-slate-500">적중</p>
    <h2 className="text-4xl font-black text-green-500">
      {win}
    </h2>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-6">
    <p className="text-slate-500">대기중</p>
    <h2 className="text-4xl font-black text-yellow-500">
      {wait}
    </h2>
  </div>

  <div className="bg-white rounded-3xl shadow-lg p-6">
    <p className="text-slate-500">승률</p>
    <h2 className="text-4xl font-black text-cyan-500">
      {winRate}%
    </h2>
  </div>

</div>

          <div className="grid grid-cols-2 gap-8">

            <div>
              <p className="text-slate-500 mb-2">
                아이디
              </p>

              <h2 className="text-3xl font-black">
                {user.id}
              </h2>
            </div>

            <div>
              <p className="text-slate-500 mb-2">
                닉네임
              </p>

              <h2 className="text-3xl font-black">
                {user.nickname}
              </h2>
            </div>

            <div>
              <p className="text-slate-500 mb-2">
                보유 포인트
              </p>

              <h2 className="text-4xl font-black text-yellow-500">
                {user.point.toLocaleString()}P
              </h2>
            </div>

            <div>
              <p className="text-slate-500 mb-2">
                등급
              </p>

              <h2 className="text-3xl font-black">
                Rookie
              </h2>
            </div>

          </div>

        </div>

<div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

  <h2 className="text-3xl font-black mb-8">
    내 예측 내역
  </h2>

  {predictions.length === 0 ? (

    <p className="text-slate-500">
      아직 참여한 예측이 없습니다.
    </p>

  ) : (

    <div className="space-y-5">

      {predictions.map((item) => (

        <div
          key={item.id}
          className="border rounded-2xl p-5"
        >

          <div className="flex justify-between">

            <h3 className="text-2xl font-black">
              {item.title}
            </h3>

            <span
              className={`font-bold ${
                item.choice === "YES"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.choice}
            </span>

          </div>

          <div className="mt-4 flex justify-between">

            <span>
              사용 포인트
            </span>

            <strong>
              {item.point.toLocaleString()}P
            </strong>

          </div>

          <div className="mt-2 flex justify-between">

            <span>
              현재 상태
            </span>

            <strong
              className={`${
                item.status === "WAIT"
                  ? "text-yellow-500"
                  : item.status === "WIN"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >

              {item.status === "WAIT"
                ? "대기중"
                : item.status === "WIN"
                ? "적중"
                : "실패"}

            </strong>

          </div>

          <div className="mt-2 flex justify-between">

            <span>
              예상 보상
            </span>

            <strong className="text-cyan-500">

              {item.reward.toLocaleString()}P

            </strong>

          </div>

          <div className="mt-2 text-slate-500">

            {item.date}

          </div>

        </div>

      ))}

    </div>

  )}

</div>

      </div>

    </main>
  );
}