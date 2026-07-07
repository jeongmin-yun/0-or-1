export interface CommunityComment {
  id: number;
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
  comments: CommunityComment[];
}

const KEY = "community";

export function getPosts(): CommunityPost[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function savePost(post: CommunityPost) {
  if (typeof window === "undefined") return;

  const list = getPosts();
  list.unshift(post);

  localStorage.setItem(KEY, JSON.stringify(list));
}

export function updatePosts(list: CommunityPost[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getPost(id: number) {
  return getPosts().find((p) => p.id === id);
}