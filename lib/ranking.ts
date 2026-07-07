import { getUsers } from "./auth";

export interface RankingUser {
  rank: number;
  nickname: string;
  point: number;
}

export function getRanking(): RankingUser[] {

  const users = getUsers();

  return users
    .sort((a, b) => b.point - a.point)
    .map((user, index) => ({
      rank: index + 1,
      nickname: user.nickname,
      point: user.point,
    }));

}