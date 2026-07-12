export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

      <div className="text-center">

        <h1 className="text-6xl font-black text-cyan-500">
          PICKS
        </h1>

        <p className="mt-6 text-slate-500 text-xl">
          Loading...
        </p>

        <div className="mt-8 flex justify-center">

          <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

        </div>

      </div>

    </main>
  );
}