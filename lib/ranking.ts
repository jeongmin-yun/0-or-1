import {
  getUsers,
} from "./auth";

import { supabase } from "./supabase";

export interface RankingUser {
  rank: number;
  nickname: string;
  point: number;
  winRate: number;
  profit: number;
  totalPrediction: number;
  recent: string[];
}

export async function getRanking(): Promise<RankingUser[]> {

  const users = await getUsers();

  return users
    .sort((a, b) => b.point - a.point)
    .map((user, index) => ({

      rank: index + 1,
      nickname: user.nickname,
      point: user.point,

      winRate: Math.floor(Math.random() * 20) + 80,
      profit: Math.floor(Math.random() * 80) + 20,
      totalPrediction: Math.floor(Math.random() * 500) + 100,

      recent: [
        "삼성전자 상승 예측 성공",
        "LG 트윈스 승리 적중",
        "비트코인 상승 예측",
        "맨체스터시티 승리 적중",
        "금 가격 상승 예측"
      ]

    }));
}
export function subscribeRanking(
  callback: () => void
) {
  return supabase
    .channel("ranking-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
      },
      callback
    )
    .subscribe();
}