import { Run } from "../types/Run";

export type dataValue = {
  x: string;
  y: string;
  value: number;
};

function getDayOfYear(str: string) {
  const date = new Date(str);
  const janFirst = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - janFirst.getTime()) / 86400000);
}

function getHeatMapData(runs: Run[]) {
  const mapDistanceToDays = runs.reduce((map: { [day: number]: number }, r) => {
    const day = getDayOfYear(r.date);
    if (map[day]) {
      map[day] += r.distance;
    } else {
      map[day] = r.distance;
    }
    return map;
  }, {});

  const today = new Date();
  const janFirst = new Date(today.getFullYear(), 0, 0);
  const days = Math.floor((today.getTime() - janFirst.getTime()) / 86400000);

  const data: dataValue[] = [];
  for (let i = 0; i <= days; i++) {
    data.push({
      x: Math.floor((janFirst.getDay() + i) / 7).toString(),
      y: ((janFirst.getDay() + i) % 7).toString(),
      value: mapDistanceToDays[i] || 0,
    });
  }

  return data;
}

export default getHeatMapData;
