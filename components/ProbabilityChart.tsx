"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    time: number;
    value: number;
  }[];
}

export default function ProbabilityChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-black text-white">
            Probability Chart
          </h2>

          <p className="text-slate-400 mt-2">
            실시간 확률 변화
          </p>

        </div>

        <div className="flex gap-2">

          <button className="bg-cyan-500 px-4 py-2 rounded-xl font-bold">
            ALL
          </button>

          <button className="bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700">
            1M
          </button>

          <button className="bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700">
            1W
          </button>

          <button className="bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700">
            1D
          </button>

        </div>

      </div>

      <div className="h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={5}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}