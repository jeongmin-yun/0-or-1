"use client";

import { 
  getNotices,
  type Notice, 
} from "@/lib/notice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLoginUser, logout } from "@/lib/auth";
import { getRanking } from "@/lib/ranking";
import { getUsers } from "@/lib/auth";
import { getPredictions } from "@/lib/prediction";

import { matches } from "@/lib/data";
import { social } from "@/lib/social";
import { economy } from "@/lib/economy";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  async function load() {

    setUser(getLoginUser());

    const userList = await getUsers();
setUsers(userList);

const predictionList = await getPredictions();
setPredictions(predictionList);

    setResults(
      JSON.parse(localStorage.getItem("match-result") || "[]")
    );

    const ranking = await getRanking();
    setTopUsers(ranking.slice(0, 5));

    const noticeList = await
    getNotices();
    setNotices(noticeList);
  }

  load();
}, []);


const totalMatches =
  matches.length +
  social.length +
  economy.length;

const waitingMatches =
  totalMatches - results.length;
  const categories = [
    {
      title: "스포츠",
      icon: "⚽",
      description: "축구 · 야구 · 농구 · e스포츠",
      href: "/sports",
      color: "hover:border-cyan-400",
    },
    {
      title: "사회",
      icon: "📰",
      description: "정치 · 사건 · 국제",
      href: "/social",
      color: "hover:border-purple-400",
    },
    {
      title: "경제",
      icon: "📈",
      description: "주식 · 코인 · 환율",
      href: "/economy",
      color: "hover:border-green-400",
    },
  ];

  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function loadNotices() {
      const list = await getNotices();
      setNotices(list);
    }
    loadNotices();
  }, []);

const allPredictions = [

  
  ...matches.map((item) => ({
    ...item,
    type: "sports",
  })),

  ...social.map((item) => ({
    ...item,
    type: "social",
  })),

  ...economy.map((item) => ({
    ...item,
    type: "economy",
  })),

];

const hotPredictions = [...allPredictions]
  .sort((a, b) => b.people - a.people)
  .slice(0, 5);

const filteredPredictions = allPredictions.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);
if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Background */}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_45%)] pointer-events-none"></div>

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">

        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

          <Link
            href="/"
            className="text-6xl font-black text-cyan-400 tracking-tight"
          >
            PICKS
          </Link>

          <nav className="flex gap-8 text-sm font-semibold">

            <Link href="/">홈</Link>

            <Link href="/sports">스포츠</Link>

            <Link href="/social">사회</Link>

            <Link href="/economy">경제</Link>

            <Link href="/report">리포트</Link>

            <Link href="/community">커뮤니티</Link>

            <Link href="/ranking">랭킹</Link>

          </nav>

          <div className="flex items-center gap-6">

  {user ? (

    <>

      <div className="text-right">

        <p className="text-xs text-slate-500">
          {user.nickname}
        </p>

        <p className="text-lg font-black text-yellow-400">
          {user.point.toLocaleString()}P
        </p>

      </div>

      <Link
        href="/mypage"
        className="bg-cyan-500 px-5 py-2 rounded-xl font-bold"
      >
        마이페이지
      </Link>

      {user.id === "admin" && (
  <Link
    href="/admin"
    className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold"
  >
    관리자
  </Link>
)}

      <button
        onClick={() => {
          logout();
          location.reload();
        }}
        className="bg-red-500 px-5 py-2 rounded-xl font-bold"
      >
        로그아웃
      </button>

    </>

  ) : (

    <>

      <Link
        href="/login"
        className="bg-cyan-500 px-5 py-2 rounded-xl font-bold"
      >
        로그인
      </Link>

      <Link
        href="/signup"
        className="border border-cyan-500 text-cyan-400 px-5 py-2 rounded-xl font-bold"
      >
        회원가입
      </Link>

    </>

  )}

</div>

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 border border-cyan-500 bg-cyan-500/10 px-4 py-2 rounded-full mb-6">

              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>

              <span className="text-cyan-300 text-sm font-semibold">
                대한민국 최초 가상 포인트 예측 투자 플랫폼
              </span>

            </div>

            <h1 className="text-7xl font-black leading-tight mb-8">

              People's

              <br />

              Insight

              <br />

              Collective

              <br />

              Knowledge

              <br />

              Service

            </h1>

            <p className="text-xl text-slate-400 leading-10 mb-10">

              가입 즉시

              <span className="text-yellow-400 font-bold">
                {" "}100,000P
              </span>

              를 지급받고,

              실제 돈이 아닌 가상 포인트로

              다양한 이벤트를 예측하며

              최고의 수익률에 도전하세요.

            </p>

            <div className="flex gap-5">

              <Link
                href="/sports"
                className="
                bg-cyan-500
                hover:bg-cyan-400
                transition
                active:scale-95
                px-8
                py-4
                rounded-2xl
                font-black
                "
              >
                예측 시작하기
              </Link>

              <Link
                href="/ranking"
                className="
                border
                border-slate-700
                hover:border-cyan-400
                transition
                px-8
                py-4
                rounded-2xl
                font-bold
                "
              >
                수익률 랭킹
              </Link>

            </div>

          </div>

                    {/* RIGHT */}

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7">

              <p className="text-slate-400 mb-2">
                가입 보너스
              </p>

              <h2 className="text-4xl font-black text-yellow-400">
                100,000P
              </h2>

              <p className="text-sm text-slate-500 mt-3">
                신규 회원 지급
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7">

              <p className="text-slate-400 mb-2">
                진행중 예측
              </p>

              <h2 className="text-4xl font-black text-cyan-400">
                {waitingMatches}
              </h2>

              <p className="text-sm text-slate-500 mt-3">
                현재 진행 중
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7">

              <p className="text-slate-400 mb-2">
                누적 회원
              </p>

              <h2 className="text-4xl font-black">
                {users.length}
              </h2>

              <p className="text-sm text-slate-500 mt-3">
                실시간 가입자
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7">

              <p className="text-slate-400 mb-2">
                지급 리워드
              </p>

              <h2 className="text-4xl font-black text-green-400">
                {predictions.length * 1800}P
              </h2>

              <p className="text-sm text-slate-500 mt-3">
                누적 지급 포인트
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* HOT PREDICTIONS */}

      <section className="max-w-7xl mx-auto px-8 mb-20">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-black">

            🔥 실시간 인기 예측

            <div className="mb-8">

  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="🔍 예측 검색..."
    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 text-lg focus:border-cyan-400 outline-none"
  />

