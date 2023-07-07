import { Run } from "../types/Run";

function RunSummary(props: { runs: Run[] }) {
  const averageHeartRate = () => {
    let total = 0;
    let n = 0;
    props.runs.forEach((r) => {
      if (r.heartRateAverage) {
        total += r.heartRateAverage;
        n++;
      }
    });
    if (total === 0) {
      return 0;
    }
    return Math.round(total / n);
  };

  const totalDistance = props.runs.reduce(
    (acc: number, curr) => (acc += curr.distance),
    0
  );

  const averageDistance = () => {
    if (props.runs.length === 0) {
      return 0;
    }
    return totalDistance / props.runs.length;
  };

  const formatToKM = (distance: number) => `${(distance / 1000).toFixed(2)} km`;

  return (
    <div className="py-4 flex flex-col gap-4 justify-center items-center">
      <div className="text-center border-2 rounded-lg px-4 py-3">
        <p className="text-3xl text-bold">{formatToKM(totalDistance)}</p>
        <p>Total distance</p>
      </div>
      <div className="flex gap-2">
        <div className="text-center border-1 rounded-lg sm:px-4 sm:py-3 p-2">
          <p className="text-lg">{props.runs.length}</p>
          <p className="italic text-xs">Number of runs</p>
        </div>
        <div className="text-center border-1 rounded-lg sm:px-4 sm:py-3 p-2">
          <p className="text-lg">{formatToKM(averageDistance())}</p>
          <p className="italic text-xs">Average distance</p>
        </div>
        <div className="text-center border-1 rounded-lg sm:px-4 sm:py-3 p-2">
          <p className="text-lg">{`${averageHeartRate()} bpm`}</p>
          <p className="italic text-xs">Average heart rate</p>
        </div>
      </div>
    </div>
  );
}

export default RunSummary;
