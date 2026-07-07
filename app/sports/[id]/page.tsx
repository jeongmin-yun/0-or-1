"use client";

import TradePanel from "../../../components/TradePanel";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { matches } from "@/lib/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getComments, saveComment } from "@/lib/comment";
import { savePrediction } from "@/lib/prediction";
import { getLoginUser, updateUser } from "@/lib/auth";

export default function MatchDetailPage() {

  const params = useParams();

  const match = matches.find(
    (m) => m.id === Number(params.id)
  );

  const [amount, setAmount] = useState(10000);
  const [selected, setSelected] = useState("");
  const loginUser = getLoginUser();

const [point, setPoint] = useState(
  loginUser?.point ?? 0
);
const [comment, setComment] = useState("");

const [comments, setComments] = useState(
  getComments().filter(
    (c) => c.matchId === Number(params.id)
  )
);


  if (!match) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-5xl font-black">

          종목을 찾을 수 없습니다.

        </h1>

      </main>

    );

  }

  const handlePrediction = () => {

  const loginUser = getLoginUser();

  if (!loginUser) {
    alert("로그인 후 이용해주세요.");
    return;
  }

  if (!selected) {
    alert("선택지를 선택해주세요.");
    return;
  }

  if (amount > point) {
    alert("포인트가 부족합니다.");
    return;
  }

  const ok = confirm(
`${match.title}

선택 : ${selected}

사용 포인트 : ${amount.toLocaleString()}P

예측에 참여하시겠습니까?`
  );

  if (!ok) return;

  setPoint(point - amount);

  loginUser.point -= amount;

  updateUser(loginUser);

  savePrediction({
    id: Date.now(),
    userId: loginUser.id,
    matchId: match.id,
    type: "sports",
    title: match.title,
    choice: selected,
    point: amount,
    reward: 0,
    status: "WAIT",
    date: new Date().toLocaleString(),
  });

  alert("예측 참여가 완료되었습니다.");
};

  const chartData =
  match.report.history?.map((value, index) => ({
    time: index,
    value,
  })) ?? [];

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="flex justify-between items-center mb-8">

  <Link
    href="/sports"
    className="text-cyan-400 font-bold"
  >
    ← 스포츠 목록
  </Link>

  <div className="bg-slate-900 border border-yellow-500 rounded-2xl px-5 py-3">

    <p className="text-slate-400 text-sm">
      보유 포인트
    </p>

    <h2 className="text-2xl font-black text-yellow-400">
      {point.toLocaleString()}P
    </h2>

  </div>

</div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
          

          <span className="inline-flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full text-sm font-bold shadow-lg">

            🔴 LIVE

          </span>

          <h1 className="text-6xl font-black mt-6 leading-tight">

  {match.title}

</h1>

{selected && (

<div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-cyan-500/20 border border-cyan-400 px-5 py-3">

<span className="text-slate-300">

현재 선택

</span>

<span className="text-cyan-300 text-2xl font-black">

{selected}

</span>

</div>

)}

          <p className="text-slate-400 mt-4 text-2xl leading-9">

            {match.description}

          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-500 text-sm">
      참여자
    </p>

    <h3 className="text-3xl font-black">
      {match.people.toLocaleString()}
    </h3>

  </div>

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-500 text-sm">
      현재 확률
    </p>

    <h3 className="text-3xl font-black text-cyan-400">
      {match.report.probability}%
    </h3>

  </div>

  <div className="bg-slate-800 rounded-2xl p-5">

    <p className="text-slate-500 text-sm">
      AI 신뢰도
    </p>

    <h3 className="text-3xl font-black text-green-400">
      {match.report.confidence}%
    </h3>

  </div>

