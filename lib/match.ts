import { supabase } from "./supabase";

export interface Match {
  id: number;
  title: string;
  description: string;
  type: string;
  people: number;
  yes: number;
  no: number;
  probability: number;
  confidence: number;
}

export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function saveMatch(match: Match) {
  const { error } = await supabase
    .from("matches")
    .insert([match]);

  if (error) {
    console.error(error);
    alert(JSON.stringify(error));
  }
}

export function subscribeMatches(
  callback: () => void
) {
  return supabase
    .channel("matches-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "matches",
      },
      callback
    )
    .subscribe();
}