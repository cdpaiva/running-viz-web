import * as d3 from "d3";
import { Run } from "../types/Run";

const runData: Run[] = [
  {
    location: "Durham Bulls Athletic Park",
    date: "2023-05-01",
    distance: 8000,
  },
  {
    location: "Sarah P. Duke Gardens",
    date: "2023-05-08",
    distance: 6000,
  },
  {
    location: "Durham Performing Arts Center",
    date: "2023-05-11",
    distance: 10000,
  },
  {
    location: "Museum of Life and Science",
    date: "2023-05-14",
    distance: 7000,
  },
  {
    location: "American Tobacco Campus",
    date: "2023-05-18",
    distance: 9000,
  },
  {
    location: "Durham Central Park",
    date: "2023-05-21",
    distance: 5000,
  },
];

// const getDate = d3.timeParse("%Y-%m-%d");
// const dates = runData.map((run) => getDate(run.date)?.toString() || "");
// var domain = d3.extent(dates);

// console.log(domain);

export type dataValue = {
  x: string;
  y: string;
  value: number;
};

const runsToHeatMap: any = {};
runData.forEach((r) => {
  const day = getDayOfYear(r.date);
  if (day in runsToHeatMap) {
    runsToHeatMap[day] += r.distance;
  } else {
    runsToHeatMap[day] = r.distance;
  }
});

const data: dataValue[] = [];
// for (let run of runData) {
//   const parsedDate = getDate(run.date);
//   console.log(parsedDate?.getDay().toString());
//   if (parsedDate) {
//     data.push({
//       x: getWeekNumber(parsedDate).toString(),
//       y: parsedDate.getDay().toString(),
//       value: run.distance,
//     });
//   }
// }
const today = new Date();
const janFirst = new Date(today.getFullYear(), 0, 0);
const days = Math.floor((today.getTime() - janFirst.getTime()) / 86400000);

for (let i = 0; i <= days; i++) {
  data.push({
    x: Math.floor((janFirst.getDay() + i) / 7).toString(),
    y: ((janFirst.getDay() + i) % 7).toString(),
    value: runsToHeatMap[i] || 0,
  });
}

function getDayOfYear(str: string) {
  const date = new Date(str);
  const janFirst = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - janFirst.getTime()) / 86400000);
}

// function getWeekNumber(date: Date) {
//   date.setHours(0, 0, 0, 0);
//   // Thursday in current week decides the year.
//   date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
//   // January 4 is always in week 1.
//   var week1 = new Date(date.getFullYear(), 0, 4);
//   // Adjust to Thursday in week 1 and count number of weeks from date to week1.
//   return (
//     1 +
//     Math.round(
//       ((date.getTime() - week1.getTime()) / 86400000 -
//         3 +
//         ((week1.getDay() + 6) % 7)) /
//         7
//     )
//   );
// }

export default data;

// extent will return the minimum and maximum elements of an array
// var domain = d3.extent(dates);