</div>

          {match.type === "binary" && (

  <div className="mt-10 grid gap-4">

    <div
      className={`
        rounded-3xl
        border-2
        p-7
        cursor-pointer
        transition-all
        duration-300
        shadow-xl

        ${
          selected === "YES"
            ? "border-green-400 bg-green-500/20 scale-[1.02]"
            : "border-slate-700 hover:border-green-400 hover:bg-slate-800"
        }
      `}
      onClick={() => setSelected("YES")}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400">
            YES
          </p>

          {match.yes && (
  <p className="text-xs text-slate-500 mt-2">
    {Math.round(match.people * match.yes / 100).toLocaleString()}명이 선택
  </p>
)}

          <h2 className="text-4xl font-black">
            {match.yes}%
          </h2>

        </div>

        <div className="text-green-400 text-4xl">
          ▲
        </div>

      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-800">

        <div
  className="h-3 rounded-full bg-green-400 transition-all duration-700"
          style={{
            width: `${match.yes}%`,
          }}
        />

      </div>

    </div>

    <div
      className={`
        rounded-3xl
        border-2
        p-7
        cursor-pointer
        transition-all
        duration-300
        shadow-xl

        ${
          selected === "NO"
            ? "border-red-400 bg-red-500/20 scale-[1.02]"
            : "border-slate-700 hover:border-red-400 hover:bg-slate-800"
        }
      `}
      onClick={() => setSelected("NO")}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400">
            NO
          </p>

          {match.no && (
  <p className="text-xs text-slate-500 mt-2">
    {Math.round(match.people * match.no / 100).toLocaleString()}명이 선택
  </p>
)}
          <h2 className="text-4xl font-black">
            {match.no}%
          </h2>

        </div>

        <div className="text-red-400 text-4xl">
          ▼
        </div>

      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-800">

        <div
          className="h-3 rounded-full bg-red-400 transition-all duration-700"
          style={{
            width: `${match.no}%`,
          }}
        />

      </div>

    </div>

  </div>

)}

