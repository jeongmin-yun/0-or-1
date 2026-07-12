import { supabase } from "./supabase";
import { getUsers, updateUser } from "./auth";

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

type PredictionRow = {
  id: number;
  user_id: string;
  match_id: number;
  type: "sports" | "social" | "economy";
  title: string;
  choice: string;
  point: number;
  reward: number;
  status: "WAIT" | "WIN" | "LOSE";
  date: string;
};

function toRow(prediction: Prediction): PredictionRow {
  return {
    id: prediction.id,
    user_id: prediction.userId,
    match_id: prediction.matchId,
    type: prediction.type,
    title: prediction.title,
    choice: prediction.choice,
    point: prediction.point,
    reward: prediction.reward,
    status: prediction.status,
    date: prediction.date,
  };
}

function fromRow(row: PredictionRow): Prediction {
  return {
    id: row.id,
    userId: row.user_id,
    matchId: row.match_id,
    type: row.type,
    title: row.title,
    choice: row.choice,
    point: row.point,
    reward: row.reward,
    status: row.status,
    date: row.date,
  };
}

export async function getPredictions(): Promise<Prediction[]> {
  const { data } = await supabase
    .from("predictions")
    .select("*");

  return (data ?? []).map((row) => fromRow(row as PredictionRow));
}

export async function savePrediction(prediction: Prediction) {
  const { data } = await supabase
    .from("predictions")
    .select("id")
    .eq("user_id", prediction.userId)
    .eq("match_id", prediction.matchId)
    .eq("type", prediction.type)
    .maybeSingle();

  if (data) {
    alert("이미 이 경기에 베팅했습니다.");
    return;
  }

  await supabase
    .from("predictions")
    .insert(toRow(prediction));
}

export async function updatePredictions(list: Prediction[]) {
  if (list.length === 0) return;

  await supabase
    .from("predictions")
    .upsert(
      list.map(toRow),
      { onConflict: "id" }
    );
}

export async function settleMatch(
  matchId: number,
  type: "sports" | "social" | "economy",
  result: string
) {
  if (typeof window === "undefined") return;

  const predictions = await getPredictions();
  const users = await getUsers();
  const modifiedUserIds = new Set<string>();

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
      modifiedUserIds.add(user.id);
    } else {
      prediction.status = "LOSE";
      prediction.reward = 0;
    }
  });

  for (const user of users) {
    if (modifiedUserIds.has(user.id)) {
      await updateUser(user);
    }
  }

  await updatePredictions(predictions);
}

export function subscribePredictions(
  callback: () => void
) {
  return supabase
    .channel("predictions-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "predictions",
      },
      callback
    )
    .subscribe();
}
