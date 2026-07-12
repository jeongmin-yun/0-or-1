import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-8xl font-black text-cyan-500">
          404
        </h1>

        <h2 className="text-4xl font-black mt-6">
          페이지를 찾을 수 없습니다.
        </h2>

        <p className="text-slate-500 mt-4 text-lg">
          요청한 페이지가 존재하지 않거나 삭제되었습니다.
        </p>

        <Link
          href="/"
          className="inline-block mt-10 bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl font-black text-xl"
        >
          🏠 PICKS 홈으로
        </Link>

      </div>

    </main>
  );
}