{match.type === "multiple" && (

  <div className="mt-10 space-y-4">

    {match.options?.map((option) => (

      <button
        key={option.id}
        onClick={() => setSelected(option.name)}
        className={`
          w-full
          rounded-3xl
          border
          border-slate-700
          p-6
          flex
          justify-between
          items-center
          transition-all
          duration-300
          shadow-xl

          ${
            selected === option.name
              ? "bg-cyan-600 ring-4 ring-cyan-300 scale-[1.02]"
              : "bg-slate-800 hover:bg-slate-700 hover:border-cyan-400"
          }
        `}
      >

        <span className="text-xl font-bold">
          {option.name}
        </span>

        <div className="text-right">

  <div className="text-cyan-300 font-black text-xl">
    {option.percent}%
  </div>

  <div className="text-slate-500 text-sm">
    ▶ 선택
  </div>

</div>

        <p className="text-xs text-slate-500 mt-2">
  {Math.round(match.people * option.percent / 100).toLocaleString()}명
</p>

      </button>

    ))}

  </div>

)}



          </div>

          <div className="space-y-6"> 

            <div className="mt-10 bg-slate-900 rounded-3xl border border-slate-800 p-8">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-black">
      📈 확률 변화
    </h2>

    <div className="flex gap-2">

      <button className="bg-cyan-500 px-4 py-2 rounded-xl font-bold">
        ALL
      </button>

      <button className="bg-slate-800 px-4 py-2 rounded-xl">
        1M
      </button>

      <button className="bg-slate-800 px-4 py-2 rounded-xl">
        1W
      </button>

      <button className="bg-slate-800 px-4 py-2 rounded-xl">
        1D
      </button>

    </div>

  </div>

  <div className="h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <LineChart data={chartData}>

        <XAxis dataKey="time" />

        <YAxis domain={[0,100]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#22d3ee"
          strokeWidth={4}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  <div className="grid grid-cols-3 gap-4 mt-8">

    <div className="bg-slate-800 rounded-2xl p-5">

      <p className="text-slate-400">
        현재 확률
      </p>

      <h3 className="text-3xl font-black text-cyan-400">
        {match.report.probability}%
      </h3>

    </div>

    <div className="bg-slate-800 rounded-2xl p-5">

      <p className="text-slate-400">
        참여자
      </p>

      <h3 className="text-3xl font-black">
        {match.people.toLocaleString()}
      </h3>

    </div>

    <div className="bg-slate-800 rounded-2xl p-5">

      <p className="text-slate-400">
        AI 신뢰도
      </p>

      <h3 className="text-3xl font-black text-green-400">
        {match.report.confidence}%
      </h3>

    </div>

  </div>

</div>

  <TradePanel
    selected={selected}
    amount={amount}
    point={point}
    onAmountChange={setAmount}
    onSubmit={handlePrediction}
  />

</div>

</div>

<div className="mt-12 bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <div className="flex justify-between items-center mb-8">

  <h2 className="text-3xl font-black">
    💬 커뮤니티
  </h2>

  <span className="text-slate-400">
    {comments.length}개의 댓글
  </span>

</div>

          <textarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="댓글을 입력하세요."
  className="
w-full
bg-slate-800
border
border-slate-700
rounded-2xl
p-5
h-36
resize-none
focus:border-cyan-400
outline-none
"
/>

          <button

onClick={() => {

const loginUser = getLoginUser();

if (!loginUser){

alert("로그인 후 이용해주세요.");

return;

}

if(comment.trim()===""){

alert("댓글을 입력해주세요.");

return;

}

saveComment({

id:Date.now(),

matchId:match.id,

nickname:loginUser.nickname,

content:comment,

date:new Date().toLocaleString()

});

setComments(

  getComments().filter(

(c)=>c.matchId===Number(params.id)

)

);

setComment("");

}}

className="
mt-6
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-500
px-7
py-3
font-bold
hover:scale-105
duration-200
"

>

댓글 등록

</button>
<div className="mt-8 space-y-4">

{comments.map((c)=>(

<div
key={c.id}
className="
bg-slate-800
border
border-slate-700
rounded-2xl
p-6
shadow-lg
"
>

<div className="flex justify-between items-center">

<div className="flex items-center gap-3">

  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-black">

    {c.nickname.charAt(0)}

  </div>

  <strong>

    {c.nickname}

  </strong>

</div>

<span className="text-slate-400 text-sm">

{c.date}

</span>

</div>

<p className="mt-4 leading-7 text-slate-200">

{c.content}

</p>

</div>

))}

</div>

        </div>


       {/* AI REPORT */}

<div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8 text-black">

  <div className="flex justify-between items-center mb-8">

  <div>

    <h2 className="text-3xl font-black">
      🤖 AI Prediction Report
    </h2>

    <p className="text-gray-500 mt-2">
      실시간 경기 데이터 기반 AI 분석
    </p>

  </div>

  <div className="rounded-full bg-green-100 px-4 py-2">

    <span className="text-green-600 font-bold">
      AI ONLINE
    </span>

  </div>

</div>

  <div className="grid md:grid-cols-2 gap-8">

    <div>

      <h3 className="text-xl font-bold mb-4">
        AI 종합 의견
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

        <p className="text-3xl font-black text-blue-600">
          {match.report.probability >= 60 ? "🟢 YES 추천" : "🔴 NO 추천"}
        </p>

        <p className="mt-3 text-gray-700 leading-8">
          최근 데이터와 참여자 예측을 종합 분석한 결과

AI는 현재 확률이

<strong className="text-blue-600">
  {match.report.probability}%
</strong>

로 판단하고 있습니다.

현재 참여자 추세와 최근 데이터를 고려했을 때
가장 가능성이 높은 결과입니다.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-gray-100 rounded-2xl p-4">

          <p className="text-gray-500">
            AI 신뢰도
          </p>

          <h3 className="text-3xl font-black text-blue-600">
            {match.report.confidence}%
          </h3>

        </div>

        <div className="bg-gray-100 rounded-2xl p-4">

          <p className="text-gray-500">
            추천
          </p>

          <h3 className="text-3xl font-black text-green-600">
            {match.report.probability >= 60 ? "YES" : "NO"}
          </h3>

        </div>

      </div>

    </div>

    <div>

      <h3 className="text-xl font-bold mb-4">
        경기 데이터
      </h3>

      <div className="space-y-5">

        <div>

          <div className="flex justify-between mb-2">

            <span>예상 성공 확률</span>

            <span className="font-bold">
              {match.report.probability}%
            </span>

          </div>

          <div className="h-3 bg-gray-200 rounded-full">

            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${match.report.probability}%`
              }}
            />

          </div>

        </div>

        <div className="flex justify-between bg-gray-100 rounded-xl p-4">

          <span>최근 득점</span>

          <strong>{match.report.recentGoals}골</strong>

        </div>

        <div className="flex justify-between bg-gray-100 rounded-xl p-4">

          <span>평균 평점</span>

          <strong>{match.report.averageRating}</strong>

        </div>

        <div className="flex justify-between bg-gray-100 rounded-xl p-4">

          <span>예상 출전</span>

          <strong>선발</strong>

        </div>

      </div>

    </div>

  </div>

</div>

        {/* COMMENT */}

      </div>

    </main>

  );

}