</div>

{search !== "" && (

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

    {filteredPredictions.length === 0 ? (

      <p className="text-slate-500">
        검색 결과가 없습니다.
      </p>

    ) : (

      filteredPredictions.map((item) => (

        <Link
          key={`${item.type}-${item.id}`}
          href={
            item.type === "sports"
              ? `/sports/${item.id}`
              : item.type === "social"
              ? `/social/${item.id}`
              : `/economy/${item.id}`
          }
          className="block border-b border-slate-800 py-4 hover:text-cyan-400"
        >

          {item.title}

        </Link>

      ))

    )}

  </div>

)}

          </h2>

          <Link
            href="/sports"
            className="text-cyan-400 hover:underline"
          >
            인기순 TOP5 →
          </Link>

        </div>

        <div className="grid lg:grid-cols-5 gap-5">

          {hotPredictions.map((item, index) => (

            <Link
              key={`${item.type}-${item.id}`}
              href={
                item.type === "sports"
                  ? `/sports/${item.id}`
                  : item.type === "social"
                  ? `/social/${item.id}`
                  : `/economy/${item.id}`
              }
              className="
                bg-slate-900
                border
                border-slate-800
                hover:border-cyan-400
                transition
                rounded-3xl
                p-6
                cursor-pointer
                block
              "
            >

              <div className="text-red-400 text-sm font-bold mb-4">

                {
  item.type === "sports"
    ? "⚽ SPORTS"
    : item.type === "social"
    ? "📰 SOCIAL"
    : "📈 ECONOMY"
}

              </div>

              <h3 className="font-bold leading-8 mb-6">

                {item.title}

              </h3>

              <div className="flex justify-between text-sm">

                <span className="text-green-400">

                  YES {item.yes}%

                </span>

                <span className="text-red-400">

                  NO {item.no}%

                </span>

              </div>
              <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden flex">

  <div
    className="bg-green-400"
    style={{
      width: `${item.yes}%`,
    }}
  />

  <div
    className="bg-red-400"
    style={{
      width: `${item.no}%`,
    }}
  />

</div>

            </Link>

          ))}

        </div>

      </section>

      {/* CATEGORY */}

      <section className="max-w-7xl mx-auto px-8 mb-20">

        <h2 className="text-4xl font-black mb-10">

          📂 카테고리

        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          {categories.map((category) => (

            <Link
              key={category.title}
              href={category.href}
              className={`
                bg-slate-900
                border
                border-slate-800
                ${category.color}
                transition
                rounded-3xl
                p-10
                group
              `}
            >

              <div className="text-6xl mb-6">

                {category.icon}

              </div>

              <h3 className="text-3xl font-black mb-4">

                {category.title}

              </h3>

              <p className="text-slate-400">

                {category.description}

              </p>

            </Link>

          ))}

        </div>

      </section>

            {/* TOP USERS */}

      <section className="max-w-7xl mx-auto px-8 mb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-black">

            🏆 수익률 TOP 5

          </h2>

          <Link
            href="/ranking"
            className="text-cyan-400 hover:underline"
          >
            전체 랭킹 →
          </Link>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          {topUsers.map((user) => (

            <div
              key={user.rank}
              className="
                flex
                items-center
                justify-between
                px-8
                py-6
                border-b
                last:border-0
                border-slate-800
                hover:bg-slate-800/40
                transition
              "
            >

              <div className="flex items-center gap-6">

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-cyan-500
                    flex
                    items-center
                    justify-center
                    font-black
                  "
                >

                  {user.rank}

                </div>

                <div>

                  <h3 className="text-xl font-black">

                    {user.nickname}

                  </h3>

                  <p className="text-sm text-slate-400">

                    현재 {user.rank}위

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-green-400 text-2xl font-black">

                  {user.point.toLocaleString()}P

                </p>

                <p className="text-sm text-slate-500">

                  실시간 랭킹

                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* NOTICE */}

      <section className="max-w-7xl mx-auto px-8 mb-20">

        <h2 className="text-4xl font-black mb-10">

          📢 공지사항

        </h2>

        <div className="space-y-5">

  {notices.length === 0 ? (

    <p className="text-slate-500">
      등록된 공지가 없습니다.
    </p>

  ) : (

    notices.map((notice) => (

      <div
        key={notice.id}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400 transition"
      >

        <h3 className="font-bold text-lg mb-2">
          {notice.title}
        </h3>

        <p className="text-slate-400">
          {notice.content}
        </p>

        <p className="text-slate-600 mt-3 text-sm">
          {notice.date}
        </p>

      </div>

    ))

  )}

</div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-12">

        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <h2 className="text-3xl font-black text-cyan-400 mb-3">

              PICKS

            </h2>

            <p className="text-slate-500 leading-8">

              대한민국 가상 포인트 기반

              <br />

              예측 투자 플랫폼

            </p>

          </div>

          <div className="text-slate-500 leading-8">

            © 2026 PICKS

            <br />

            All Rights Reserved.

          </div>

        </div>

      </footer>

    </main>

  );

}