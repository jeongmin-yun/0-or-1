"use client";

import {
  getNotices,
  saveNotice,
  deleteNotice,
} from "@/lib/notice";
import { matches } from "@/lib/data";
import { social } from "@/lib/social";
import { economy } from "@/lib/economy";

import { saveResult } from "@/lib/result";
import { settleMatch } from "@/lib/prediction";
import {
  refreshLoginUser,
  getUsers,
} from "@/lib/auth";

export default function AdminPage() {

  const allMatches = [
    

    ...matches.map((m) => ({
      ...m,
      type: "sports" as const,
    })),

    ...social.map((m) => ({
      ...m,
      type: "social" as const,
    })),

    ...economy.map((m) => ({
      ...m,
      type: "economy" as const,
    })),

  ];
  const users = getUsers();
  const notices = getNotices();

const predictions =
  typeof window === "undefined"
    ? []
    : JSON.parse(localStorage.getItem("predictions") || "[]");

const results =
  typeof window === "undefined"
    ? []
    : JSON.parse(localStorage.getItem("match-result") || "[]");

const yesCount = results.filter(
  (r: any) => r.result === "YES"
).length;

const noCount = results.filter(
  (r: any) => r.result === "NO"
).length;

  return (

    <main className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-5xl font-black mb-10">

        관리자

      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      회원수
    </p>

    <h2 className="text-3xl font-black">
      {users.length}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      총 예측
    </p>

    <h2 className="text-3xl font-black">
      {predictions.length}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      경기
    </p>

    <h2 className="text-3xl font-black">
      {allMatches.length}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      결과 등록
    </p>

    <h2 className="text-3xl font-black text-cyan-500">
      {results.length}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      YES
    </p>

    <h2 className="text-3xl font-black text-green-500">
      {yesCount}
    </h2>

  </div>

  <div className="bg-white rounded-2xl shadow p-5">

    <p className="text-slate-500">
      NO
    </p>

    <h2 className="text-3xl font-black text-red-500">
      {noCount}
    </h2>

  </div>

</div>

      <div className="space-y-6">

        {allMatches.map((match) => (

          <div
            key={`${match.type}-${match.id}`}
            className="bg-white rounded-2xl shadow p-6"
          >

            <p className="text-sm font-bold mb-2">

              {match.type === "sports"
                ? "⚽ 스포츠"
                : match.type === "social"
                ? "📰 사회"
                : "📈 경제"}

            </p>

            <h2 className="text-2xl font-black mb-6">

              {match.title}

            </h2>

            <div className="flex gap-5">

              <button

                onClick={() => {

                  saveResult({

  matchId: match.id,

  type: match.type,

  result: "YES",

});

                  settleMatch(match.id, match.type, "YES");

                  refreshLoginUser();

                  alert("YES 결과가 반영되었습니다.");

                }}

                className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold"

              >

                YES 승리

              </button>

              <button

                onClick={() => {

                  saveResult({
                    matchId: match.id,

                    type: match.type,

                    result: "NO",
                  });

                  settleMatch(match.id, match.type, "NO");

                  refreshLoginUser();

                  alert("NO 결과가 반영되었습니다.");

                }}

                className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-xl font-bold"

              >

                NO 승리

              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-12">

  <h2 className="text-4xl font-black mb-6">

    회원 관리

    

  </h2>

  <div className="bg-white rounded-3xl shadow overflow-hidden">

    <div className="grid grid-cols-4 font-bold bg-slate-200 p-4">

      <div>ID</div>

      <div>닉네임</div>

      <div>포인트</div>

      <div>관리</div>

    </div>

    {users.map((user) => (

      <div
        key={user.id}
        className="grid grid-cols-4 p-4 border-b items-center"
      >

        <div>{user.id}</div>

        <div>{user.nickname}</div>

        <div>{user.point.toLocaleString()}P</div>

        <div className="flex gap-2">

          <button

            onClick={() => {

              user.point += 10000;

              if (typeof window === "undefined") return;

              localStorage.setItem(
                "users",
                JSON.stringify(users)
              );

              refreshLoginUser();

              location.reload();

            }}

            className="bg-green-500 text-white px-3 py-2 rounded-lg"

          >

            +1만P

          </button>

          <button

            onClick={() => {

              user.point = Math.max(
                0,
                user.point - 10000
              );

              if (typeof window === "undefined") return;

              localStorage.setItem(
                "users",
                JSON.stringify(users)
              );

              refreshLoginUser();

              location.reload();

            }}

            className="bg-red-500 text-white px-3 py-2 rounded-lg"

          >

            -1만P

          </button>

          <button

  onClick={() => {

    if (user.id === "admin") {

      alert("관리자 계정은 삭제할 수 없습니다.");

      return;

    }

    if (!confirm(`${user.nickname} 회원을 삭제하시겠습니까?`)) {

      return;

    }

    const newUsers = users.filter(
      (u) => u.id !== user.id
    );

    if (typeof window === "undefined") return;

    localStorage.setItem(
      "users",
      JSON.stringify(newUsers)
    );

    refreshLoginUser();

    location.reload();

  }}

  className="bg-slate-800 text-white px-3 py-2 rounded-lg"

>

  삭제

</button>

        </div>

      </div>

    ))}

   </div>

</div>

<div className="mt-12">

  <h2 className="text-4xl font-black mb-6">
    공지 관리
  </h2>

  <button
    onClick={() => {

      const title = prompt("공지 제목");
      if (!title) return;

      const content = prompt("공지 내용");
      if (!content) return;

      saveNotice({
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      });

      location.reload();

    }}
    className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold"
  >
    공지 작성
  </button>

  <div className="mt-6 space-y-4">

    {notices.map((notice) => (

      <div
        key={notice.id}
        className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
      >

        <div>

          <h3 className="font-black">
            {notice.title}
          </h3>

          <p className="text-slate-500">
            {notice.content}
          </p>

          <p className="text-slate-400 text-sm">
            {notice.date}
          </p>

        </div>

        <button
          onClick={() => {

            deleteNotice(notice.id);

            location.reload();

          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          삭제
        </button>

      </div>

    ))}

  </div>

</div>

</main>

);

}