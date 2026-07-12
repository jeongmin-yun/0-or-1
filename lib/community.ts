import { supabase } from "./supabase";

export interface CommunityComment {
  id: number;
  post_id: number;
  writer: string;
  content: string;
  date: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  writer: string;
  date: string;
  views: number;
}

export async function getPosts(): Promise<CommunityPost[]> {
  const { data, error } = await supabase
    .from("community_posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function savePost(post: CommunityPost) {
  const { error } = await supabase
    .from("community_posts")
    .insert(post);

  if (error) console.error(error);
}

export async function updatePost(post: CommunityPost) {
  const { error } = await supabase
    .from("community_posts")
    .update({
      title: post.title,
      content: post.content,
      writer: post.writer,
      date: post.date,
      views: post.views,
    })
    .eq("id", post.id);

  if (error) console.error(error);
}

export async function deletePost(id: number) {
  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
}

export async function getPost(id: number) {
  const { data } = await supabase
    .from("community_posts")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export async function getComments(
  postId: number
): Promise<CommunityComment[]> {
  const { data, error } = await supabase
    .from("community_comments")
    .select("*")
    .eq("post_id", postId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function saveComment(
  comment: CommunityComment
) {
  const { error } = await supabase
    .from("community_comments")
    .insert(comment);

  if (error) console.error(error);
}

export async function deleteComment(id: number) {
  const { error } = await supabase
    .from("community_comments")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
}

export function subscribePosts(
  callback: () => void
) {
  return supabase
    .channel("community-posts")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "community_posts",
      },
      callback
    )
    .subscribe();
}

export function subscribeComments(
  callback: () => void
) {
  return supabase
    .channel("community-comments")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "community_comments",
      },
      callback
    )
    .subscribe();
}