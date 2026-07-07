export interface Prediction {
  id: number;
  userId: string;
  matchId: number;

  type: "sports" | "social" | "economy";

  title: string;
  choice: string;
  point: number;
  reward: number;
  status: "WAIT" | "WIN" | "LOSE";
  date: string;
}

const KEY = "predictions";

export function getPredictions(): Prediction[] {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function savePrediction(prediction: Prediction) {
  const list = getPredictions();

  list.push(prediction);

  localStorage.setItem(KEY, JSON.stringify(list));
}

export function updatePredictions(list: Prediction[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

import { getUsers } from "./auth";

export function settleMatch(
  matchId: number,
  type: "sports" | "social" | "economy",
  result: string
) {

  const predictions = getPredictions();

  const users = getUsers();

  predictions.forEach((prediction) => {

    if (
      prediction.matchId !== matchId ||
      prediction.type !== type
    ) {
      return;
    }

    const user = users.find(
      (u) => u.id === prediction.userId
    );

    if (!user) return;

    if (prediction.choice === result) {

      prediction.status = "WIN";

      prediction.reward = Math.floor(
        prediction.point * 1.8
      );

      user.point += prediction.reward;

    } else {

      prediction.status = "LOSE";

      prediction.reward = 0;

    }

  });

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  updatePredictions(predictions);

}