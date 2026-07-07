export interface Comment {
  id: number;
  matchId: number;
  nickname: string;
  content: string;
  date: string;
}

const KEY = "comments";

export function getComments(): Comment[] {
  const data = localStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];
}

export function saveComment(comment: Comment) {
  const list = getComments();

  list.unshift(comment);

  localStorage.setItem(KEY, JSON.stringify(list));
}