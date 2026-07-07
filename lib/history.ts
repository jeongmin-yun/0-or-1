export interface PredictionHistory {
  matchId: number;
  title: string;
  choice: "YES" | "NO";
  point: number;
  date: string;
  result?: "WIN" | "LOSE";
}

const KEY = "prediction-history";

export function getHistory(): PredictionHistory[] {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function addHistory(history: PredictionHistory) {
  const list = getHistory();

  list.unshift(history);

  localStorage.setItem(KEY, JSON.stringify(list));
}
export function updateHistory(
  matchId: number,
  result: "WIN" | "LOSE"
) {
  const list = getHistory();

  list.forEach((item) => {
    if (item.matchId === matchId) {
      item.result = result;
    }
  });

  localStorage.setItem(KEY, JSON.stringify(list));
}