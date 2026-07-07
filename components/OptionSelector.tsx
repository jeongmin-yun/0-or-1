"use client";

interface Option {
  id: number;
  name: string;
  percent: number;
}

interface Props {
  type: "binary" | "multiple";
  yes?: number;
  no?: number;
  options?: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function OptionSelector({
  type,
  yes,
  no,
  options,
  selected,
  onSelect,
}: Props) {

  if (type === "binary") {

    return (

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        <button
          onClick={() => onSelect("YES")}
          className={`
          rounded-3xl
          border-2
          p-8
          text-left
          transition

          ${
            selected==="YES"
            ? "border-green-400 bg-green-500/20"
            : "border-slate-700 bg-slate-900 hover:border-green-400"
          }
          `}
        >

          <p className="text-slate-400">
            YES
          </p>

          <h2 className="text-5xl font-black mt-2">
            {yes}%
          </h2>

        </button>

        <button
          onClick={() => onSelect("NO")}
          className={`
          rounded-3xl
          border-2
          p-8
          text-left
          transition

          ${
            selected==="NO"
            ? "border-red-400 bg-red-500/20"
            : "border-slate-700 bg-slate-900 hover:border-red-400"
          }
          `}
        >

          <p className="text-slate-400">
            NO
          </p>

          <h2 className="text-5xl font-black mt-2">
            {no}%
          </h2>

        </button>

      </div>

    );

  }

  return (

    <div className="space-y-4 mt-8">

      {options?.map((option)=>(

        <button
          key={option.id}
          onClick={()=>onSelect(option.name)}
          className={`
          w-full
          rounded-3xl
          border
          p-6
          transition
          flex
          justify-between
          items-center

          ${
            selected===option.name
            ? "border-cyan-400 bg-cyan-500/20"
            : "border-slate-700 bg-slate-900 hover:border-cyan-500"
          }
          `}
        >

          <div>

            <h3 className="text-2xl font-black">

              {option.name}

            </h3>

          </div>

          <div className="text-right">

            <h3 className="text-3xl font-black text-cyan-400">

              {option.percent}%

            </h3>

          </div>

        </button>

      ))}

    </div>

  );

}