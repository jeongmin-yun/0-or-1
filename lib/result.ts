import { supabase } from "./supabase";

export interface Result {
  matchId: number;
  type: "sports" | "social" | "economy";
  result: "YES" | "NO";
}

type ResultRow = {
  match_id: number;
  type: "sports" | "social" | "economy";
  result: "YES" | "NO";
};

function toRow(result: Result): ResultRow {
  return {
    match_id: result.matchId,
    type: result.type,
    result: result.result,
  };
}

function fromRow(row: ResultRow): Result {
  return {
    matchId: row.match_id,
    type: row.type,
    result: row.result,
  };
}

export async function getResults(): Promise<Result[]> {
  const { data, error } = await supabase
    .from("match_results")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map((row) => fromRow(row as ResultRow));
}

export async function saveResult(result: Result) {
  const { error } = await supabase
    .from("match_results")
    .upsert(toRow(result), {
      onConflict: "match_id,type",
    });

  if (error) {
    console.error(error);
  }
}

export function subscribeResults(
  callback: () => void
) {
  return supabase
    .channel("results-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "match_results",
      },
      callback
    )
    .subscribe();
}