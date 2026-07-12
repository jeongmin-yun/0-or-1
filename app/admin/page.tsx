"use client";

import TopNavigation from "@/components/TopNavigation";
import { useEffect, useState } from "react";
import {
  getNotices,
  saveNotice,
  deleteNotice,
  subscribeNotices,
  type Notice,
} from "@/lib/notice";
import { matches } from "@/lib/data";
import { social } from "@/lib/social";
import { economy } from "@/lib/economy";

import { 
  saveResult,
getResults,
subscribeResults,
} from "@/lib/result";
import {
  settleMatch,
  getPredictions,
  subscribePredictions,
} from "@/lib/prediction";
import {
  refreshLoginUser,
  getUsers,
  type User,
  addPoint,
  subtractPoint,
  deleteUser,
} from "@/lib/auth";
import { saveMatch } from "@/lib/match"; 

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [matchTitle, setMatchTitle] = useState("");
  const [matchDesc, setMatchDesc] = useState("");
  const [matchCategory, setMatchCategory] = useState("축구");

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
  const [users, setUsers] = useState<User[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);

useEffect(() => {
  async function load() {
    const userlist = await getUsers();
    setUsers(userlist);

    const noticeList = await getNotices();
    setNotices(noticeList);

    const resultList = await getResults();
    setResults(resultList);

    const predictionList = await getPredictions();
    setPredictions(predictionList);
  }

  load();

  const resultChannel = subscribeResults(load);
  const predictionChannel =
  subscribePredictions(load);
  const noticeChannel =
  subscribeNotices(load);

  return () => {
  resultChannel.unsubscribe();
  predictionChannel.unsubscribe();
  noticeChannel.unsubscribe();
};
}, []);

const yesCount = results.filter(
  (r: any) => r.result === "YES"
).length;

const noCount = results.filter(
  (r: any) => r.result === "NO"
).length;

  return (

  <main className="min-h-screen bg-slate-100 p-10">

    <TopNavigation />

    <h1 className="text-5xl font-black mb-10">

      관리자

    </h1>

      <div className="bg-white rounded-3xl shadow p-6 mb-10">

  <h2 className="text-3xl font-black mb-5">
    경기 추가
  </h2>

  <input
    className="border rounded-xl p-3 w-full mb-3"
    placeholder="제목"
    value={matchTitle}
    onChange={(e)=>setMatchTitle(e.target.value)}
  />

  <input
    className="border rounded-xl p-3 w-full mb-3"
    placeholder="설명"
    value={matchDesc}
    onChange={(e)=>setMatchDesc(e.target.value)}
  />

  <select
    className="border rounded-xl p-3 w-full mb-5"
    value={matchCategory}
    onChange={(e)=>setMatchCategory(e.target.value)}
  >
    <option>축구</option>
    <option>야구</option>
    <option>e스포츠</option>
    <option>사회</option>
    <option>경제</option>
  </select>

  <button
    className="bg-cyan-500 text-white px-6 py-3 rounded-xl"
    onClick={async()=>{

      await saveMatch({
        id: Date.now(),
        title: matchTitle,
        description: matchDesc,
        type: matchCategory,
        people: 0,
        yes: 50,
        no: 50,
        probability: 50,
        confidence: 50,
      });

      alert("등록 완료");

      setMatchTitle("");
      setMatchDesc("");

    }}
  >
    경기 등록
  </button>

</div>

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

                onClick={async () => {

                  saveResult({

  matchId: match.id,

  type: match.type,

  result: "YES",

});

                  await settleMatch(match.id, match.type, "YES");

                  refreshLoginUser();

                  alert("YES 결과가 반영되었습니다.");

                }}

                className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold"

              >

                YES 승리

              </button>

              <button

                onClick={async () => {

                  saveResult({
                    matchId: match.id,

                    type: match.type,

                    result: "NO",
                  });

                  await settleMatch(match.id, match.type, "NO");

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

            onClick={async () => {

              await addPoint(user.id, 10000);

              const userList = await getUsers();
              setUsers(userList);

              refreshLoginUser();
            }}

            className="bg-green-500 text-white px-3 py-2 rounded-lg"

          >

            +1만P

          </button>

          <button

            onClick={async () => {

              await subtractPoint(user.id, 10000);

              const userList = await getUsers();
              setUsers(userList);

              refreshLoginUser();
            }}

            className="bg-red-500 text-white px-3 py-2 rounded-lg"

          >

            -1만P

          </button>

          <button

  onClick={async () => {

    if (user.id === "admin") {
      alert("관리자 계정은 삭제할 수 없습니다.");
      return;
    }

    if (!confirm(`${user.nickname} 회원을 삭제하시겠습니까?`)) {
      return;
    }

    await deleteUser(user.id);

    const userList = await getUsers();
    setUsers(userList);

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

  

    <div className="space-y-3 mb-5">

      <input
        value={title}
        onChange={(e) =>
    setTitle(e.target.value)}
        placeholder="공지 제목"
        className="w-full border
    rounded-xl p-3"
      />

      <textarea
        value={content}
        onChange={(e) =>
    setContent(e.target.value)}
        placeholder="공지 내용"
        className="w-full border
    rounded-xl p-3 h-32"
      />
    
    </div>

    <button
    onClick={async () => {

      if (!title.trim()) return;

      if (!content.trim()) return;

      await saveNotice({
        title,
        content,
        date: new 
    Date().toLocaleDateString(),
});

const list = await getNotices();
setNotices(list);

  setTitle("");
  setContent("");

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
          onClick={async () => {

            await deleteNotice(notice.id);

const list = await getNotices();
setNotices(list);

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