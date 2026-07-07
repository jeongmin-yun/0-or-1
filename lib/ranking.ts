import { getUsers } from "./auth";

export interface RankingUser {
  rank: number;
  nickname: string;
  point: number;

  winRate: number;
  profit: number;
  totalPrediction: number;
  recent: string[];
}

export function getRanking(): RankingUser[] {

  const users = getUsers();

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
        "토트넘 승리 적중",
        "금 가격 상승 예측"
      ]

    }));

}