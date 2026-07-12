import { supabase } from "./supabase";

export interface Comment {
  id: number;
  matchId: number;
  nickname: string;
  content: string;
  date: string;
}

export async function getComments(): Promise<Comment[]> {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .order("id", { ascending: false });

  return (data ?? []).map((item: any) => ({
    id: item.id,
    matchId: item.matchid,
    nickname: item.nickname,
    content: item.content,
    date: item.date,
  }));
}

export async function saveComment(comment: Comment) {
  const { error } = await supabase
    .from("comments")
    .insert({
      id: comment.id,
      matchid: comment.matchId,
      nickname: comment.nickname,
      content: comment.content,
      date: comment.date,
    });

  if (error) {
    alert(JSON.stringify(error));
    console.log(error);
  }
}
export function subscribeComments(
  callback: () => void
) {
  return supabase
    .channel("comments-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "comments",
      },
      callback
    )
    .subscribe();
}