export interface Comment {
  id: number;
  matchId: number;
  nickname: string;
  content: string;
  date: string;
}

const KEY = "comments";

export function getComments(): Comment[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];
}

export function saveComment(comment: Comment) {
  if (typeof window === "undefined") return;

  const list = getComments();

  list.unshift(comment);

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );
}