"use client";

import { economy } from "@/lib/economy";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getComments, saveComment, deleteComment, type Comment } from "@/lib/comment";
import { savePrediction } from "@/lib/prediction";
import { getLoginUser, updateUser } from "@/lib/auth";

export default function MatchDetailPage() {

  const params = useParams();

  const match = economy.find(
    (m) => m.id === Number(params.id)
  );

  const [amount, setAmount] = useState(10000);
  const [selected, setSelected] = useState<"YES" | "NO" | "">("");
  const loginUser = getLoginUser();

  const [point, setPoint] = useState(
    loginUser?.point ?? 0
  );

useEffect(() => {
  const user = getLoginUser();

  if (user) {
    setPoint(user.point);
  }
}, []);
useEffect(() => {
  async function loadComments() {
    const list = await getComments();

    setComments(
      list.filter(
        (c) => c.matchId === Number(params.id)
      )
    );
  }

  loadComments();
}, [params.id]);

const [comment, setComment] = useState("");

const [comments, setComments] = useState<Comment[]>([]);


  if (!match) {

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-5xl font-black">

          종목을 찾을 수 없습니다.

        </h1>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto px-8 py-14">

        <Link
          href="/economy"
          className="text-cyan-400"
          
        >
            <div className="mt-8 bg-slate-900 border border-yellow-500 rounded-2xl p-5">

  <p className="text-slate-400">

    보유 포인트

  </p>

  <h2 className="text-4xl font-black text-yellow-400">

    {point.toLocaleString()}P

  </h2>

</div>
          ← 경제 목록
        </Link>

        <div className="mt-8 bg-slate-900 rounded-3xl border border-slate-800 p-10">

          <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">

            ECONOMY

          </span>

          <h1 className="text-5xl font-black mt-6">

            {match.title}

          </h1>

          <p className="text-slate-400 mt-3 text-xl">

            {match.description}

          </p>

          <div className="mt-10 flex justify-between">

            <span className="text-green-400 font-black text-2xl">

              YES {match.yes}%

            </span>

            <span className="text-red-400 font-black text-2xl">

              NO {match.no}%

            </span>

          </div>

          <div className="mt-4 h-6 bg-slate-800 rounded-full overflow-hidden flex">

            <div
              className="bg-green-400"
              style={{
                width: `${match.yes}%`,
              }}
            />

            <div
              className="bg-red-400"
              style={{
                width: `${match.no}%`,
              }}
            />

          </div>

          <div className="mt-10">

            <label className="text-slate-400">

              투자 포인트

            </label>

            <input

              type="number"

              value={amount}

              onChange={(e)=>
                setAmount(Number(e.target.value))
              }

              className="w-full mt-3 bg-slate-800 rounded-2xl p-4 text-2xl"

            />

            <div className="grid grid-cols-4 gap-3 mt-5">

  <button
    onClick={() => setAmount(amount + 1000)}
    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold"
  >
    +1,000
  </button>

  <button
    onClick={() => setAmount(amount + 5000)}
    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold"
  >
    +5,000
  </button>

  <button
    onClick={() => setAmount(amount + 10000)}
    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold"
  >
    +10,000
  </button>

  <button
    onClick={() => setAmount(amount + 50000)}
    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold"
  >
    +50,000
  </button>

</div>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <button
  onClick={() => setSelected("YES")}
  className={`
    py-5
    rounded-2xl
    text-2xl
    font-black
    transition

    ${
      selected === "YES"
        ? "bg-green-700 ring-4 ring-green-300"
        : "bg-green-500 hover:bg-green-400"
    }
  `}
>
  YES 선택
</button>

            <button
  onClick={() => setSelected("NO")}
  className={`
    py-5
    rounded-2xl
    text-2xl
    font-black
    transition

    ${
      selected === "NO"
        ? "bg-red-700 ring-4 ring-red-300"
        : "bg-red-500 hover:bg-red-400"
    }
  `}
>
  NO 선택
</button>

          </div>

          {selected !== "" && (

  <div className="mt-8 rounded-2xl border border-cyan-500 bg-slate-800 p-6">

    <h3 className="text-xl font-bold mb-4">
      예측 정보
    </h3>

    <div className="flex justify-between mb-3">

      <span>선택 결과</span>

      <strong className="text-cyan-400">
        {selected}
      </strong>

    </div>

    <div className="flex justify-between mb-3">

      <span>사용 포인트</span>

      <strong>
        {amount.toLocaleString()}P
      </strong>

    </div>

    <div className="flex justify-between mb-6">

      <span>예상 획득 포인트</span>

      <strong className="text-yellow-400">
        {(amount * 1.8).toLocaleString()}P
      </strong>

    </div>

    <button

      onClick={async () => {

  const loginUser = getLoginUser();

  if (!loginUser) {

    alert("로그인 후 이용해주세요.");

    return;

  }

  if (!selected) {

  alert("YES 또는 NO를 선택해주세요.");

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

await updateUser(loginUser);

await savePrediction({

    type: "economy",

    id: Date.now(),

    userId: loginUser.id,

    matchId: match.id,

    title: match.title,

    choice: selected as "YES" | "NO",

    point: amount,

    reward: 0,

    status: "WAIT",

    date: new Date().toLocaleString(),

  });

  alert("예측 참여가 완료되었습니다.");

}}

      className="w-full bg-cyan-500 hover:bg-cyan-400 py-5 rounded-2xl text-2xl font-black"

    >

      예측 참여하기

    </button>

  </div>

)}

          </div>

       {/* AI REPORT */}

<div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8 text-black">

  <h2 className="text-3xl font-black mb-8">
    🤖 AI 분석 리포트
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    <div>

      <h3 className="text-xl font-bold mb-4">
        AI 종합 의견
      </h3>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

        <p className="text-3xl font-black text-blue-600">
          YES 추천
        </p>

        <p className="mt-3 text-gray-700 leading-8">
          최근 경기력과 상대 전적을 분석한 결과
          득점 가능성이 높습니다.
          공격 지표가 최근 꾸준히 상승 중이며
          선발 출전 가능성도 높습니다.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-gray-100 rounded-2xl p-4">

          <p className="text-gray-500">
            AI 신뢰도
          </p>

          <h3 className="text-3xl font-black text-blue-600">
            82%
          </h3>

        </div>

        <div className="bg-gray-100 rounded-2xl p-4">

          <p className="text-gray-500">
            추천
          </p>

          <h3 className="text-3xl font-black text-green-600">
            YES
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

        <div className="mt-12 bg-slate-900 rounded-3xl border border-slate-800 p-8">

          <h2 className="text-3xl font-black mb-8">

            댓글

          </h2>

          <textarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  placeholder="댓글을 입력하세요."
  className="w-full bg-slate-800 rounded-2xl p-5 h-40"
/>

          <button

onClick={async () => {

const loginUser = getLoginUser();

if (!loginUser){

alert("로그인 후 이용해주세요.");

return;

}

if(comment.trim()===""){

alert("댓글을 입력해주세요.");

return;

}

await saveComment({

id:Date.now(),

matchId:match.id,

nickname:loginUser.nickname,

content:comment,

date:new Date().toLocaleString()

});

const list = await getComments();

setComments(
  list.filter(
    (c) => c.matchId === Number(params.id)
  )
);

setComment("");

}}

className="mt-6 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl font-bold"

>

댓글 등록

</button>
<div className="mt-8 space-y-4">

{comments.map((c)=>(

<div
key={c.id}
className="bg-slate-800 rounded-2xl p-5"
>

<div className="flex justify-between">

<strong>

{c.nickname}

</strong>

<span className="text-slate-400 text-sm">

{c.date}

</span>

</div>

<p className="mt-3">

{c.content}

</p>

{loginUser?.id === "admin" && (
  <button
    onClick={async () => {
      if (!confirm("댓글을 삭제하시겠습니까?")) return;

      await deleteComment(c.id);

      const list = await getComments();

      setComments(
        list.filter(
          (item) => item.matchId === Number(params.id)
        )
      );
    }}
    className="mt-3 text-red-400 hover:text-red-300 font-bold"
  >
    삭제
  </button>
)}
</div>

))}

</div>

        </div>

      </div>

    </main>

  );

}