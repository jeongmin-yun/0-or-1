import { supabase } from "./supabase";

export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export async function getNotices(): Promise<Notice[]> {
  const { data } = await supabase
    .from("notices")
    .select("*")
    .order("id", { ascending: false });

  return (data ?? []) as Notice[];
}

export async function saveNotice(
  notice: Omit<Notice, "id">
) {
  const { data, error } = await supabase
    .from("notices")
    .insert(notice)
    .select();

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  console.log("saveNotice", data, error);
}

export async function deleteNotice(id: number) {
  await supabase
    .from("notices")
    .delete()
    .eq("id", id);
}
export function subscribeNotices(
  callback: () => void
) {
  return supabase
    .channel("notices-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notices",
      },
      callback
    )
    .subscribe();
}