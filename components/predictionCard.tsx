"use client";

import Link from "next/link";

type PredictionCardProps = {
  id: number;
  title: string;
  description: string;
  yes: number;
  no: number;
  people: number;
  league?: string;
  category: string;
  href: string;
};

export default function PredictionCard({
  id,
  title,
  description,
  yes,
  no,
  people,
  league,
  category,
  href,
}: PredictionCardProps) {

  return (

    <Link href={`${href}/${id}`}>

      <div className="bg-white rounded-3xl border border-gray-200 shadow hover:shadow-lg transition p-8">

        <div className="flex justify-between">

          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">

            LIVE

          </span>

          <span className="text-blue-600 font-bold">

            {league || category}

          </span>

        </div>

        <h2 className="text-3xl font-black mt-6">

          {title}

        </h2>

        <p className="text-gray-500 mt-2">

          {description}

        </p>

        <div className="flex justify-between mt-8">

          <span className="text-green-600 font-bold">

            YES {yes}%

          </span>

          <span className="text-red-500 font-bold">

            NO {no}%

          </span>

        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-3 flex">

          <div
            className="bg-green-500"
            style={{ width: `${yes}%` }}
          />

          <div
            className="bg-red-500"
            style={{ width: `${no}%` }}
          />

        </div>

        <p className="text-gray-500 mt-6">

          참여자 {people.toLocaleString()}명

        </p>

      </div>

    </Link>

  );

}