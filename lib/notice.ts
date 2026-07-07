export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

const KEY = "notice";

export function getNotices(): Notice[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveNotice(notice: Notice) {
  if (typeof window === "undefined") return;

  const list = getNotices();

  list.unshift(notice);

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );
}

export function deleteNotice(id: number) {
  if (typeof window === "undefined") return;

  const list = getNotices().filter(
    (n) => n.id !== id
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );
}