export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

const KEY = "notice";

export function getNotices(): Notice[] {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveNotice(notice: Notice) {

  const list = getNotices();

  list.unshift(notice);

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );

}

export function deleteNotice(id: number) {

  const list = getNotices().filter(
    (n) => n.id !== id
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );

}