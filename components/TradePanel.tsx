"use client";

interface Props {
  selected: string;
  amount: number;
  point: number;
  onAmountChange: (value: number) => void;
  onSubmit: () => void;
}

export default function TradePanel({
  selected,
  amount,
  point,
  onAmountChange,
  onSubmit,
}: Props) {
  return (
    <div className="sticky top-24">

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">

        <h2 className="text-3xl font-black mb-8">
          예측 참여
        </h2>

        <div className="bg-slate-800 rounded-2xl p-5 mb-6">

  <p className="text-slate-400 text-sm">
    현재 선택
  </p>

  <h2 className="text-3xl font-black text-cyan-400 mt-2">
    {selected || "선택 안됨"}
  </h2>

</div>

        <div className="space-y-5">

          <div>

            <p className="text-slate-500 text-sm">
              선택
            </p>

            <div className="mt-2 rounded-xl bg-slate-800 px-4 py-3">

              <span className="text-xl font-bold text-cyan-400">
                {selected || "선택하세요"}
              </span>

            </div>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              보유 포인트
            </p>

            <h3 className="mt-2 text-3xl font-black text-yellow-400">
              {point.toLocaleString()}P
            </h3>

          </div>

          <div>

            <p className="text-slate-500 text-sm mb-3">
              투자 금액
            </p>

            <input
              type="number"
              value={amount}
              onChange={(e)=>
                onAmountChange(Number(e.target.value))
              }
              className="
              w-full
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              p-4
              text-center
              text-3xl
              font-black
              focus:border-cyan-500
              outline-none
              "
            />

          </div>

          <div className="grid grid-cols-2 gap-3">

            {[1000,5000,10000,50000].map((v)=>(

              <button
                key={v}
                onClick={()=>onAmountChange(amount+v)}
                className="
                rounded-xl
                bg-slate-800
                py-3
                font-bold
                hover:bg-slate-700
                transition
                "
              >
                +{v.toLocaleString()}
              </button>

            ))}

          </div>

          <div className="rounded-2xl bg-slate-800 p-5">

  <div className="flex justify-between items-center">

    <span className="text-slate-400">

      예상 지급

    </span>

    <strong className="text-3xl font-black text-green-400">

      {(amount * 1.8).toLocaleString()}P

    </strong>

  </div>

  <div className="mt-4 h-2 rounded-full bg-slate-700 overflow-hidden">

    <div
      className="h-full bg-green-400 transition-all"
      style={{
        width: `${Math.min((amount / Math.max(point, 1)) * 100, 100)}%`,
      }}
    />

  </div>

</div>

          <button
  disabled={!selected}
  onClick={onSubmit}
  className="
  w-full
  rounded-2xl
  bg-gradient-to-r
  from-cyan-500
  to-blue-500
  py-5
  text-xl
  font-black
  hover:scale-[1.02]
  duration-200
  "
>

            예측 참여

          </button>

        </div>

      </div>

    </div>
  );
}