export interface Result {
  matchId: number;
  type: "sports" | "social" | "economy";
  result: "YES" | "NO";
}

const KEY = "match-result";

export function getResults(): Result[] {

  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);

}

export function saveResult(result: Result) {

  const list = getResults();

  const exist = list.find(

    (item) =>
      item.matchId === result.matchId &&
      item.type === result.type

  );

  if (exist) {

    exist.result = result.result;

  } else {

    list.push(result);

  }

  localStorage.setItem(
    KEY,
    JSON.stringify(list)
  );

}